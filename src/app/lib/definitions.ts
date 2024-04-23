
export type Link = {
    id: string;
    url: string;
    platform: string;
}

export interface ApiData {
    json_data: { links: Link[] },
    id: string
}