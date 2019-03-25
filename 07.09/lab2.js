mocha.setup('add');

const headers = { 'Content-Type': 'application/json' };
const baseURL = 'https://kodaktor.ru/api2';
const firstURL = number => `${baseURL}/there/${number}`;
const secondURL = number => `${baseURL}/andba/${number}`;
const getData = URL => axios.get(URL, { headers }).then(({ data }) => data);

const minTestNumber = -10;
const testNumberStep = 0.5;
const testNumbers = [...Array(41)].map((_, index) => minTestNumber + index * testNumberStep);
const firstResponseExpected = testNumber => (4 * ((3 * testNumber + 2) ** 2) - 1).toFixed(5);
const secondResponseExpected = testNumber => (
    testNumber < -0.5 ? Math.abs(testNumber) - 4 / 3 : testNumber
).toFixed(5);
const testData = testNumber => [
    {
        URL: firstURL,
        request: testNumber,
        expectedResponse: firstResponseExpected(testNumber),
    },
    {
        URL: secondURL,
        request: firstResponseExpected(testNumber),
        expectedResponse: secondResponseExpected(testNumber),
    },
];

describe('async chaining', () => {
    testNumbers.forEach(async testNumber => {
        const setWord = index => (index === 0 ? 'first' : 'second');
        let actualData = testNumber;

        await testData(testNumber).forEach(async ({ URL, request, expectedResponse }, index) => {
            it(`${request} should be equal ${expectedResponse} after ${setWord(
                index,
            )} transformation`, async () => {
                const result = await getData(URL(actualData));
                actualData = result;

                chai.assert.equal(result.toFixed(5), expectedResponse);
            });
        });
    });
});

mocha.run();
