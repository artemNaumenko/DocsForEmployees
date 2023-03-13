import express, { Express } from 'express';
var morgan = require('morgan')
import helmet from 'helmet';
var cors = require('cors')
const config = require('../config.json')
import { getFilesWithKeyword } from './utils/getFilesWithKeyword';

const app: Express = express();

require('dotenv').config();

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development' || config.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(cors());
}

if (process.env.NODE_ENV === 'production' || config.NODE_ENV === 'production') {
    app.use(helmet());
}

getFilesWithKeyword('router', __dirname + '/app').forEach((file: string) => {
    const { router } = require(file);
    app.use('/', router);
})

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    return res.status(500).json({
        errorName: err.name,
        message: err.message,
        stack: err.stack || 'no stack defined'
    });
});

export default app;