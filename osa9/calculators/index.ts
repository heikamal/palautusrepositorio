import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
		res.status(400).json({ error: 'malformatted parameters' });
	} 

  res.status(200).json({ weight: weight, height: height, bmi: calculateBmi(height, weight) });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // varmistetaan parametrien olemassaolo
  if (!target || !daily_exercises ){
    res.status(400).json({ error: 'parameters missing' });
  }

  // varmistetaan parametrien tyypit
  if ( isNaN(Number(target)) || !Array.isArray(daily_exercises)){
    res.status(400).json({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.status(200).json(calculateExercises(daily_exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});