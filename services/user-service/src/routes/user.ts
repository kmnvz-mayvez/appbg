import { email, currentUsername, username, hour, plate } from '@users/controllers/user/get';
import { seed } from '@users/controllers/user/seed';
import { userUpdate } from '@users/controllers/user/update';
import express, { Router } from 'express';

const router: Router = express.Router();

const userRoutes = (): Router => {
  router.get('/email', email);
  router.get('/username/plate', plate);
  router.get('/username/plate/hour', hour);
  router.get('/username', currentUsername);
  router.get('/:username', username);
  router.put('/:userId', userUpdate);
  router.put('/seed/:count', seed);

  return router;
};

export { userRoutes };
