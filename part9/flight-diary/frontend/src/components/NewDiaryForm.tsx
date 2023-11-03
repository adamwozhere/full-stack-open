import { useState } from 'react';
import { NewDiaryEntry } from '../types';

interface Props {
  handleNewDiary: (obj: NewDiaryEntry) => void;
}

const NewDiaryForm = ({ handleNewDiary }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('great');
  const [weather, setWeather] = useState('sunny');
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
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </div>
      <fieldset>
        <legend>Visibility</legend>
        <label htmlFor="great">Great</label>
        <input
          type="radio"
          name="visibility"
          id="great"
          value="great"
          checked={visibility === 'great'}
          onChange={({ target }) => setVisibility(target.value)}
        />
        <label htmlFor="good">Good</label>
        <input
          type="radio"
          name="visibility"
          id="good"
          value="good"
          checked={visibility === 'good'}
          onChange={({ target }) => setVisibility(target.value)}
        />
        <label htmlFor="ok">Ok</label>
        <input
          type="radio"
          name="visibility"
          id="ok"
          value="ok"
          checked={visibility === 'ok'}
          onChange={({ target }) => setVisibility(target.value)}
        />
        <label htmlFor="poor">Poor</label>
        <input
          type="radio"
          name="visibility"
          id="poor"
          value="poor"
          checked={visibility === 'poor'}
          onChange={({ target }) => setVisibility(target.value)}
        />
      </fieldset>
      <fieldset>
        <legend>Weather</legend>
        <label htmlFor="sunny">Sunny</label>
        <input
          type="radio"
          name="weather"
          id="sunny"
          value="sunny"
          checked={weather === 'sunny'}
          onChange={({ target }) => setWeather(target.value)}
        />
        <label htmlFor="rainy">Rainy</label>
        <input
          type="radio"
          name="weather"
          id="rainy"
          value="rainy"
          checked={weather === 'rainy'}
          onChange={({ target }) => setWeather(target.value)}
        />
        <label htmlFor="cloudy">Cloudy</label>
        <input
          type="radio"
          name="weather"
          id="cloudy"
          value="cloudy"
          checked={weather === 'cloudy'}
          onChange={({ target }) => setWeather(target.value)}
        />
        <label htmlFor="stormy">Stormy</label>
        <input
          type="radio"
          name="weather"
          id="stormy"
          value="stormy"
          checked={weather === 'stormy'}
          onChange={({ target }) => setWeather(target.value)}
        />
        <label htmlFor="windy">Windy</label>
        <input
          type="radio"
          name="weather"
          id="windy"
          value="windy"
          checked={weather === 'windy'}
          onChange={({ target }) => setWeather(target.value)}
        />
      </fieldset>
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

