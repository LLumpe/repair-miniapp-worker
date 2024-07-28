<template>
  <view>
    <view>
      <view class="name">
        <view style="height: 66rpx">
          {{ announcement.title }}
        </view>
      </view>
      <view class="time">
        <view style="height: 34rpx">
          发布于：{{ announcement.createdAt }}
        </view>
      </view>
      <view class="divide" />
      <view class="content">
        <rich-text style="width: 700rpx" :nodes="announcement.content" />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { requestGetAnnouncements } from "@/api/announcement";
import { showLoading, showToast } from "@/utils/helper";
import { defineComponent, ref } from "vue";
export type announcement = {
  id?: number;
  scene_type?: string;
  title?: string;
  content?: string;
  comment?: string;
  created_at?: string;
};
export default defineComponent({
  props: {
    sceneType: {
      type: String,
      default: "volunteer_notice",
    },
  },
  setup(props) {
    const useAnnouncement = () => {
      const announcement = ref<announcement>({});
      const getAnnouncement = async () => {
        uni.showNavigationBarLoading();
        try {
          const res = await requestGetAnnouncements({
            sceneType: props.sceneType,
          });
          if (res.data.result) {
            announcement.value = res.data.result[0];
          }
        } catch (error) {
          showToast("获取公告内容失败");
        }
        uni.hideNavigationBarLoading();
      };
      getAnnouncement();
      return { announcement, getAnnouncement };
    };
    return { ...useAnnouncement() };
  },
});
</script>

<style lang="scss" scoped>
@mixin wh($width, $heigh, $top, $left) {
  width: $width;
  height: $heigh;
  margin-top: $top;
  margin-left: $left;
  display: flex;
  justify-content: center;
}
@mixin font($size, $color, $lineh) {
  font-size: $size;
  color: $color;
  line-height: $lineh;
}
.name {
  @include wh(750rpx, 66rpx, 48rpx, 0);
  @include font(48rpx, #000000, 66rpx);
}
.from {
  @include wh(750rpx, 34rpx, 16rpx, 0);
  @include font(24rpx, #979797, 34rpx);
}
.time {
  @include font(24rpx, #979797, 34rpx);
  @include wh(750rpx, 34rpx, 16rpx, 0);
}
.content {
  @include wh(750rpx, "100%", 30rpx, 0);
}
.divide {
  width: 650rpx;
  margin: 34rpx auto;
  border: 2rpx solid $uni-border-color;
}
</style>
