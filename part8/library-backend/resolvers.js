const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const User = require('./models/user.model');
const Author = require('./models/author.model');
const Book = require('./models/book.model');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const loaders = require('./loaders');

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
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root, args, context) => {
      const { loaders } = context;
      const { bookCountLoader } = loaders;

      // use bookCountLoader to batch mongoose requests to solve N+1 problem
      const books = await bookCountLoader.load(root.id);

      return books.length;
    },
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);
      return author;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('User not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

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
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error,
            },
          });
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author.id,
        genres: args.genres,
      });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('User not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

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

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;

