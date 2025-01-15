import express = require('express');
import bmiCalculator from './bmiCalculator';

const app = express();
interface RequestParams {}
interface ResponseBody {}
interface RequestBody {}
interface RequestQuery {
  weight: string;
  height: string;
}
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: express.Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: express.Response) => {
  const weight: string = req.query.weight;
  const height: string = req.query.height;
  try {
    const bmi = bmiCalculator(height, weight)
    res.send({
      weight: Number(weight),
      height: Number(height),
      bmi: bmi
    })
  } catch(error) {
    if (error instanceof ReferenceError || error instanceof TypeError) {
      res.status(400).send(String(error))
    } else {
      res.status(500).send(String(error))
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});