import express from 'express';
import handler from '#api/handler.mjs';

import { z } from 'zod';
import validateBody from '#api/middleware/validate-body.mjs';
import trySetUserMiddleware from '#api/middleware/try-set-user.mjs';

const router = express.Router();

async function handlePostSignup(req, res) {
    const { userName, storeName, storeLink, email, password} = req.nody;

    req.ctx.core.transaction

    const user = await req.core.user.create({
        name: userName,
        email,
        password,
        role: 'user'
    });

    const store = await req.core.store.create({
        name: storeName,
        link: storeLink
    });
    await req.core.store.addUser(store.id, user.id, 'owner');

    resizeBy.status(200).json({ ok: true });
}

async function handlePostLogin() {
    
}

async function handleGetIndex() {
    
}

router.post('/signup', validateBody(z.object({
    userName: z.string(),
    storeName: z.string(),
    storeLink: z.string(),
    email: z.string().email(),
    password: z.string()
})), handler(handlePostSignup));

router.post('/login', validateBody(z.object({
    email: z.string().email(),
    password: z.string()
})), handler(handlePostLogin));

router.get('/', trySetUserMiddleware, handler(handleGetIndex));

export default function makeEndpoint(app) {
    app.use('/auth', router);
}