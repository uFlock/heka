import { SORT_BY_OPTIONS } from "../../components/search-omni-bar/sort-by-picker.tsx";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
const NEWS_API_FULL_URL = API_BASE_URL + "/api/request-news";

export interface RequestNewsRequestBody {
	query: string,
	sortBy: SORT_BY_OPTIONS,
	dateRange: {
		startDate: string,
		endDate: string
	},
	page: number
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

export async function requestNewsArticles(formData: RequestNewsRequestBody): Promise<NewsArticle[]> {

	const response = await fetch(NEWS_API_FULL_URL, {
		method: "POST",
		body: JSON.stringify(formData),
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		}
	});

	return await response.json();
}
