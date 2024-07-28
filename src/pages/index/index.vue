<template>
  <view>
    <top />
    <view class="body">
      <announcement />
      <all-tasks style="margin-top: 64rpx" />
      <view class="body-leaderBoard">
        <ReceiveLeaderboard />
        <ResponseLeaderboard />
        <CancelLeaderboard />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Top from "./components/Top/index.vue";
import Announcement from "./components/Announcement/index.vue";
import AllTasks from "./components/AllTasks/index.vue";
import ReceiveLeaderboard from "./components/ReceiveLeaderboard/index.vue";
import ResponseLeaderboard from "./components/ResponseLeaderboard/index.vue";
import CancelLeaderboard from "./components/CancelLeaderboard/index.vue";
import Status from "./components/Status/index.vue";
import { navigateTo } from "@/utils/helper";

export default defineComponent({
  components: {
    Top,
    Announcement,
    AllTasks,
    ReceiveLeaderboard,
    ResponseLeaderboard,
    CancelLeaderboard,
  },

  setup() {
    const gotoMap = () => {
      navigateTo("/pages/map/index");
    };
    return { gotoMap };
  },
  onShow() {
    // store.dispatch(ActionTypes.getCount);
  },
});
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  height: 400upx;
}

.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}

.title {
  font-size: 36upx;
  color: #8f8f94;
}

.body {
  margin-top: 64rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-leaderBoard {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 40rpx;
    padding: 0 40rpx 0 40rpx;
    box-sizing: border-box;
    justify-content: space-between;
  }
}
</style>
