import { Search } from '@gateway/controllers/auth/search';
import express, { Router } from 'express';

class SearchRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/auth/search/user/:from/:size/:type', Search.prototype.users);
    this.router.get('/auth/search/user/:userId', Search.prototype.userById);
    return this.router;
  }
}

export const searchRoutes: SearchRoutes = new SearchRoutes();
