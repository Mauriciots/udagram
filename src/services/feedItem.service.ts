import FeedItem from '../models/feedItem.model';
import * as storageService from './storage.service';

export const findAll = async (): Promise<FeedItem[]> => {
  const items = await FeedItem.findAll({ order: [['id', 'DESC']] });
  items.forEach(item => item.url = storageService.getGetSignedUrl(item.url));
  return items;
};

export const findById = async (id: number): Promise<FeedItem | null> => {
  const item = await FeedItem.findByPk(id);
  if (item) {
    item.url = storageService.getGetSignedUrl(item.url);
  }
  return item;
};