import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getDiaries = async () => {
  try {
    const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
    return response.data;
  } catch (error) {
    let message = 'Something went wrong.';

    if (axios.isAxiosError(error)) {
      message = error.response?.data;
    }

    throw new Error(message);
  }
};

const addDiary = async (diary: NewDiaryEntry) => {
  try {
    const response = await axios.post<NewDiaryEntry>(baseUrl, {
      ...diary,
      weather: diary.weather.toString(),
      visibility: diary.visibility.toString(),
    });
    return response.data as DiaryEntry;
  } catch (error) {
    let message = 'Something went wrong.';

    if (axios.isAxiosError(error)) {
      message = error.response?.data;
    }

    throw new Error(message);
  }
};

export default {
  getDiaries,
  addDiary,
};

