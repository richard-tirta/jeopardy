

import view from './view.js';

export default function data() {
	const catMax = 90,
		categoriesLength = 5,
		categoriesUrl = 'http://jservice.io/api/categories?count=' + catMax;

	let quizes = [];

	const getRandomInt = function (max) {
		const min = 1, 
			randomInt = Math.floor(Math.random() * (max - min + 1) + min);

		return randomInt;
	};

	const getRandomList = function(cap) {
		let catRandomInt = [];

		for(let c = 0; c < cap; c++) {
			let thisRandomInt = getRandomInt(catMax);

			catRandomInt.push(thisRandomInt);
		}

		return catRandomInt;
	};

	fetch(categoriesUrl)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {

			const randomList = getRandomList(categoriesLength);

			for (let i = 0; i < categoriesLength; i++) {

				// data[randomList[i]].id = id of category that match order of data from random number list.
				const url = 'http://jservice.io/api/clues?category=' + data[randomList[i]].id;

				fetch(url)
					.then(function(response) {
						return response.json();
					})
					.then(function(data) {
						quizes.push(data);
					})
					.then(function() {
						if (quizes.length === categoriesLength) {
							view(quizes, categoriesLength);
						}
					})
					.catch(function(err) {
						console.log('error', err);
					});
			}
		})
		.catch(function(err) {
			console.log('error', err);
		});


	return;
}








