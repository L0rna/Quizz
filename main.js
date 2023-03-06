const els = {
    welcomeScreen: null,
    questionScreen: null,
    endScreen: null,
    welcomeBtn: null,
    answers: null,
    endBtn: null,
    answersContainer: null
};

let questionIndex = 0;

const questions = [{
        question: 'Quelle est ta principale expertise ?',
        answers: [{
            title: 'La programmation et la création de logiciels.',
            house: 'gryffondor'
        }, {
            title: "La configuration et l'administration des réseaux informatiques.",
            house: 'slytherin'
        }, {
            title: 'Les deux',
            house: 'ravenclaw'
        }, {
            title: 'Aucun',
            house: 'hufflepuff'
        }]
    },
    {
        question: 'Quel type de projets te passionne le plus ?',
        answers: [{
            title: "Les projets de développement de logiciels et d'applications web.",
            house: 'gryffondor'
        }, {
            title: "Les projets de mise en place et de maintenance de réseaux informatiques.",
            house: 'slytherin'
        }, {
            title: 'Les deux',
            house: 'ravenclaw'
        }, {
            title: 'Aucun',
            house: 'hufflepuff'
        }]
    },
    {
        question: 'Quels outils utilises-tu le plus souvent dans ton travail ?',
        answers: [{
            title: 'Aucun',
            house: 'hufflepuff'
        }, {
            title: 'Les langages de programmation comme Java, C++, Python, etc. et les outils de développement comme Eclipse ou Visual Studio.',
            house: 'gryffondor'
        }, {
            title: 'les deux',
            house: 'ravenclaw'
        }, {
            title: 'Les outils de gestion de réseaux comme Cisco IOS, Windows Server, Linux, etc',
            house: 'slytherin'
        }]
    }
];

const recordedAnswers = [];


const init = () => {
    console.log('Page has loaded');

    els.welcomeScreen = document.querySelector('.welcome-screen');
    els.questionScreen = document.querySelector('.question-screen');
    els.endScreen = document.querySelector('.end-screen');
    els.welcomeBtn = els.welcomeScreen.querySelector('button');
    els.endBtn = els.endScreen.querySelector('button');
    els.answersContainer = els.questionScreen.querySelector('ul');

    els.welcomeBtn.addEventListener('click', () => {
        displayScreen('question');
        displayQuestion(questionIndex);
    });
    els.endBtn.addEventListener('click', () => {
        displayScreen('welcome');
        questionIndex = 0;
    });

    els.answersContainer.addEventListener('click', ({ target }) => {
        if (target.tagName !== 'LI') {
            return;
        }
        const house = target.getAttribute('data-house');
        recordedAnswers.push(house);

        questionIndex++;

        if (questionIndex >= questions.length) {
            calculateScore();
            displayScreen('end');
        } else {
            displayQuestion(questionIndex);
        }
    });

};

const calculateScore = () => {
    const house = recordedAnswers.sort((a, b) => {
        return recordedAnswers.filter(answer => answer === a).length - 
        recordedAnswers.filter(answer => answer === b).length 
    }).pop();
    // console.log('house', house);

    const houseInFrench = {
        gryffondor: 'Developpeur',
        slytherin: 'Reseaux',
        ravenclaw: 'Developpeur et Reseaux',
        hufflepuff: 'Ni Developpeur ni Reseaux'
    };

    els.endScreen.querySelector('span').textContent = houseInFrench[house];
};

const displayQuestion = (index) => {

    const currentQuestion = questions[index];

    const questionEl = els.questionScreen.querySelector('h2');

    const answerEls = currentQuestion.answers.map((answer) => {
        const liEl = document.createElement('li');
        liEl.textContent = answer.title;
        liEl.setAttribute('data-house', answer.house);
        return liEl;
    });

    questionEl.textContent = currentQuestion.question;
    els.answersContainer.textContent = '';
    els.answersContainer.append(...answerEls);
};

const displayScreen = (screenName) => {
    // console.log('screenName', screenName);
    els.welcomeScreen.style.display = 'none';
    els.questionScreen.style.display = 'none';
    els.endScreen.style.display = 'none';

    const screen = els[screenName + 'Screen'];
    // console.log('screen', screen);
    screen.style.display = 'grid';
    els.endBtn.addEventListener('click', () => {
        displayScreen('welcome');
        questionIndex = 0; // Réinitialise la questionIndex à 0
    });

};


window.addEventListener('load', init);