import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}));
const PORT = 3000;

const api = express.Router();
app.use('/api', api);

api.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});