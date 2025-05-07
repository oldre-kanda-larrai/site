import express from 'express';
import dirname from "#root/dirname.mjs";

import makeRoutes from './routes/index.mjs';

import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({
    path: path.resolve(dirname, '.env')
});

const app = express();

app.use(express.static(path.resolve(dirname, './public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(dirname, './views/'));

function fatalHandler(err) {
    console.error(err, {FATAL: true});
    process.exit(1);
}

process.on('uncaughtException', fatalHandler);
process.on('unhandledRejection', fatalHandler);

app.use('/', (_req, res) => {
    res.render('index');
});


makeRoutes(app);

app.use((err, _req, res, _next) => {
    console.error(err);

    const msg = err instanceof Error ? err.message : err;
    const statusCode = /Forbidden/.test(msg) ? 403 : 500;

    res.status(statusCode).json({ msg, status: statusCode });
})

app.listen(process.env.STORE_HTTP_PORT, () => {
    console.log(`http server opened on ${process.env.STORE_HTTP_PORT}`);
});