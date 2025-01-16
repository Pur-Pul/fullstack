import express from 'express';
import bmiCalculator from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());
interface BMIQuery {
  weight: string;
  height: string;
}
interface ExerciseRequestBody {
  daily_exercises: string[];
  target: string;
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: express.Request<unknown, unknown, unknown, BMIQuery>, res: express.Response) => {
  const weight: string | undefined = req.query.weight;
  const height: string | undefined = req.query.height;
  try {
    const bmi = bmiCalculator(height, weight);
    res.send({
      weight: Number(weight),
      height: Number(height),
      bmi: bmi
    });
  } catch(error) {
    if (error instanceof ReferenceError) {
      res.status(422).send({ error: error.message });
    } else if (error instanceof TypeError) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: String(error) });
    }
  }
});

app.post('/exercises', (req: express.Request<unknown, unknown, ExerciseRequestBody, unknown>, res: express.Response) => {
  try {
    const exerciseResult = calculateExercises(req.body.target, req.body.daily_exercises);
    res.send(exerciseResult);
  } catch(error) {
    if (error instanceof ReferenceError) {
      res.status(422).send({ error: error.message });
    } else if (error instanceof TypeError) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: String(error) });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});