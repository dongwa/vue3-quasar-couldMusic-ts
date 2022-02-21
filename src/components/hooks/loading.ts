import { ref } from 'vue';

export function useFetchWithLoading<T, R>(
  fetch: (...rest: R[]) => Promise<T>,
  ...r: R[]
) {
  const loading = ref(true);
  const data = ref<T>();
  fetch(...r).then((res) => {
    data.value = res;
    loading.value = false;
  });
  return { loading, data };
}
