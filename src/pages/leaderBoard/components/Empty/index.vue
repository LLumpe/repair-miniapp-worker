<template>
  <view class="empty">
    <image src="@/static/images/leaderBoard/empty.png" class="empty-icon" />
    <view class="empty-text">
      {{ message }}
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LeaderBoardListEmpty",
  props: {
    message: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $uni-text-color-grey;
  padding: 30rpx 0;

  &-icon {
    width: 150rpx;
    height: 150rpx;
  }

  &-text {
    margin-top: 40rpx;
    font-size: $uni-font-size-base;
  }
}
</style>
