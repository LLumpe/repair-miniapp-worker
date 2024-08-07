<!--
 * @Author: LLumpe LLumpe@163.com
 * @Date: 2024-07-27 02:37:23
 * @LastEditors: LLumpe LLumpe@163.com
 * @LastEditTime: 2024-08-08 01:01:07
 * @FilePath: \repair-miniapp-worker\src\pages\index\components\ReceiveLeaderboard\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <view class="box" @click="handleClickLeaderBoardRoom">
    <view class="border">
      <image
        style="width: 100rpx; height: 100rpx; margin-top: 40rpx"
        src="../../../../static/images/home/leaderBoard.png"
        mode=""
      />
      <view class="text">
        <h2>完成订单分值</h2>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { navigateTo } from "@/utils/helper";
import { useStore } from "vuex";
import authService from "@/service/authService";
import { ActionTypes } from "@/enums/actionTypes";
export default defineComponent({
  name: "ReceiveLeaderboard",
  setup() {
    const store = useStore();
    function handleClickLeaderBoardRoom() {
      const logged = store.getters.logged;
      if (logged) {
        navigateTo("/pages/leaderBoard/index", { type: 1 });
      } else {
        authService.login();
      }
    }
    return { handleClickLeaderBoardRoom };
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 200rpx;
  height: 300rpx;
  &:active {
    background-color: rgba(85, 85, 85, 0.1); /* 半透明蓝色 */
  }
  .border {
    @include style(100%, 300rpx, 0, 0);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    .text {
      text-align: center;
      @include font(32rpx, #000000, 56rpx);
    }
  }
}
</style>
