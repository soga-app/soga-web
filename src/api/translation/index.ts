import http from '@/api/config';
import { Trans } from './index.d';

export default {
  translate: (data: Trans.TransParam): Promise<Trans.TransResult> =>
    http.post('/api/translate', data),
  translateHistory: (): Promise<Array<Trans.TransHistoryItem>> => http.get('/api/history')
};
