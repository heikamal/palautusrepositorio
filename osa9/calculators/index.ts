import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

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
  const dailyExer = req.body.daily_exercises
  const target = req.body.target
  if (!target && !dailyExer){
    res.status(400).json({ error: 'parameters missing' })
  }

  res.status(200).json(calculateExercises(dailyExer, target))
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});