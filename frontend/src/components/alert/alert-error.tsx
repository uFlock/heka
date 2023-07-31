import React from "react";
import { AlertProps } from "./common-alert-types.ts";

export default function AlertError(props: AlertProps) {

	const { message } = props;

	const isString = typeof message === "string";
	const isArray = Array.isArray(message);

	return <>
		<div className="alert alert-error m-1 m-auto min-w-full lg:max-w-[655px] md:max-w-[655px] lg:min-w-[655px] md:min-w-[655px]">
			<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
				 viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
					  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
			</svg>
			{isString && <span>{message}</span>}
			{isArray && <div>
				{message.map(msg => {
					return <React.Fragment key={msg}><span>{msg}</span><br/></React.Fragment>;
				})}
			</div>
			}
		</div>
	</>;
}
