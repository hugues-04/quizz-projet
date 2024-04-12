const mongoose = require('mongoose');
const Quiz = require('../models/Quiz'); 
const db = 'mongodb+srv://gauthierlou20:JD00y0548InrbCvb@cluster0.hvqejah.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const questions = [
  {
    "question": "Quelle est la capitale de la France ?",
    "options": ["Paris", "Lyon", "Marseille", "Bordeaux"],
    "correctAnswer": "Paris"
  },
  {
    "question": "Qui a écrit 'Les Misérables' ?",
    "options": ["Victor Hugo", "Albert Camus", "Émile Zola", "Jean-Paul Sartre"],
    "correctAnswer": "Victor Hugo"
  },
  {
    "question": "Quel élément chimique a pour symbole 'O' ?",
    "options": ["Or", "Osmium", "Oxygène", "Oganesson"],
    "correctAnswer": "Oxygène"
  },
  {
    "question": "Quelle est la plus grande planète du système solaire ?",
    "options": ["Terre", "Mars", "Jupiter", "Saturne"],
    "correctAnswer": "Jupiter"
  },
  {
    "question": "En quelle année le Titanic a-t-il coulé ?",
    "options": ["1912", "1905", "1898", "1923"],
    "correctAnswer": "1912"
  },
  {
    "question": "Qui a peint la Joconde ?",
    "options": ["Raphaël", "Michel-Ange", "Leonardo da Vinci", "Pablo Picasso"],
    "correctAnswer": "Leonardo da Vinci"
  },
  {
    "question": "Quel est le plus grand océan du monde ?",
    "options": ["Océan Atlantique", "Océan Arctique", "Océan Indien", "Océan Pacifique"],
    "correctAnswer": "Océan Pacifique"
  },
  {
    "question": "Combien de continents y a-t-il sur Terre ?",
    "options": ["4", "5", "6", "7"],
    "correctAnswer": "7"
  },
  {
    "question": "Quel est le fleuve le plus long du monde ?",
    "options": ["Nil", "Mississippi", "Amazone", "Yangtsé"],
    "correctAnswer": "Amazone"
  },
  {
    "question": "Combien de jours compte une année bissextile ?",
    "options": ["364", "365", "366", "367"],
    "correctAnswer": "366"
  },
    {
      "question": "Quel est le plus haut sommet du monde ?",
      "options": ["Mont Everest", "Mont Blanc", "Mont Kilimandjaro", "Mont Fuji"],
      "correctAnswer": "Mont Everest"
    },
    {
      "question": "Qui a inventé la théorie de la relativité ?",
      "options": ["Isaac Newton", "Albert Einstein", "Galilée", "Stephen Hawking"],
      "correctAnswer": "Albert Einstein"
    },
    {
      "question": "Quel est le plus grand mammifère terrestre ?",
      "options": ["Éléphant", "Rhinocéros", "Girafe", "Hippopotame"],
      "correctAnswer": "Éléphant"
    },
    {
      "question": "Quel est le plus grand désert du monde ?",
      "options": ["Désert du Sahara", "Désert de Gobi", "Désert d'Atacama", "Désert d'Arabie"],
      "correctAnswer": "Désert de l'Antarctique"
    },
    {
      "question": "Qui a écrit 'Le Petit Prince' ?",
      "options": ["Jules Verne", "Antoine de Saint-Exupéry", "Marcel Proust", "Victor Hugo"],
      "correctAnswer": "Antoine de Saint-Exupéry"
    },
    {
      "question": "Quel est le plus grand pays du monde par superficie ?",
      "options": ["Canada", "Chine", "Russie", "États-Unis"],
      "correctAnswer": "Russie"
    },
    {
      "question": "Quelle est la monnaie officielle du Japon ?",
      "options": ["Yuan", "Euro", "Yen", "Dollar"],
      "correctAnswer": "Yen"
    },
    {
      "question": "Qui a découvert la pénicilline ?",
      "options": ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Albert Einstein"],
      "correctAnswer": "Alexander Fleming"
    },
    {
      "question": "Quel est l'animal terrestre le plus rapide ?",
      "options": ["Gazelle", "Guépard", "Lion", "Ours"],
      "correctAnswer": "Guépard"
    },
    {
      "question": "Quelle est la planète la plus proche du soleil ?",
      "options": ["Vénus", "Mercure", "Mars", "Jupiter"],
      "correctAnswer": "Mercure"
    },
      {
        "question": "Qui a peint 'La Nuit étoilée' ?",
        "options": ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        "correctAnswer": "Vincent van Gogh"
      },
      {
        "question": "Quel est le plus grand animal du monde ?",
        "options": ["Baleine bleue", "Éléphant", "Requin-baleine", "Orque"],
        "correctAnswer": "Baleine bleue"
      },
      {
        "question": "Quelle est la capitale de l'Espagne ?",
        "options": ["Barcelone", "Madrid", "Séville", "Valence"],
        "correctAnswer": "Madrid"
      },
      {
        "question": "Qui a écrit 'Roméo et Juliette' ?",
        "options": ["Victor Hugo", "William Shakespeare", "Charles Dickens", "Jane Austen"],
        "correctAnswer": "William Shakespeare"
      },
      {
        "question": "Quel est le plus grand océan du monde ?",
        "options": ["Océan Atlantique", "Océan Arctique", "Océan Indien", "Océan Pacifique"],
        "correctAnswer": "Océan Pacifique"
      },
      {
        "question": "Combien de continents y a-t-il sur Terre ?",
        "options": ["4", "5", "6", "7"],
        "correctAnswer": "7"
      },
      {
        "question": "Quelle est la plus haute montagne d'Afrique ?",
        "options": ["Mont Kilimandjaro", "Mont Kenya", "Mont Cameroun", "Mont Atlas"],
        "correctAnswer": "Mont Kilimandjaro"
      },
      {
        "question": "Qui a composé 'La Traviata' ?",
        "options": ["Giuseppe Verdi", "Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Johann Sebastian Bach"],
        "correctAnswer": "Giuseppe Verdi"
      },
      {
        "question": "Quelle est la devise de la France ?",
        "options": ["Liberté, Égalité, Fraternité", "Vive la République !", "Dieu et mon droit", "Ordre et progrès"],
        "correctAnswer": "Liberté, Égalité, Fraternité"
      },
      {
        "question": "Quelle est la langue la plus parlée dans le monde ?",
        "options": ["Chinois (mandarin)", "Anglais", "Espagnol", "Hindi"],
        "correctAnswer": "Chinois (mandarin)"
      }    
];

const seedDB = async () => {
  await Quiz.deleteMany({});
  await Quiz.insertMany(questions);
  console.log('Base de données initialisée avec succès !');
};

seedDB().then(() => mongoose.connection.close());
