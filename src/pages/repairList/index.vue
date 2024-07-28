<template>
  <view class="repairList">
    <view class="box">
      <view class="tag">
        <USegment
          :current="segIndex"
          :values="items"
          style-type="text"
          active-color="#09C46E"
          @clickItem="onClickItem"
        />
      </view>
      <view v-if="loading == false" class="content">
        <RepairListItem :pageIndex="pageIndex" />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, ref, watch, onMounted } from "vue";
import USegment from "@/components/USegment/index.vue";
import RepairListItem from "./components/repairListItem/index.vue";
import store from "@/store";
import { ActionTypes } from "@/enums/actionTypes";
import ULoadMore from "@/components/ULoadMore/index.vue";
import { showToast } from "@/utils/helper";
//订单类别
const segIndex: Ref<number | undefined> = ref(0);
const pageIndex: Ref<number | undefined> = ref(0);
//loading配置
const loadingOption = {
  contentdown: "下拉显示更多",
  contentrefresh: "正在加载",
  contentnomore: "没有更多了",
};
//是否数据正在加载
const loading = ref<boolean>(true);
//pageIndex转换为state
const state = new Map([
  [0, 5],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, -10],
]);
export default defineComponent({
  name: "RepairList",
  components: { USegment, RepairListItem, ULoadMore },

  setup() {
    const items = ["全部", "进行中", "待确认", "已完成", "已售后"];
    const onClickItem = (value: any) => {
      pageIndex.value = state.get(value.currentIndex);
      console.log("repairListItem_pageIndex--->", pageIndex.value);
      segIndex.value = value.currentIndex;
    };
    return {
      items,
      segIndex,
      onClickItem,
      pageIndex,
      state,
      loadingOption,
      loading,
    };
  },
  onLoad(option) {
    loading.value = true;
    if (option?.pageIndex) {
      segIndex.value = option.pageIndex;
      pageIndex.value = state.get(Number(option.pageIndex));
    }
    store.dispatch(ActionTypes.getRepairOrders);
    loading.value = false;
  },
  onShow() {
    loading.value = true;
    console.log("repairList show");
    store.dispatch(ActionTypes.getRepairOrders);
    loading.value = false;
  },
  onPullDownRefresh() {
    loading.value = true;
    store.dispatch(ActionTypes.getRepairOrders).then(() => {
      uni.stopPullDownRefresh();
      showToast("刷新成功", "success");
      loading.value = false;
    });
  },
});
</script>

<style lang="scss">
.repairList {
  .box {
    width: 100%;
    .tag {
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      position: fixed;
      z-index: 1;
      top: 0;
      width: 100%;
      height: 80rpx;
      margin: auto 0;
      background-color: #ffffff;
    }
    .content {
      margin-top: 100rpx;
      flex: 1;
      width: 100%;
    }
    .loading {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
