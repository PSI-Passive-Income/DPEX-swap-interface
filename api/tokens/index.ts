import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getAddress } from "@ethersproject/address";
import { getTopPairs, getTokenByAddress, Token } from "../utils";

interface TokenResult {
  name: string | undefined;
  symbol: string | undefined;
  price: string;
  price_BNB: string;
}
interface ReturnShape {
  [tokenAddress: string]: TokenResult;
}


const tokenToResult = function tokenToResult(token: Token): TokenResult {
  return {
    name: token?.name,
    symbol: token?.symbol,
    price: token?.derivedUSD,
    price_BNB: token?.derivedBNB,
  }
}

const allTokens = async function allTokens(context: Context) {
  const topPairs = await getTopPairs();

  const tokens = topPairs.reduce<ReturnShape>((accumulator, pair): ReturnShape => {
    // eslint-disable-next-line no-restricted-syntax
    for (const token of [pair.token0, pair.token1]) {
      const tId = getAddress(token.id);

      accumulator[tId] = tokenToResult(token);
    }

    return accumulator;
  }, {});

  context.res = {
    status: 200, /* Defaults to 200 */
    body: { updated_at: new Date().getTime(), data: tokens }
  };
}

const singleToken = async function singleToken(context: Context, address: string) {
  if (!address || typeof address !== "string" || !address.match(/^0x[0-9a-fA-F]{40}$/)) {
    context.res = {
      status: 400, /* Defaults to 200 */
      body: {
        error: {
          code: "Invalid address",
          message: "Bad request",
        },
      }
    };
    return;
  }

  address = getAddress(address);
  const token = await getTokenByAddress(address.toLowerCase());

  context.res = {
    status: 200, /* Defaults to 200 */
    body: { updated_at: new Date().getTime(), data: tokenToResult(token), }
  };
}


const httpTrigger: AzureFunction = async function httpTrigger(context: Context, req: HttpRequest): Promise<void> {
  try {
    if(!req.query.address) {
      await allTokens(context);
    } else {
      await singleToken(context, req.query.address);
    }
  } catch (error) {
    context.res = {
      status: 500, /* Defaults to 200 */
      body: error
    };
  }
};

export default httpTrigger;