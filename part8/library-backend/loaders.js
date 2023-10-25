const DataLoader = require('dataloader');
const Book = require('./models/book.model');

const { groupBy, map } = require('ramda');

// This is a DataLoader function to solve N+1 problem
// I found this very difficult to understand / implement:
//
// DataLoader saves each GraphQL resolver AuthorId and puts them into this function as an array
// One mongoose call is then made to get all the Books with the AuthorId array items;
// Ramda library is then used to create a collection of books where the key is equal to the Book.author
// Then a map is made over the original AuthorId array, with corresponding Books that match the AUthor key with the Book.author
// Effectively giving a collection of authors that have an array of their own books
//
// This is still very difficult for me to visualise / understand but I used this video as a basis: https://youtu.be/ld2_AS4l19g?t=719

const bookCountLoader = new DataLoader((authorIds) => {
  return Book.find({ author: { $in: authorIds } }).then((books) => {
    const booksById = groupBy((book) => book.author, books);

    return map((authorId) => booksById[authorId], authorIds);
  });
});

module.exports = { bookCountLoader };
