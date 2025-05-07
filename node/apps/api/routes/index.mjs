import makeAuthRoute from './auth.mjs';

export default function makeRoutes(app) {
    makeAuthRoute(app);
}