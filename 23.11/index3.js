const axios = require("axios");

const urlName = "https://raw.githubusercontent.com/RedBear94/ITMO_LAB_SEM_3/master/CODE-001/secret2";

const url = "http://3336.kodaktor.ru/mystery?alakbarov-zaladdin"

axios.post(url, urlName, {headers: { "content-type": "multipart/form-data" } })
    .then(response => {
        console.log(response);
    })
  .catch(function (error) {
    console.log(error);
  });