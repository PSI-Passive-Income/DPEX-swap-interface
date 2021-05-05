import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getAddress } from "@ethersproject/address";
import { getTopPairs } from "../utils";

interface ReturnShape {
    [tokenIds: string]: {
        pair_address: string;
        base_name: string;
        base_symbol: string;
        base_address: string;
        quote_name: string;
        quote_symbol: string;
        quote_address: string;
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
          const pId = getAddress(pair.id);
          const t0Id = getAddress(pair.token0.id);
          const t1Id = getAddress(pair.token1.id);
    
          accumulator[`${t0Id}_${t1Id}`] = {
            pair_address: pId,
            base_name: pair.token0.name,
            base_symbol: pair.token0.symbol,
            base_address: t0Id,
            quote_name: pair.token1.name,
            quote_symbol: pair.token1.symbol,
            quote_address: t1Id,
            price: pair.price,
            base_volume: pair.previous24hVolumeToken0,
            quote_volume: pair.previous24hVolumeToken1,
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