import http from '@/api/config';
import { Community } from './index.d';

export default {
  getCommunityList: (): Promise<Array<Community.CommunityColumn>> => http.get('/api/community/list')
};
