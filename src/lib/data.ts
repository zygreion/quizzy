import { Quiz, QuizCategory } from '@/types';

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
  // {
  //   type: 'multiple',
  //   difficulty: 'easy',
  //   category: 'General%20Knowledge',
  //   question:
  //     'What%20is%20the%20shape%20of%20the%20toy%20invented%20by%20Hungarian%20professor%20Ern%C5%91%20Rubik%3F',
  //   correct_answer: 'Cube',
  //   incorrect_answers: ['Sphere', 'Cylinder', 'Pyramid'],
  //   shuffled_answers: ['Sphere', 'Cube', 'Pyramid', 'Cylinder'],
  // },
  // {
  //   type: 'multiple',
  //   difficulty: 'hard',
  //   category: 'General%20Knowledge',
  //   question:
  //     'If%20you%20planted%20the%20seeds%20of%20Quercus%20robur%2C%20what%20would%20grow%3F',
  //   correct_answer: 'Trees',
  //   incorrect_answers: ['Grains', 'Vegetables', 'Flowers'],
  //   shuffled_answers: ['Grains', 'Vegetables', 'Trees', 'Flowers'],
  // },
  // {
  //   type: 'boolean',
  //   difficulty: 'easy',
  //   category: 'General%20Knowledge',
  //   question: 'The%20color%20orange%20is%20named%20after%20the%20fruit.',
  //   correct_answer: 'True',
  //   incorrect_answers: ['False'],
  //   shuffled_answers: ['True', 'False'],
  // },
  // {
  //   type: 'multiple',
  //   difficulty: 'hard',
  //   category: 'General%20Knowledge',
  //   question: 'Who%20founded%20the%20Khan%20Academy%3F',
  //   correct_answer: 'Sal%20Khan',
  //   incorrect_answers: ['Ben%20Khan', 'Kitt%20Khan', 'Adel%20Khan'],
  //   shuffled_answers: [
  //     'Ben%20Khan',
  //     'Adel%20Khan',
  //     'Sal%20Khan',
  //     'Kitt%20Khan',
  //   ],
  // },
  // {
  //   type: 'multiple',
  //   difficulty: 'easy',
  //   category: 'General%20Knowledge',
  //   question:
  //     'What%20is%20the%20closest%20planet%20to%20our%20solar%20system%27s%20sun%3F',
  //   correct_answer: 'Mercury',
  //   incorrect_answers: ['Mars', 'Jupiter', 'Earth'],
  //   shuffled_answers: ['Mercury', 'Mars', 'Earth', 'Jupiter'],
  // },
  // {
  //   type: 'multiple',
  //   difficulty: 'easy',
  //   category: 'General%20Knowledge',
  //   question:
  //     'What%20type%20of%20animal%20was%20Harambe%2C%20who%20was%20shot%20after%20a%20child%20fell%20into%20it%27s%20enclosure%20at%20the%20Cincinnati%20Zoo%3F',
  //   correct_answer: 'Gorilla',
  //   incorrect_answers: ['Tiger', 'Panda', 'Crocodile'],
  //   shuffled_answers: ['Crocodile', 'Gorilla', 'Panda', 'Tiger'],
  // },
  // {
  //   type: 'boolean',
  //   difficulty: 'easy',
  //   category: 'General%20Knowledge',
  //   question: 'Ping-Pong%20originated%20in%20England',
  //   correct_answer: 'True',
  //   incorrect_answers: ['False'],
  //   shuffled_answers: ['False', 'True'],
  // },
  // {
  //   type: 'multiple',
  //   difficulty: 'easy',
  //   category: 'General%20Knowledge',
  //   question:
  //     'Which%20is%20the%20second%20largest%20native%20language%20spoken%20in%20Spain%20by%20numbers%20of%20speakers%3F',
  //   correct_answer: 'Catalan',
  //   incorrect_answers: ['Portuguese', 'Spanish', 'French'],
  //   shuffled_answers: ['Catalan', 'Spanish', 'French', 'Portuguese'],
  // },
  // {
  //   type: 'boolean',
  //   difficulty: 'medium',
  //   category: 'General%20Knowledge',
  //   question:
  //     'A%20pencil%27s%20lead%20is%20typically%20made%20from%20graphite%2C%20not%20lead',
  //   correct_answer: 'True',
  //   incorrect_answers: ['False'],
  //   shuffled_answers: ['False', 'True'],
  // },
  // {
  //   type: 'boolean',
  //   difficulty: 'easy',
  //   category: 'General%20Knowledge',
  //   question:
  //     'It%20is%20automatically%20considered%20entrapment%20in%20the%20United%20States%20if%20the%20police%20sell%20you%20illegal%20substances%20without%20revealing%20themselves.',
  //   correct_answer: 'False',
  //   incorrect_answers: ['True'],
  //   shuffled_answers: ['True', 'False'],
  // },
];

export const userAnswers: string[] = [];
