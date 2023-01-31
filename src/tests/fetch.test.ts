import { useGet } from '../api/axios';
import { retry } from './utils';
const testAPis = {
  search: '/search',
};

describe('useFetch', () => {
  it('without await and then', async () => {
    const { response } = useGet(testAPis.search, {
      keywords: '海阔天空',
    });
    await retry(
      () => {
        expect(response.value).not.toBeUndefined();
        expect(response.value?.status).lessThanOrEqual(400);
      },
      {
        timeout: 3 * 1000,
      }
    );
  });

  it('it whit await', async () => {
    const { response } = await useGet<IUserInfo>(testAPis.search, {
      keywords: '海阔天空',
    });
    expect(response.value).not.toBeUndefined();
    expect(response.value?.status).lessThanOrEqual(400);
  });

  it('it whit then', () => {
    useGet<IUserInfo>(testAPis.search, {
      keywords: '海阔天空',
    }).then((r) => {
      expect(r.response.value).not.toBeUndefined();
      expect(r.response.value?.status).lessThanOrEqual(400);
    });
  });
});
