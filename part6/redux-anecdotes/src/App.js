import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;

// approx 4hr 30min - finished exercise 6.10 nad 6.11 (they seem exactly the same tasks?)
// installed redux chrome extension but not sure how to use it properly

