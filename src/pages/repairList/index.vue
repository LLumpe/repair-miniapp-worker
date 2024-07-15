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
      <view class="content">
        <view v-if="segIndex == 0"
          ><RepairListItem :pageIndex="pageIndex"></RepairListItem
        ></view>
        <view v-if="segIndex == 1"
          ><RepairListItem :pageIndex="pageIndex"
        /></view>
        <view v-if="segIndex == 2"
          ><RepairListItem :pageIndex="pageIndex"
        /></view>
        <view v-if="segIndex == 3"
          ><RepairListItem :pageIndex="pageIndex"
        /></view>
        <view v-if="segIndex == 4"
          ><RepairListItem :pageIndex="pageIndex"
        /></view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, ref, watch, onMounted } from "vue";
import USegment from "@/components/USegment/index.vue";
import RepairListItem from "./components/repairListItem/index.vue";
//订单类别
const segIndex: Ref<number | undefined> = ref(0);
const pageIndex: Ref<number | undefined> = ref(0);
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
  components: { USegment, RepairListItem },

  setup(props, ctx) {
    const items = ["全部", "进行中", "待确认", "已完成", "已售后"];
    console.log("state", state);
    const onClickItem = (value: any) => {
      console.log("state.get", state.get(value.currentIndex));
      pageIndex.value = state.get(value.currentIndex);
      segIndex.value = value.currentIndex;
    };
    return { items, segIndex, onClickItem, pageIndex, state };
  },
  onLoad(option) {
    segIndex.value = option.pageIndex ?? 0;
    pageIndex.value = state.get(Number(option.pageIndex ?? 0));
  },
});
</script>

<style lang="scss">
.repairList {
  .box {
    width: 100%;
    .tag {
      position: sticky;
      top: 0;
      width: 100%;
      height: 70rpx;
      z-index: 1;
      background-color: #ffffff;
    }
    .content {
      margin-top: 30rpx;
      flex: 1;
      width: 100%;
    }
  }
}
</style>
