<template>
  <view
    v-if="announcements && announcements.length"
    class="box"
    @click="handleSwiperClick()"
  >
    <view class="border">
      <image
        style="width: 100rpx; height: 100rpx"
        src="../../../../static/images/home/announce.png"
      />
      <view class="text">
        <swiper
          style="width: 100%; height: 100%"
          :indicator-dots="false"
          :vertical="true"
          :autoplay="true"
          :interval="3000"
          :duration="1000"
          circular
          @change="handleSwiperChange"
        >
          <swiper-item v-for="item in announcements" :key="item.id">
            <view class="first-text">
              <view class="announce-text">
                {{ item.title }}
              </view>
            </view>
            <view class="second-text">
              <view class="abstract-text">
                {{ item.description }}
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { navigateTo } from "@/utils/helper";
import { useStore } from "vuex";
import { ActionTypes } from "@/enums/actionTypes";

export default defineComponent({
  setup() {
    const store = useStore();
    const activeIndex = ref(0);

    function handleSwiperChange(event: { detail: { current: number } }) {
      activeIndex.value = event.detail.current;
    }

    store.dispatch(ActionTypes.getAnnouncements);

    const announcements = computed(() => {
      return store.getters.announcements;
    });

    const handleSwiperClick = () => {
      navigateTo("/pages/announcement/index", {
        id: announcements.value[activeIndex.value].id,
      });
    };

    return {
      announcements,
      handleSwiperChange,
      handleSwiperClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin wh($width: 0, $height: 0, $left: 0, $top: 0) {
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
  @include wh(672rpx, 186rpx, 0, 0);
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
    @include wh(100%, 100rpx, 32rpx, 0);
    display: flex;
    image {
    }
    .text {
      text-align: center;
      flex: 1;
      @include wh(none, 100rpx, 0, 0);
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
