import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`created '${anecdote}'`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  return (
    <div>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

