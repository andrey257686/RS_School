export interface ISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ISourceData {
    status: string;
    sources: ISource[];
}

export interface IArticle {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface IArticleData {
    status: string;
    totalResults: number;
    articles: IArticle[];
}

export interface IError {
    status: string;
    code: string;
    message: string;
}

export interface IOptions {
    [key: string]: string;
}

export interface IResp {
    endpoint: string;
    options?: IOptions;
}

export enum Errors {
    Unauthorized = 401,
    NotFound = 404,
}
