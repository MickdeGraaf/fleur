import { useReservoirClient, useTokens, } from '@reservoir0x/reservoir-kit-ui';
import { paths, setParams } from '@reservoir0x/reservoir-kit-client';
import useSWR, { SWRConfiguration } from 'swr';

type TopBidsResponse =
  paths['/orders/users/{user}/top-bids/v1']['get']['responses']['200']['schema']

export const useUserTopBids = (
    user: string | undefined,
    query?: paths["/orders/users/{user}/top-bids/v1"]["get"]["parameters"]["query"] | false,
    swrOptions: SWRConfiguration = {}
) => {
    const client = useReservoirClient();

    if(!user) {
        return;
    }

    const path = new URL(`${client?.apiBase}/orders/users/${user}/top-bids/v1`)
    setParams(path, query || {})

    const { data, mutate, error, isValidating } = useSWR<TopBidsResponse>(
        query ? [path.href, client?.apiKey] : null,
        null,
        {
            revalidateOnMount: true,
            ...swrOptions,
        }
    )
    // const collections: TopBidsResponse['collections'] | null =
    //     data && data.collections ? data.collections : null

    // console.log(data);

    const topBids: TopBidsResponse['topBids'] = data && data.topBids ? data.topBids : [];

    return { response: data, data: topBids, mutate, error, isValidating }
}

type FillBidResponse = paths["/execute/sell/v4"]["post"]["responses"]["200"]["schema"];

export const useFillBid = (nftContract: string, tokenId: string, bidId: string, taker:string, swrOptions: SWRConfiguration = {}) => {

    const client = useReservoirClient()
    const query: paths["/execute/sell/v4"]["post"]["parameters"]["body"] = {
        body: {
            taker: taker, 
            orderId: bidId,
            token: `${nftContract}:${tokenId}`,
        }
    }
    const path = new URL(`${client?.apiBase}/execute/sell/v4`)
    setParams(path, query || {})

    const { data, mutate, error, isValidating } = useSWR<FillBidResponse>(
        query ? [path.href, client?.apiKey] : null,
        null,
        {
            revalidateOnMount: true,
            ...swrOptions,
        }
    )
    // const collections: TopBidsResponse['collections'] | null =
    //     data && data.collections ? data.collections : null

    // console.log(data);

    const steps: FillBidResponse["steps"] = data && data.steps ? data.steps : [];

    return { response: data, data: steps, mutate, error, isValidating }
}

// export const use