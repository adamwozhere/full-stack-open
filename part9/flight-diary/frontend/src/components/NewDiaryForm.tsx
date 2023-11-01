import { useState } from 'react';
import { NewDiaryEntry } from '../types';

interface Props {
  handleNewDiary: (obj: NewDiaryEntry) => void;
}

const NewDiaryForm = ({ handleNewDiary }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleNewDiary({
      date,
      weather,
      visibility,
      comment,
    });
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new entry</h2>
      <div>
        <label htmlFor="date">Date</label>
        <input
          type="text"
          name="date"
          id="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </div>
      <div>
        <label htmlFor="visibility">Visibility</label>
        <input
          type="text"
          name="visibility"
          id="visibility"
          value={visibility}
          onChange={({ target }) => setVisibility(target.value)}
        />
      </div>
      <div>
        <label htmlFor="weather">Weather</label>
        <input
          type="text"
          name="weather"
          id="weather"
          value={weather}
          onChange={({ target }) => setWeather(target.value)}
        />
      </div>
      <div>
        <label htmlFor="comment">Comment</label>
        <input
          type="text"
          name="comment"
          id="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default NewDiaryForm;

