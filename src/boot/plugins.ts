import { boot } from 'quasar/wrappers';
//  swiper 额外组件配置
import SwiperCore, {
  Navigation,
  Pagination,
  EffectCoverflow,
  Parallax,
} from 'swiper';

// swiper 单独样式 （less / scss）
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
// swiper 必备组件
import { Swiper, SwiperSlide } from 'swiper/vue';

// 使用额外组件
SwiperCore.use([Navigation, Pagination, EffectCoverflow, Parallax]);

// 全局注册 swiper 必备组件
const plugins = [Swiper, SwiperSlide];

// import { ElCarousel, ElCarouselItem } from 'element-plus';
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  // something to do
  plugins.forEach((item) => {
    app.component(item.name, item);
  });
});
