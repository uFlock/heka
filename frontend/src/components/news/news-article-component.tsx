import { DateTime } from "luxon";

import { NewsArticle } from "../../modules/actions/news-api-actions.ts";

export type NewsArticleProps = {
	article: NewsArticle,
	ref?: string
}

export default function NewsArticleComponent(props: NewsArticleProps) {

	const { article } = props;

	const getArticleSource = () => article.source.Name || "Unknown Source";
	const formatArticleDate = () => DateTime
		.fromISO(article.publishedAt)
		.toHTTP();


	return <>
		<div
			className="card card-compact shadow-xl mb-2.5 m-auto p-0 lg:w-2/3 border-2 border-accent">
			<div className="card-body">
				<a target={"_blank"} href={article.url} className="card-title font-bold text-2xl text-justify">
					{article.title}
				</a>
				<p className={"text-left font-bold"}>{getArticleSource()} | {formatArticleDate()}</p>
				<figure className={"m-0 p-0"}>
					<img className={"max-w-full max-h-fit"} src="/assets/tesla_placeholder.png" alt="News"/>
				</figure>
				<p className="text-justify">Bloomberg’s latest survey of thousands of Model 3 owners presents a
					conflicted view of Tesla and its CEO Elon Musk, suggesting that while owners are happy…
					#model3 #tesla #elonmusk #democrats #trump
				</p>
			</div>
		</div>
	</>;
}
