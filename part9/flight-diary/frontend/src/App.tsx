import { useState, useEffect } from 'react';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';
import diaryService from './services/diaryService';
import Diaries from './components/Diaries';
import NewDiaryForm from './components/NewDiaryForm';
import Notification from './components/Notification';
import { useNotify } from './context/NotificationContext';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
    []
  );

  const { notification, notify } = useNotify();

  useEffect(() => {
    diaryService
      .getDiaries()
      .then((data) => setDiaryEntries(data))
      .catch((error) => {
        console.log('error:', error);
        notify(error.message);
      });
  }, [notify]);

  const addDiary = (diary: NewDiaryEntry) => {
    diaryService
      .addDiary(diary)
      .then((addedDiary) => {
        setDiaryEntries((prev) => prev.concat(addedDiary));
        notify(`added diary entry: ${diary.date}`);
      })
      .catch((error) => {
        console.log('error:', JSON.stringify(error));
        notify(error.message);
      });
  };

  return (
    <div>
      <h1>Flight Diary</h1>
      <Notification notification={notification} />
      {JSON.stringify(diaryEntries, null, 2)}
      <NewDiaryForm handleNewDiary={addDiary} />
      <Diaries diaries={diaryEntries} />
    </div>
  );
};

export default App;

