import http from '@/api/config';
import { Collection } from './index.d';

export default {
  // 创建收藏夹
  createCollectFile: (params: { name: string }): Promise<void> =>
    http.post('/api/collections/insert', null, { params }),
  // 获取收藏夹内容
  getCollectionFile: (param: { colId: number }): Promise<Array<Collection.CollectionContent>> =>
    http.get('/api/collections/select', param),
  // 收藏夹列表
  getCollectionList: (): Promise<Array<Collection.CollectionItem>> =>
    http.get('/api/collections/list'),
  // 修改收藏夹名称
  updateCollectionName: (data: { name: string; id: number }): Promise<void> =>
    http.post('/api/collections/update', data),
  //收藏内容
  collectContent: (data: Collection.CollectContentParam): Promise<void> =>
    http.post('/api/colSentence/add', data)
};
