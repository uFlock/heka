import { useState } from "react";

const DEFAULT_PLACEHOLDER_TEXT = "Enter your search query here... e.g. Tesla";

export type SearchBarProps = {
	onChange?: (newVal: string) => void,
	onSubmit?: () => void,
}

export default function SearchBar(props: SearchBarProps) {

	const { onChange, onSubmit } = props;

	const [placeholderText, setPlaceholderText] = useState(DEFAULT_PLACEHOLDER_TEXT);

	return <>
		<input
			type="text"
			inputMode="search"
			placeholder={placeholderText}
			className="input input-bordered input-accent min-w-full lg:max-w-[655px] md:max-w-[655px] lg:min-w-[655px] md:min-w-[655px]"
			onFocus={() => placeholderText === DEFAULT_PLACEHOLDER_TEXT && setPlaceholderText("")}
			onBlur={() => setPlaceholderText(DEFAULT_PLACEHOLDER_TEXT)}
			onChange={event => onChange && onChange(event.target.value) }
			onKeyDown={(event) => {
				event.key === "Enter" && onSubmit && onSubmit();
			}}/>
	</>;
}
