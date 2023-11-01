import { NonSensitiveDiaryEntry } from '../types';

interface Props {
  entry: NonSensitiveDiaryEntry;
}

const DiaryEntry = ({ entry }: Props) => {
  return (
    <>
      <h3>{entry.date}</h3>
      <p>visibility: {entry.visibility}</p>
      <p>weather: {entry.weather}</p>
    </>
  );
};

export default DiaryEntry;

