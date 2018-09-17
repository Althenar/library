'use strict';

const bookApi = require('./bookApi');

async function getExternalData(book){
	const data = await bookApi(book.isbn);
		
	if(!book.title)
		book.title = data.title;
			
	if(!book.author)
		book.author = data.author;

	return book;		
}

module.exports = getExternalData;