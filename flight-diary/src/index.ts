import express from 'express';
const app = express();
import diaryRouter from './routes/diaries';
import cors from 'cors';
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}));
const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});