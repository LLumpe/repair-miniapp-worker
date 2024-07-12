<template>
  <view class="box" @click="handleClickMissionRoom()">
    <view class="border">
      <image
        style="width: 100rpx; height: 100rpx"
        src="../../../../static/images/home/room.png"
        mode=""
      />
      <view class="text">
        <view class="first-text">
          <view style="height: 56rpx"> 任务大厅 </view>
        </view>
        <view class="second-text">
          <view style="height: 34rpx"> 在这里查看目前所有任务信息 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { navigateTo } from "@/utils/helper";
export default defineComponent({
  setup() {
    function handleClickMissionRoom() {
      uni.switchTab({
        url: "/pages/myMissions/index",
      });
      // navigateTo("/pages/myMissions/index");
    }
    return { handleClickMissionRoom };
  },
});
</script>

<style lang="scss" scoped>
@mixin style($width: 0, $height: 0, $left: 0, $top: 0) {
  width: $width;
  height: $height;
  padding-left: $left;
  padding-top: $top;
  box-sizing: border-box;
}
@mixin font($font, $color, $lineh) {
  font-size: $font;
  color: $color;
  line-height: $lineh;
  font-weight: 600;
}
.box {
  @include style(672rpx, 186rpx, 0, 0);
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  // border: 1rpx solid rgba(0, 0, 0, 0.2);
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  &:active {
    background-color: rgba(85, 85, 85, 0.1); /* 半透明蓝色 */
  }
  .border {
    @include style(100%, 100rpx, 32rpx, 0);
    display: flex;
    image {
    }
    .text {
      text-align: center;
      flex: 1;
      @include style(none, 100rpx, 0, 0);
      .first-text {
        width: 100%;

        height: 56rpx;
        @include font(40rpx, #000000, 56rpx);
        letter-spacing: 10rpx;
        display: flex;
        justify-content: center;
      }
      .second-text {
        width: 100%;
        height: 34rpx;
        margin-top: 16rpx;
        @include font(24rpx, #979797, 34rpx);
      }
    }
  }
}
</style>
