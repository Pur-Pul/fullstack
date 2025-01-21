import express from 'express';
import pingRouter from './routes/ping'
import diagnosisRouter from './routes/diagnosis'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}));
const PORT = 3000;

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnosisRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});