import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getAddress } from "@ethersproject/address";
import { getTopPairs } from "../utils";

interface ReturnShape {
  [tokenIds: string]: {
    price: string;
    base_volume: string;
    quote_volume: string;
    liquidity: string;
    liquidity_BNB: string;
  };
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const topPairs = await getTopPairs();

    const pairs = topPairs.reduce<ReturnShape>((accumulator, pair): ReturnShape => {
      const t0Id = getAddress(pair.token0.id);
      const t1Id = getAddress(pair.token1.id);

      accumulator[`${t0Id}_${t1Id}`] = {
        price: pair.price,
        base_volume: pair.volumeToken0,
        quote_volume: pair.volumeToken1,
        liquidity: pair.reserveUSD,
        liquidity_BNB: pair.reserveBNB,
      };

      return accumulator;
    }, {});

    context.res = {
      status: 200, /* Defaults to 200 */
      body: { updated_at: new Date().getTime(), data: pairs }
    };
  } catch (error) {
    context.res = {
      status: 500, /* Defaults to 200 */
      body: error
    };
  }
};

export default httpTrigger;