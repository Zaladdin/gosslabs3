const { get } = require('axios');
const { compile } = require('ejs');
const { promises: { readFile, writeFile } } = require('fs');

(async () => {
    const users = await get('https://kodaktor.ru/j/users')
        .then(({ data: { users: receivedUsers } }) => receivedUsers);
    const template = String(await readFile('./index.ejs'));
    const render = compile(template);
    const result = render({ users });

    await writeFile('./index.html', result);
})();
