import express from 'express';
const app = express();

app.use(express.json());

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const output = calculateBmi(Number(height), Number(weight));
    res.json(output);
  } else {
    res.status(400).send('Malformatted parameters');
  }
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  }

  if (
    (daily_exercises as []).some((day) => isNaN(Number(day))) ||
    isNaN(Number(target))
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises({
    exerciseHours: daily_exercises as number[],
    targetHours: Number(target),
  });
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

