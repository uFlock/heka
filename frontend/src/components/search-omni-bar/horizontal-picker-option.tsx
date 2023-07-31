export type HorizontalPickerOptionsProps = {
	active: boolean,
	label: string
	onClick: () => void
}

export default function HorizontalPickerOption(props: HorizontalPickerOptionsProps) {

	const {active, label, onClick} = props;

	const cssActiveClass = active ? "link-accent" : "";

	return <>
		<a
			className={`${cssActiveClass} p-2 cursor-pointer`}
			onClick={onClick}>
			{label}
		</a>
	</>;
}
