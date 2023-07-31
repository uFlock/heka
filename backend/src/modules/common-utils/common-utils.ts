export function paginateResult<T = any>(resultToPaginate: T[], currentPage: number, itemsPerPage: number) {

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	return resultToPaginate.slice(startIndex, endIndex);
}
