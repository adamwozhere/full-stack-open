import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());

// was initially giving an error that it has an 'any' type but randomly went away
// perhaps editor didn't recognise @types/cors straight away
app.use(cors());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

