import http from '@/api/config';
import { Community } from './index.d';

export default {
  getCommunityList: (): Promise<Array<Community.CommunityColumn>> =>
    http.get('/api/community/list'),
  getPassageListByName: (params: Community.GetPassageParam): Promise<Community.PassageResult> =>
    http.get('/api/community/select', params)
};
