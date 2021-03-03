const axios = require('axios');

const api = axios.create({
    baseUrl:'https://www.themealdb.com/api/json/v1/1/search.php?s='
});
module.exports = api;