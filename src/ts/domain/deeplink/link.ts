import { parse, UrlWithStringQuery } from 'url';

export interface FigmaLinkInfo {
    nodeID?: string
}

interface QueryPair {
    key: string
    value: string
} 

export function parseFigmaLink(link: string): FigmaLinkInfo {
    const parsed = parse(link)
    if (!parsed.query) {
        return null
    }

    const queryMap = parsed.query.split('&')
        .map((pair: string): QueryPair => {
            const [key, value] = pair.split('=')
            return {
                key: decodeURIComponent(key),
                value: decodeURIComponent(value)
            }
        })
        .reduce((curr: Map<string, string>, next: QueryPair): Map<string, string> => {
            curr.set(next.key, next.value)
            return curr
        }, new Map<string, string>())

    const nodeID = queryMap.get('node-id')
    return {
        nodeID
    }
}