export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface SourceData {
    status: string;
    sources: Source[];
}

export interface Article {
    // source: {
    //     id: string;
    //     name: string;
    // };
    source: Pick<Source, 'id' | 'name'>;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface ArticleData {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface Error {
    status: string;
    code: string;
    message: string;
}

export interface Options {
    [key: string]: string;
}

export interface Resp {
    endpoint: string;
    options?: Options;
}

export enum Errors {
    Unauthorized = 401,
    NotFound = 404,
}

export enum Endpoints {
    Everything = 'everything',
    Sources = 'sources',
}
