import { paginateResult } from "./common-utils";

const TEST_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const EXPECTED_ON_PAGE = [
	[1, 2],
	[3, 4],
	[5, 6],
	[7, 8],
	[9, 10],
];
describe(`common-utils module`, () => {

	it(`paginator paginates correctly - expect 5 pages with 2 items in each`, async () => {

		let currentPage = 0;
		const itemsPerPage = 2;

		while (currentPage < 5) {

			const result = paginateResult<number>(TEST_DATA, ++currentPage, itemsPerPage);

			expect(result[0]).toEqual(EXPECTED_ON_PAGE[currentPage - 1][0]);
			expect(result[1]).toEqual(EXPECTED_ON_PAGE[currentPage - 1][1]);
		}
	});

	it(`paginator paginates correctly - page 6 is expected to be empty`, async () => {

		let currentPage = 0;
		const itemsPerPage = 2;

		while (currentPage < 6) {

			const result = paginateResult<number>(TEST_DATA, ++currentPage, itemsPerPage);

			if (currentPage === 6) expect(result.length).toBe(0);
		}
	});
});
