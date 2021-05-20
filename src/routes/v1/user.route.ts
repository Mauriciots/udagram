import { Router } from 'express';
import { userService } from '../../services';

const router = Router();

router.get('/', async (_req, res) => {
  res.status(404).send('I am sorry... who is that person?');
});

export default router;