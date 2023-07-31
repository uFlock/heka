export enum SORT_BY_OPTIONS {
	RELEVANCY = "relevancy",
	PUBLISHED_DATE = "publishedAt",
	POPULARITY = "popularity"
}

export interface NewsArticle {
	title: string,
	author: string | null,
	source: {
		Id: string | null,
		Name: string,
	}
	publishedAt: string //date,
	url: string
}
