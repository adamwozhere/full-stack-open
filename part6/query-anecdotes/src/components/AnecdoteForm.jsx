import PropTypes from 'prop-types';

const AnecdoteForm = ({ createAnecdote }) => {
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={createAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

AnecdoteForm.propTypes = {
  createAnecdote: PropTypes.func,
};

