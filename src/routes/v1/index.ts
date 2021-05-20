import { Router } from 'express';
import userRoute from './user.route';
import feedRoute from './feedItem.route';

const router = Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/feed',
    route: feedRoute
  }
];

defaultRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;