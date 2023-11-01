import { useState, useEffect } from 'react';
import { NonSensitiveDiaryEntry } from './types';
import diaryService from './services/diaryService';
import Diaries from './components/Diaries';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
    []
  );

  useEffect(() => {
    diaryService.getDiaries().then((data) => setDiaryEntries(data));
  }, []);

  return (
    <div>
      <h1>Flight Diary</h1>
      {JSON.stringify(diaryEntries, null, 2)}
      <Diaries diaries={diaryEntries} />
    </div>
  );
};

export default App;

