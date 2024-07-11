module.exports = {
  up: async ({ context: queryInterface }) => {
    queryInterface.bulkInsert('users', [
      {
        name: 'dev',
        username: 'dev@app.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'adam',
        username: 'adam@app.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'test',
        username: 'text@app.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    queryInterface.bulkInsert('blogs', [
      {
        author: 'Hunter S. Thompson',
        url: 'https://en.wikipedia.org/wiki/The_Rum_Diary_(novel)',
        title: 'The Rum Diary',
        likes: 2,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        author: 'Patricia Highsmith',
        url: 'https://en.wikipedia.org/wiki/The_Talented_Mr._Ripley',
        title: 'The Talented Mr. Ripley',
        likes: 5,
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        author: 'F. Scott Fitzgerald',
        url: 'https://en.wikipedia.org/wiki/The_Great_Gatsby',
        title: 'The Great Gatsby',
        likes: 3,
        user_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        author: 'Alex Garland',
        url: 'https://en.wikipedia.org/wiki/The_Beach_(novel)',
        title: 'The Beach',
        likes: 10,
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        author: 'Alex Garland',
        url: 'https://en.wikipedia.org/wiki/The_Tesseract_(novel)',
        title: 'The Tesseract',
        likes: 1,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        author: 'Alex Garland',
        url: 'https://en.wikipedia.org/wiki/The_Coma',
        title: 'The Coma',
        likes: 1,
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    queryInterface.bulkInsert('reading_lists', [
      {
        user_id: 1,
        blog_id: 1,
      },
      {
        user_id: 1,
        blog_id: 6,
      },
      {
        user_id: 1,
        blog_id: 1,
      },
      {
        user_id: 2,
        blog_id: 1,
      },
      {
        user_id: 2,
        blog_id: 2,
      },
      {
        user_id: 2,
        blog_id: 4,
      },
      {
        user_id: 2,
        blog_id: 5,
      },
      {
        user_id: 3,
        blog_id: 6,
      },
      {
        user_id: 3,
        blog_id: 2,
      },
    ]);
  },
};
