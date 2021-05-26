import { Router } from 'express';
import { feedItemService, storageService } from '../../services';
import auth from '../../middlewares/auth';

const router = Router();
router.use(auth);

router.get('/', async (_req, res) => {
  const items = await feedItemService.findAll();
  res.status(200).json(items);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json('id should be a number');
  }

  const feed = await feedItemService.findById(id);

  if (!feed) {
    return res.status(404).json(`could not find a feed item with id ${id}`);
  }

  res.status(200).json(feed);
});

router.get('/signed-url/:fileName', async (req, res) => {
  const { fileName } = req.params;
  const url = storageService.getPutSignedUrl(fileName);
  res.status(201).send({ url: url });
});

router.post('/', async (req, res) => {
  const { caption, fileName } = req.body;

  if (!caption || !fileName) {
    return res.status(400).json('feed item should have attributes caption and fileName');
  }

  const item = await feedItemService.create(caption, fileName);

  res.status(201).json({
    caption: item?.caption,
    url: item?.url,
  });
});

export default router;