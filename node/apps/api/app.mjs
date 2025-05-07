import express from 'express';
import cookieParser from 'cookie-parser';

import logger from '#core/logger.mjs';
import requestLogger from './middleware/request-logger.mjs';
import InternalModule from '#core/internal.mjs';

import makeRoutes from './routes/index.mjs';

const app = express();

function fatalHandler(err) {
    logger.error(err, {FATAL: true});
    Process.exit(1);
}

process.on('uncaughtException', fatalHandler);
process.on('unhandledRejection', fatalHandler);

app.use(requestLogger);
app.use(cookieParser(process.env.COOKIE_HTTP_SECRET));

function allowCrossDomain(req, res, next) {
    console.log("ola");
    res.header('Access-Control-Allow-Origin', req.headers.origin || '');

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PUT');
    res.header(
        'Access-Control-Allow-Headers', 
        'Content-Type, Authorization, user_id'
    );

   res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
   );

   res.header('Access-Control-Allow-Credentials', "true");

   if (req.method == 'OPTIONS') {
    res.sendStatus(200);
    return;
   }

   next();
}

app.use(allowCrossDomain);

app.use(express.json());

app.use((req, _res, next) => {
    const core = new InternalModule();
    req.core = core;

    next();
});

makeRoutes(app);

app.get('/', (_req, res) => {
    res.status(200).json({ msg: 'hello world'});
});

app.use((err, _req, res, _next) => {
    logger.error(err);

    const msg = err instanceof Error ? err.message : err;
    const statusCode = /Forbidden/.test(msg) ? 403 : 500;

    res.status(statusCode).json({ msg, status: statusCode });
})

app.listen(process.env.API_HTTP_PORT, () => {
    logger.info(`http server opened on ${process.env.API_HTTP_PORT}`);
});