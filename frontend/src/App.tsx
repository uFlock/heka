import './App.css';

import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

import SearchOmniBar, { SubmitOmniBarProps } from "./components/search-omni-bar/search-omni-bar.tsx";
import NewsArticleComponent from "./components/news/news-article-component.tsx";
import { NewsArticle, requestNewsArticles, RequestNewsRequestBody } from "./modules/actions/news-api-actions.ts";
import AlertInfo from "./components/alert/alert-info.tsx";

function App() {

	const [pageNumber, setPageNumber] = useState(1);
	const [formData, setFormData] = useState<RequestNewsRequestBody>();

	const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
	const [moreToFetch, setMoreToFetch] = useState(true);
	const [showNoResults, setShowNoResults] = useState(false);

	const processFormSubmissionRequest = async (props: SubmitOmniBarProps) => {

		setShowNoResults(false);
		setPageNumber(1);
		setNewsArticles([]);

		const { query, sortBy, dateRange } = props;
		const { startDate, endDate } = dateRange;

		const initialFormData = {
			query,
			sortBy,
			page: 1,
			dateRange: {
				startDate,
				endDate
			}
		};

		setFormData(initialFormData);

		const result = await requestNewsArticles(initialFormData);

		if (result.length > 0) {
			setMoreToFetch(true);
		} else {
			setShowNoResults(true);
		}

		setNewsArticles(result);
	};

	const nextFetcher = async () => {

		const page = pageNumber + 1;
		const updatedFormData = { ...formData!, page };

		setPageNumber(page);
		setFormData(updatedFormData);

		const result = await requestNewsArticles(updatedFormData);

		setNewsArticles([...newsArticles, ...result]);

		result.length < 5 && setMoreToFetch(false);

		console.log(result);
	};

	return (
		<>
			<h1 className={"xl:text-4xl 2xl:text-4xl lg:text-4xl text-2xl"}>Get some Heka News!</h1>
			<div
				className="divider m-auto min-w-full lg:max-w-[655px] md:max-w-[655px] lg:min-w-[655px] md:min-w-[655px]"></div>
			<SearchOmniBar onSubmit={processFormSubmissionRequest}></SearchOmniBar>

			<div
				className="divider m-auto min-w-full lg:max-w-[655px] md:max-w-[655px] lg:min-w-[655px] md:min-w-[655px]"></div>

			{showNoResults &&
				<AlertInfo message={"No Results... Please try adjusting your query."}></AlertInfo>
			}

			{newsArticles.length > 0 && <InfiniteScroll
				dataLength={newsArticles.length}
				next={nextFetcher}
				hasMore={moreToFetch}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
						<br/>
						<button className={"btn btn-primary m-2.5"}
								onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}>Back to top
						</button>
					</p>
				}
			>
				{newsArticles.map((newsArticle, index) => {
					return <NewsArticleComponent key={index} article={newsArticle}/>;
				})}
			</InfiniteScroll>}
		</>
	);
}

export default App;
