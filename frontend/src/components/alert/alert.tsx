import React from "react";

export enum ALERT_TYPES {
	ERROR = "error",
	INFO = "info",
	SUCCESS = "success",
}

export type AlertProps = {
	type: ALERT_TYPES,
	message: string | string[]
}


export default function Alert(props: AlertProps) {

	const { message, type } = props;

	const isString = typeof message === "string";
	const isArray = Array.isArray(message);

	return <>
		<div
			className={`alert alert-${type} m-auto min-w-full lg:max-w-[655px] md:max-w-[655px] lg:min-w-[655px] md:min-w-[655px]`}>

			{type === ALERT_TYPES.ERROR &&
				<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
					 viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
						  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
			}

			{type === ALERT_TYPES.INFO &&
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
					 className="stroke-current shrink-0 w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
						  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
				</svg>

			}
			{type === ALERT_TYPES.SUCCESS &&
				<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
					 viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
						  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
			}

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
