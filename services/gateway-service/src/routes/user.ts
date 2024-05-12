import { Get } from '@gateway/controllers/user/get';
import { UserSeed } from '@gateway/controllers/user/seed';
import { Update } from '@gateway/controllers/user/update';
import { authMiddleware } from '@gateway/services/auth-middleware';
import express, { Router } from 'express';

class UserRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.get('/user/email', authMiddleware.checkAuthentication, Get.prototype.email);
        this.router.get('/user/username', authMiddleware.checkAuthentication, Get.prototype.currentUsername);
        this.router.get('/user/:username', authMiddleware.checkAuthentication, Get.prototype.username);
        this.router.get('/user/username/:plate', authMiddleware.checkAuthentication, Get.prototype.plate);
        this.router.get('/user/username/plate/hour', authMiddleware.checkAuthentication, Get.prototype.hour);
        this.router.put('/user/:userId', authMiddleware.checkAuthentication, Update.prototype.user);
        this.router.put('/user/seed/:count', authMiddleware.checkAuthentication, UserSeed.prototype.user);

        return this.router;
    }
}

export const userRoutes: UserRoutes = new UserRoutes();
