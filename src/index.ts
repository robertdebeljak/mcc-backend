import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import httpContext from 'express-http-context';
import fallback from 'express-history-api-fallback';
import router from './routes';
import './setupMongoose';

const PORT = process.env.PORT || 8080;

const app = express();

app.disable('etag');
app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static(`${__dirname}/public`));
const root = `${__dirname}/public`;

app.use(httpContext.middleware);
app.use((req, res, next) => {
  httpContext.set('request', req);
  next();
});

app.use('/api', router);
app.use(fallback('index.html', { root }));
app.use('*', (req, res) => {
  console.log('ROUTE NOT FOUND');
  res.sendStatus(400);
});


app.listen(PORT, () => {
  console.log(`Cache Service server is online.`);
  console.log(`PORT: ${PORT}`);
});
