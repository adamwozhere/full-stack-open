import express from 'express';
const app = express();

import calculateBmi from './bmiCalculator';

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

