import { verifyGatewayRequest } from '@kmnvz-mayvez/myapp-share';
import { Application } from 'express';
import { userRoutes } from '@users/routes/user';
import { healthRoutes } from '@users/routes/health';

const USER_BASE_PATH = '/api/v1/user';

const appRoutes = (app: Application): void => {
  app.use('', healthRoutes());
  app.use(USER_BASE_PATH, verifyGatewayRequest, userRoutes());
};

export { appRoutes };
