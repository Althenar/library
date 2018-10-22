'use strict';

const 
	axios = require('axios'),
	parser = require('xml2js').parseString;

const 
	key = require('../../../../configs/settings').apiKey;

function getBookDataByISBN(isbn){
	return axios.get(`https://www.goodreads.com/search.xml?key=${key}=${isbn}`)
		.then(response => {
			let parsed;

			//parsing xml to json
			parser(response.data, (err, result) => {
				if(err) return new Error(err);
				parsed = result;
			});

			//getting needed data from json
			const data = {
				title: parsed.GoodreadsResponse.search[0].results[0]
					.work[0].best_book[0].title[0],
				author: parsed.GoodreadsResponse.search[0].results[0]
					.work[0].best_book[0].author[0].name[0]
			};

			return data;
		})
		.catch(error => {
			throw new Error(error);
		});
}

module.exports = getBookDataByISBN;