import express from 'express';
import bmiCalculator from './bmiCalculator';

const app = express();
interface RequestQuery {
  weight: string;
  height: string;
}
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: express.Request<unknown, unknown, unknown, RequestQuery>, res: express.Response) => {
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
    if (error instanceof ReferenceError || error instanceof TypeError) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: String(error) });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});