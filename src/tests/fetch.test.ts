import { useGet } from '../api/axios';
import { retry } from './utils';
const testAPis = {
  search: '/search',
};

it('useGet', async () => {
  const { data, res } = useGet(testAPis.search, {
    keywords: '海阔天空',
  });
  await retry(
    () => {
      expect(res.value).not.toBeUndefined();
      expect(res.value?.status).lessThanOrEqual(400);
      console.log('data====>', data.value);
      console.log('res=====>', res.value);
    },
    {
      timeout: 3 * 1000,
    }
  );
});
