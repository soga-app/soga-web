import ListLoading from '@/components/global/ListLoading.vue';
import SvgIcon from '@/components/global/SvgIcon.vue';
import InputNumberScroll from '@/components/global/InputNumberScroll.vue';
import TimeCount from '@/components/global/TimeCount.vue';

export default {
  install(app: any, options: any) {
    // 定义全局组件
    app.component('SvgIcon', SvgIcon);
    app.component('ListLoading', ListLoading);
    app.component('TimeCount', TimeCount);
  }
};
