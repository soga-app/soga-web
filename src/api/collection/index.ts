import http from '@/api/config';
import { Collection } from './index.d';

export default {
  // 创建收藏夹
  createCollectFile: (data: { name: string }): Promise<void> =>
    http.post('api/collections/insert', data),
  // 获取收藏夹内容
  getCollectionFile: (param: { id: number }): Promise<Collection.CollectionContent> =>
    http.get('/api/collections/select', param),
  // 收藏夹列表
  getCollectionList: (): Promise<Array<Collection.CollectionItem>> =>
    http.get('/api/collections/list')
};
