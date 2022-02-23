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
        @click="layout.toggleLoginForm(false)"
      />
    </q-card-section>
    <q-card-section>
      <div class="text-h6 text-center">扫码登陆</div>
    </q-card-section>
    <q-card-section @click="refreshQR">
      <img :src="QRcode" />
    </q-card-section>
    <Loading :showing="loading"></Loading>
  </q-card>
</template>
<script lang="ts" setup>
import { useAuthStore, useLayoutStore } from 'src/stores';
import { ref, watch, onBeforeUnmount } from 'vue';
import { getQRKey, createQRbase64, checkPrLogin } from '../../api/auth/index';
import Loading from '../loading/index.vue';

const auth = useAuthStore();
const layout = useLayoutStore();
let QRcode = ref('');
let state = ref(false); //标志是否开始检测二维码
let loading = ref(false);
let QRexpired = ref(false); // 标志二维码是否过期

let key = '';
let timer: NodeJS.Timeout = Object.create(null);
const useGetQR = async () => {
  loading.value = true;
  key = await getQRKey();
  QRcode.value = await createQRbase64(key);

  state.value = true;
  loading.value = false;
  QRexpired.value = false;
};

watch(state, (newstate) => {
  if (newstate) {
    timer = setInterval(async () => {
      const statusRes: any = await checkPrLogin(key).catch((err) => {
        console.log(err);
      });
      // 800表示本次二维码已经过期
      if (statusRes.code === 800) {
        state.value = false;
        clearInterval(timer);
        QRcode.value = require('./assets/1.png');
        QRexpired.value = true;
        return;
      }
      /** 表示已经扫码，等待授权 */
      if (statusRes.code === 802) {
        QRcode.value = require('./assets/2.png');
        return;
      }
      // 803 表示登录已经完成
      if (statusRes.code === 803) {
        // 这一步会返回cookie
        clearInterval(timer);
        state.value = false;
        auth.setUserInfo();
        return;
      }
    }, 3000);
  }
});

useGetQR().then(() => {
  checkPrLogin(key);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

function refreshQR() {
  if (!QRexpired.value) return;
  clearInterval(timer);
  useGetQR();
}
</script>
