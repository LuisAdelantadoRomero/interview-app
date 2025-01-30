db = db.getSiblingDB('news-app');  // Use the 'news-app' database

db.news.insertMany([
  { title: 'New Eagle discovered', date: new Date('2025-01-01'), description: 'The scientists have discovered a new species of eagle...', content: 'Text', archived: false, archiveDate: '', image: '/img/Eagle.jpg' },
  { title: 'The day of the flower has arrived', date: new Date('2025-01-02'), description: 'Like every year we have this special flower day...', content: 'Text', archived: false, archiveDate: '', image: '/img/Flower.jpg' },
  { title: 'The insects rule the world', date: new Date('2025-01-03'), description: 'It is said that the insects are the dominant species...', content: 'Text', archived: false, archiveDate: '', image: '/img/Insects.jpg' }
]);

print('Initial data inserted');