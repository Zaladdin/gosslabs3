const initialData = {
    status: 'student',
    year: 2019,
};
const stringifiedData = JSON.stringify(initialData);
const onClick = async () => {
    const data = await fetch(`http://3336.kodaktor.ru/alakbarov?${stringifiedData}`)
        .then(responseData => responseData.text())
        .then(response => response);
    console.info(data);
};
const [btn] = document.getElementsByName('btn');

btn.addEventListener('click', onClick);
