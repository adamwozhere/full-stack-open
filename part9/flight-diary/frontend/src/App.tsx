import { useState, useEffect } from 'react';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';
import diaryService from './services/diaryService';
import Diaries from './components/Diaries';
import NewDiaryForm from './components/NewDiaryForm';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
    []
  );

  useEffect(() => {
    diaryService.getDiaries().then((data) => setDiaryEntries(data));
  }, []);

  const addDiary = (diary: NewDiaryEntry) => {
    diaryService
      .addDiary(diary)
      .then((addedDiary) => setDiaryEntries((prev) => prev.concat(addedDiary)));
  };

  return (
    <div>
      <h1>Flight Diary</h1>
      {JSON.stringify(diaryEntries, null, 2)}
      <NewDiaryForm handleNewDiary={addDiary} />
      <Diaries diaries={diaryEntries} />
    </div>
  );
};

export default App;

