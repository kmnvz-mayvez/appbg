import { user, singleUserById } from '@auth/controllers/search';
import express, { Router } from 'express';

const router: Router = express.Router();

export function searchRoutes(): Router {
    router.get('/search/user/:from/:size/:type', user);
    router.get('/search/user/:userId', singleUserById);

    return router;
}
