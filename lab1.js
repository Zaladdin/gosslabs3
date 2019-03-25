mocha.setup('add');

const headers = { 'Content-Type': 'application/json' };
const baseURL = 'https://kodaktor.ru/api/add';
const getData = (x, y) => axios.get(`${baseURL}/${x}/${y}`, { headers }).then(({ data }) => {
    if (typeof data === 'string') {
        return Number(data.match(/<span>(.+)<\/span>/i)[1]);
    }

    return data['Summa'];
});

const testData = [
    {
        x: 1,
        y: 2,
        expectedAnswer: 3,
    },
    {
        x: 11,
        y: 22,
        expectedAnswer: 33,
    },
    {
        x: 0.1,
        y: 0.2,
        expectedAnswer: 0.3,
    },
];

describe('addition', () => {
    testData.forEach(({ x, y, expectedAnswer }) => {
        it(`${x} plus ${y} should be equal ${expectedAnswer}`, async () => {
            const answer = await getData(x, y);

            chai.assert.equal(answer, expectedAnswer);
        });
    });
});

mocha.run();
