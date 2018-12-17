

export default function view(quizes) {

	const quizGalleryEl = document.getElementById('quiz_container'),
		inputEl = document.getElementById('answer'),
		quiz = quizes;

	let currentQuestion,
		isQuestionOpen = false;

	const listenAnswer = function(data) {

		let response;

		const findQuestion = function (answerId) {

			let answer;

			for (let i = 0; i < data.length; i ++) {

				for (let a = 0; a < data[i].length; a ++) {

					if (data[i][a].id === answerId) {
						answer = data[i][a];
					}
				}
			}

			return answer;
		};

		inputEl.addEventListener('change', function(e) {
			e.preventDefault();

			if (isQuestionOpen) {
				let answerId = parseInt(currentQuestion.dataset.id);

				response = findQuestion(answerId);

				currentQuestion.querySelector('p').outerHTML = '<p class="question">' + response.answer + '</p>';

				isQuestionOpen = false;
			}
		});
	};

	const listenClick = function(data) {
		const quizLinkEl = document.querySelectorAll('.quiz-link');

		for(let l = 0; l < quizLinkEl.length; l++) {
			quizLinkEl[l].addEventListener('click', function(e) {
				e.preventDefault();

				if (!isQuestionOpen) {
					this.classList.add('show-question');

					if (inputEl.value) {
						inputEl.value = '';
					}

					currentQuestion = this;
					isQuestionOpen = true;
				}
			});
		}

		listenAnswer(data);

	};


	for(let c = 0; c < quiz.length; c++) {
		const categoryName = quiz[c][0].category.title,
			catQuiz = quiz[c],
			newCatUl = document.createElement('ul');

		for(let q = 0; q < 5; q++) {

			const newListEl = document.createElement('li');

			let value = catQuiz[q].value;

			if (value === null) {
				value = 2000;
			}

			newListEl.innerHTML = '<a class="quiz-link" data-id="'+ catQuiz[q].id +'" href="#"><h3>' + value + '</h3><p>' + catQuiz[q].question + '</p></a>';

			newCatUl.appendChild(newListEl);

			if(q === 5 - 1) {
				const newCatEl = document.createElement('div');

				newCatEl.classList.add('quiz-cat');
				newCatEl.innerHTML = '<div class="cat-head"><h2>' + categoryName + '</h2></div>';

				newCatEl.appendChild(newCatUl);
				quizGalleryEl.appendChild(newCatEl);

			}
		}
	}

	listenClick(quizes);


	return 'view checked';
}
