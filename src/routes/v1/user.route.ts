import { Router } from 'express';
import { userService } from '../../services';

const router = Router();

router.get('/', async (_req, res) => {
  res.status(404).json('I am sorry... who is that person?');
});

router.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('new user should have attributes email and password');
  }

  const result = await userService.register(email, password);

  if (!result) {
    return res.status(422).json(`email "${email}" is already taken`);
  }

  const [token, newUserId] = result;
  res.status(201).json({ token, newUserId });
});

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('email and password are expected');
  }

  const token = await userService.login(email, password);

  if (!token) {
    return res.status(401).json('Sorry I don\'t know you');
  }

  res.status(200).json({ token });
});

export default router;