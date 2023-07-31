import { DEFAULT_SORT_BY_PICKER_OPTIONS } from "./constants.ts";
import HorizontalPicker from "./horizontal-picker.tsx";

export enum SORT_BY_OPTIONS {
	RELEVANCY = "relevancy",
	PUBLISHED_DATE = "publishedAt",
	POPULARITY = "popularity"
}

export type SortByPickerProps = {
	onChange: (newValue: SORT_BY_OPTIONS) => void
}

export default function SortByPicker(props: SortByPickerProps) {

	const { onChange } = props;

	const processOptionChange = (newVal: SORT_BY_OPTIONS) => onChange(newVal);

	return <>
		<HorizontalPicker<SORT_BY_OPTIONS>
			pickerOptions={DEFAULT_SORT_BY_PICKER_OPTIONS}
			onChange={processOptionChange}
		/>
	</>;
}
