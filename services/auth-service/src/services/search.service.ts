import { elasticSearchClient, getDocumentById } from '@auth/elasticsearch';
import { SearchResponse } from '@elastic/elasticsearch/lib/api/types';
import { IHitsTotal, IPaginateProps, IQueryList, ISearchResult } from '@kmnvz-mayvez/myapp-share';
import { IUserDocument } from '@auth/interface/user.interface';

export async function userById(index: string, userId: string): Promise<IUserDocument> {
    const user: IUserDocument = await getDocumentById(index, userId);
    return user;
}

export async function userSearch(
    searchQuery: string,
    paginate: IPaginateProps,
    stayTime?: string,
    min?: number,
    max?: number
): Promise<ISearchResult> {
    const { from, size, type } = paginate;
    const queryList: IQueryList[] = [
        {
            query_string: {
                fields: ["username", "platNumber", "catType"],
                query: `*${searchQuery}*`
            }
        },
        {
            term: {
                active: true
            }
        }
    ];

    if (stayTime !== 'undefined') {
        queryList.push({
            query_string: {
                fields: ['hourStay'],
                query: `*${stayTime}*`
            }
        });
    }

    if (!isNaN(parseInt(`${min}`)) && !isNaN(parseInt(`${max}`))) {
        queryList.push({
            range: {
                price: {
                    gte: min,
                    lte: max
                }
            }
        });
    }
    const result: SearchResponse = await elasticSearchClient.search({
        index: 'cars',
        size,
        query: {
            bool: {
                must: [...queryList]
            }
        },
        sort: [
            {
                sortId: type === 'forward' ? 'asc' : 'desc'
            }
        ],
        ...(from !== '0' && { search_after: [from] })
    });
    const total: IHitsTotal = result.hits.total as IHitsTotal;
    return {
        total: total.value,
        hits: result.hits.hits
    };
}
