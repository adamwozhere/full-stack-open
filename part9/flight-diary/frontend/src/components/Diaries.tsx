import { NonSensitiveDiaryEntry } from '../types';
import DiaryEntry from './DiaryEntry';

interface Props {
  diaries: NonSensitiveDiaryEntry[];
}

const Diaries = ({ diaries }: Props) => {
  return (
    <div>
      <h2>Entries</h2>
      {diaries.map((diary) => (
        <DiaryEntry key={diary.id} entry={diary} />
      ))}
    </div>
  );
};

export default Diaries;

