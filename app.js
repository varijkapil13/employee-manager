import http from 'http';
import express from 'express';

import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes';

const hostname = '127.0.0.1';
const port = 9000;
const app = express();
const server = http.createServer(app);

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

app.get('/', (req, res) =>
  res.status(200).send({
    message: 'Connected to the API'
  })
);

server.listen(port, hostname, () => {
  console.log('Server running at http://' + hostname + ' + :' + port);
});
