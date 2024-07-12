<template>
  <view class="box">
    <view class="header">
<!--      {{props.}} -->
    </view>
    <view class="content">
      
    </view>
  </view>
</template>

<script lang="ts">
import { repairOrder } from "@/api/types/models";
import {
  computed,
  ComputedRef,
  defineComponent,
  reactive,
  Ref,
  ref,
  PropType
} from "vue";

// const repairOrderInfo: Ref<repairOrder|null> = ref({});

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<repairOrder>,
      default: undefined,
    },
  },
  components: { },
  setup(props) {

    return {
   
    };
  },
    
  onShow(){

  }
});
</script>

<style lang="scss">
.box{
 margin: 0 auto 20rpx auto;
 box-sizing: border-box;
 width: 700rpx;
 height: 300rpx;
 background: #ffffff;
 border: 1rpx solid #D8D8D8;
 border-radius: 10rpx;
 .content{
   
 }
}
</style>
