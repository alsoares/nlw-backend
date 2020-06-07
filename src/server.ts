import cors from 'cors';
import express from 'express';
import path from 'path';
import routes from './routes';


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', '..', 'uploads')));

const port = process.env.PORT || 3333;

app.listen(port ,() => {
    console.log(`Rodando em http://localhost:${port}/`);
});

