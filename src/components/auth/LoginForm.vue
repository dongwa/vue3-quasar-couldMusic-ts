<template>
  <q-card class="my-card">
    <q-card-section class="row items-center q-ma-none q-pa-none">
      <q-space />
      <q-btn
        icon="close"
        color="#ccc"
        flat
        round
        dense
        @click="$store.commit('auth/toggleLoginForm', false)"
      />
    </q-card-section>
    <q-card-section>
      <div class="text-h6 text-center">扫码登陆</div>
    </q-card-section>
    <q-card-section>
      <img :src="QRcode" />
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import {
  getQRKey,
  createQRbase64,
  checkPrLogin,
  getUserInfo,
} from '../../api/auth/index';
import { useStore } from 'vuex';
export default defineComponent({
  setup() {
    const store = useStore();
    let QRcode = ref('');
    let state = ref(false); //标志是否开始检测二维码
    let key: string = '';
    let timer;
    const useGetQR = async () => {
      key = await getQRKey();
      QRcode.value = await createQRbase64(key);
      state.value = true;
    };

    watch(state, (newstate, prevstate) => {
      if (newstate) {
        timer = setInterval(async () => {
          const statusRes: any = await checkPrLogin(key).catch((err) => {
            console.log(err);
          });
          if (statusRes.code === 800) {
            state.value = false;
            clearInterval(timer);
          }
          if (statusRes.code === 803) {
            // 这一步会返回cookie
            clearInterval(timer);
            state.value = false;
            let cookie: string = statusRes.cookie;
            store.dispatch('auth/setUserInfo');
          }
        }, 3000);
      }
    });
    onMounted(async () => {
      useGetQR();
      const statusRes: any = await checkPrLogin(key);
    });
    return {
      QRcode,
    };
  },
});
</script>
