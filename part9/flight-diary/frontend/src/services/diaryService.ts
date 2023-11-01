import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getDiaries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then((response) => response.data);
};

const addDiary = (diary: NewDiaryEntry) => {
  return axios
    .post<NewDiaryEntry>(baseUrl, {
      ...diary,
      weather: diary.weather.toString(),
      visibility: diary.visibility.toString(),
    })
    .then((response) => response.data as DiaryEntry);
};

export default {
  getDiaries,
  addDiary,
};

