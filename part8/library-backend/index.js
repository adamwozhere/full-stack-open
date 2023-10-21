const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
const { v4: uuid } = require('uuid');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const Author = require('./models/author.model');
const Book = require('./models/book.model');

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('conneting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message));

// Queries

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // if args, search by genre, author, or both
      if (args.genre || args.author) {
        const search = args.genre && args.author ? '$and' : '$or';

        const id = (await Author.findOne({ name: args.author }))?.id;

        const books = await Book.find({
          [search]: [{ genres: args.genre }, { author: id }],
        });
        return books;
      }

      // if no args, return all
      return Book.find({});
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      console.log(root);
      const num = await Book.find({ author: root.id });
      console.log(num);
      return num.length;
    },
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);
      return author;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const bookTitleExists = await Book.findOne({ title: args.title });

      if (bookTitleExists) {
        throw new GraphQLError('Title must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          },
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({
          name: args.author,
        });
        await author.save();
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author.id,
        genres: args.genres,
      });

      return book.save();
    },
    editAuthor: async (root, args) => {
      let author = await Author.findOne({ name: args.name });

      if (!author) {
        throw new GraphQLError('Author must exist', {
          extentions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        });
      }
      author.born = args.setBornTo;

      await author.save();

      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

