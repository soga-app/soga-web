import ListLoading from '@/components/global/ListLoading.vue';
import SvgIcon from '@/components/global/SvgIcon.vue';
import InputNumberScroll from '@/components/global/InputNumberScroll.vue';
import TimeCount from '@/components/global/TimeCount.vue';
import VirtualListLoad from '@/components/global/VirtualListLoad.vue';
import BookMarkModal from '@/components/global/BookMarkModal.vue';
import BookMarkDropDown from '@/components/global/BookMarkDropDown.vue';

export default {
  install(app: any, options: any) {
    // 定义全局组件
    app.component('SvgIcon', SvgIcon);
    app.component('ListLoading', ListLoading);
    app.component('InputNumberScroll', InputNumberScroll);
    app.component('TimeCount', TimeCount);
    app.component('VirtualListLoad', VirtualListLoad);
    app.component('BookMarkModal', BookMarkModal);
    app.component('BookMarkDropDown', BookMarkDropDown);
  }
};
