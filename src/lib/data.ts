import { Quiz, QuizCategory } from '@/types';
import { shuffleArray } from './utils';

export const quizCategories: QuizCategory[] = [
  {
    id: -1,
    name: 'Any Category',
  },
  {
    id: 9,
    name: 'General Knowledge',
  },
  {
    id: 10,
    name: 'Entertainment: Books',
  },
  {
    id: 11,
    name: 'Entertainment: Film',
  },
  {
    id: 12,
    name: 'Entertainment: Music',
  },
  {
    id: 13,
    name: 'Entertainment: Musicals & Theatres',
  },
  {
    id: 14,
    name: 'Entertainment: Television',
  },
  {
    id: 15,
    name: 'Entertainment: Video Games',
  },
  {
    id: 16,
    name: 'Entertainment: Board Games',
  },
  {
    id: 17,
    name: 'Science & Nature',
  },
  {
    id: 18,
    name: 'Science: Computers',
  },
  {
    id: 19,
    name: 'Science: Mathematics',
  },
  {
    id: 20,
    name: 'Mythology',
  },
  {
    id: 21,
    name: 'Sports',
  },
  {
    id: 22,
    name: 'Geography',
  },
  {
    id: 23,
    name: 'History',
  },
  {
    id: 24,
    name: 'Politics',
  },
  {
    id: 25,
    name: 'Art',
  },
  {
    id: 26,
    name: 'Celebrities',
  },
  {
    id: 27,
    name: 'Animals',
  },
  {
    id: 28,
    name: 'Vehicles',
  },
  {
    id: 29,
    name: 'Entertainment: Comics',
  },
  {
    id: 30,
    name: 'Science: Gadgets',
  },
  {
    id: 31,
    name: 'Entertainment: Japanese Anime & Manga',
  },
  {
    id: 32,
    name: 'Entertainment: Cartoon & Animations',
  },
];

export const dummyQuizzes: Quiz[] = [
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment%3A%20Cartoon%20%26%20Animations',
    question:
      'Wendy%20O.%20Koopa%20appeared%20in%20the%20Super%20Mario%20DIC%20Cartoons%2C%20but%20what%20was%20she%20known%20as%3F',
    correct_answer: 'Kootie%20Pie',
    incorrect_answers: ['Sweetie%20Pie', 'Wendy%20Pie', 'Honey%20Pie'],
    shuffled_answers: shuffleArray([
      'Kootie%20Pie',
      'Sweetie%20Pie',
      'Wendy%20Pie',
      'Honey%20Pie',
    ]),
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment%3A%20Cartoon%20%26%20Animations',
    question:
      'In%20My%20Little%20Pony%2C%20what%20is%20the%20name%20of%20Applejack%27s%20younger%20sister%3F',
    correct_answer: 'Apple%20Bloom',
    incorrect_answers: ['Red%20Delicious', 'Apple%20Sweets', 'Apple%20Fritter'],
    shuffled_answers: shuffleArray([
      'Apple%20Bloom',
      'Red%20Delicious',
      'Apple%20Sweets',
      'Apple%20Fritter',
    ]),
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment%3A%20Cartoon%20%26%20Animations',
    question:
      'What%20was%20the%20name%20of%20the%20sea%20witch%20in%20the%201989%20Disney%20film%20%22The%20Little%20Mermaid%22%3F',
    correct_answer: 'Ursula',
    incorrect_answers: ['Madam%20Mim', 'Maleficent', 'Lady%20Tremaine'],
    shuffled_answers: shuffleArray([
      'Ursula',
      'Madam%20Mim',
      'Maleficent',
      'Lady%20Tremaine',
    ]),
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment%3A%20Cartoon%20%26%20Animations',
    question:
      'In%20the%201993%20Disney%20animated%20series%20%22Bonkers%22%2C%20what%20is%20the%20name%20of%20Bonker%27s%20second%20partner%3F',
    correct_answer: 'Miranda%20Wright',
    incorrect_answers: [
      'Dick%20Tracy',
      'Eddie%20Valiant',
      'Dr.%20Ludwig%20von%20Drake',
    ],
    shuffled_answers: shuffleArray([
      'Miranda%20Wright',
      'Dick%20Tracy',
      'Eddie%20Valiant',
      'Dr.%20Ludwig%20von%20Drake',
    ]),
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment%3A%20Cartoon%20%26%20Animations',
    question:
      'What%20is%20the%20surname%20of%20one%20of%20the%20male%20teachers%20in%20the%20BBC%20series%20Postman%20Pat%3F',
    correct_answer: 'Pringle',
    incorrect_answers: ['Walker', 'Dorito', 'Lays'],
    shuffled_answers: shuffleArray(['Pringle', 'Walker', 'Dorito', 'Lays']),
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment%3A%20Cartoon%20%26%20Animations',
    question:
      'Which%20%27Family%20Guy%27%20character%20got%20his%20own%20spin-off%20show%20in%202009%3F',
    correct_answer: 'Cleveland%20Brown',
    incorrect_answers: [
      'Glenn%20Quagmire',
      'Joe%20Swanson',
      'The%20Greased-up%20Deaf%20Guy',
    ],
    shuffled_answers: shuffleArray([
      'Cleveland%20Brown',
      'Glenn%20Quagmire',
      'Joe%20Swanson',
      'The%20Greased-up%20Deaf%20Guy',
    ]),
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment%3A%20Cartoon%20%26%20Animations',
    question:
      'Butters%20Stotch%2C%20Pip%20Pirrup%2C%20and%20Wendy%20Testaburger%20are%20all%20characters%20in%20which%20long%20running%20animated%20TV%20series%3F',
    correct_answer: 'South%20Park',
    incorrect_answers: ['The%20Simpsons', 'Family%20Guy', 'Bob%27s%20Burgers'],
    shuffled_answers: shuffleArray([
      'South%20Park',
      'The%20Simpsons',
      'Family%20Guy',
      'Bob%27s%20Burgers',
    ]),
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment%3A%20Cartoon%20%26%20Animations',
    question:
      'What%20is%20the%20name%20of%20the%20city%20that%20The%20Flintstones%20is%20based%20in%3F',
    correct_answer: 'Bedrock',
    incorrect_answers: ['Stoneville', 'Rockhampton', 'Boulder%20City'],
    shuffled_answers: shuffleArray([
      'Bedrock',
      'Stoneville',
      'Rockhampton',
      'Boulder%20City',
    ]),
  },
  {
    type: 'boolean',
    difficulty: 'easy',
    category: 'Entertainment%3A%20Cartoon%20%26%20Animations',
    question:
      'In%20the%20%22Shrek%22%20film%20franchise%2C%20Donkey%20is%20played%20by%20Eddie%20Murphy.',
    correct_answer: 'True',
    incorrect_answers: ['False'],
    shuffled_answers: shuffleArray(['True', 'False']),
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment%3A%20Cartoon%20%26%20Animations',
    question:
      'What%20is%20the%20name%20of%20the%20creatures%20that%20the%20protagonists%20of%20the%20webshow%20RWBY%20fight%20against%3F',
    correct_answer: 'Grimm',
    incorrect_answers: ['Reavers', 'Heartless', 'Dark%20Ones'],
    shuffled_answers: shuffleArray([
      'Grimm',
      'Reavers',
      'Heartless',
      'Dark%20Ones',
    ]),
  },
];

export const arr: number[] = [];
