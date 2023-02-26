import http from '@/api/config';
import { Trans } from './index.d';

export default {
  translate: (params: Trans.TransParam): Promise<Trans.TransResult> =>
    http.get('/api/translate', params)
};
