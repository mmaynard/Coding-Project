const axios = require('axios');

const amazonStatus = (req, res, next) => {
    getAmazon(res).then((result) => {
        res.json(result)
    });
};

const googleStatus = (req, res, next) => {
    getGoogle(res).then((result) => {
        res.json(result)
    })
};

const allStatus = async (req, res, next) => {
    const allData = await Promise.all([
        getAmazon(res).then((result) => {
            return result
        }), 
        getGoogle(res).then((result) => {
            return result
        })
    ])
    res.json(allData)
};

function getGoogle(res) {
    var startTime = Date.now();
    return axios.get('https://www.google.com')
        .then(response => {
            var endTime = Date.now() - startTime

            return {
                url: response.config.url,
                statusCode: response.status,
                duration: endTime,
                date: Date.now(),
                displayType: "Google"
            };
        })
        .catch(error => {
            console.log(error);
            res.json(response.data)
        });
};

function getAmazon(res) {
    var startTime = Date.now();
    return axios.get('https://www.amazon.com')
        .then(response => {
            var endTime = Date.now() - startTime

            return {
                url: response.config.url,
                statusCode: response.status,
                duration: endTime,
                date: Date.now(),
                displayType: "Amazon"
            }
        })
        .catch(error => {
            console.log(error);
            res.json(response.data)
        });
};

module.exports = {
    amazonStatus,
    googleStatus,
    allStatus
};