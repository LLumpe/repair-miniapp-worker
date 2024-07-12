<template>
  <view class="leaderBoardList">
    <view class="list">
      <view v-if="!data || !data.length" class="empty">
        <LeaderBoardListEmpty message="本月暂无排行榜~" />
      </view>
      <view class="item" v-for="(item, index) in data" :key="item.id">
        <view class="item-top">
          <view class="item-top-image">
            <image
              src="@/static/images/leaderBoard/number1.png"
              v-if="index === 0"
            />
            <span v-if="index === 0"> {{ index + 1 }}</span>
            <image
              src="@/static/images/leaderBoard/number2.png"
              v-if="index === 1"
            />
            <span v-if="index === 1"> {{ index + 1 }}</span>
            <image
              src="@/static/images/leaderBoard/number3.png"
              v-if="index === 2"
            />
            <span v-if="index === 2"> {{ index + 1 }}</span>
            <span v-if="index > 2" style="color: gainsboro">
              {{ index + 1 }}</span
            >
          </view>
          <view class="item-top-info">
            <view class="item-top-info-avatar">
              <image src="@/static/images/icon/user.png"></image>
            </view>
            <view class="item-top-info-name">
              <span>{{ item.name }}</span>
              <view>
                <span class="item-top-info-name-number">接单数</span>
                <text class="item-top-info-name-order">
                  {{ item.star }}
                </text>
              </view>
            </view>
          </view>
        </view>
        <view class="item-bottom"> </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LeaderBoardListEmpty from "../Empty/index.vue";
export default defineComponent({
  name: "LeaderBoardList",
  components: { LeaderBoardListEmpty },
  setup() {
    const data = [
      {
        id: 1,
        name: "赵师傅",
        phone: "152xxxxxxxx",
        city: "天津市",
        province: "天津区",
        star: 20,
      },
      {
        id: 2,
        name: "赵师傅",
        phone: "152xxxxxxxx",
        city: "天津市",
        province: "天津区",
        star: 15,
      },
      {
        id: 3,
        name: "赵师傅",
        phone: "152xxxxxxxx",
        city: "天津市",
        province: "天津区",
        star: 11,
      },
      {
        id: 4,
        name: "赵师傅",
        phone: "152xxxxxxxx",
        city: "天津市",
        province: "天津区",
        star: 10,
      },
      {
        id: 5,
        name: "赵师傅",
        phone: "152xxxxxxxx",
        city: "天津市",
        province: "天津区",
        star: 9,
      },
      {
        id: 6,
        name: "赵师傅",
        phone: "152xxxxxxxx",
        city: "天津市",
        province: "天津区",
        star: 8,
      },
      {
        id: 7,
        name: "赵师傅",
        phone: "152xxxxxxxx",
        city: "天津市",
        province: "天津区",
        star: 7,
      },
      {
        id: 8,
        name: "赵师傅",
        phone: "152xxxxxxxx",
        city: "天津市",
        province: "天津区",
        star: 5,
      },
      {
        id: 9,
        name: "赵师傅",
        phone: "152xxxxxxxx",
        city: "天津市",
        province: "天津区",
        star: 4,
      },
      {
        id: 10,
        name: "赵师傅",
        phone: "152xxxxxxxx",
        city: "天津市",
        province: "天津区",
        star: 2,
      },
    ];
    // const data: any[] = [];
    return {
      data,
    };
  },
});
</script>
<style lang="scss" scoped>
.leaderBoardList {
  .list {
    width: 100%;
    margin-top: 20rpx;
    box-sizing: border-box;
    padding: 0 20rpx 0rpx 20rpx;
    .empty {
      width: 100%;
      margin-top: 300rpx;
    }
    .item {
      width: 100%;
      height: 110rpx;
      border-radius: 20rpx;
      margin-bottom: 30rpx;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      background-color: rgb(9, 196, 110, 0.5);
      &-top {
        width: 100%;
        height: 110rpx;
        border-radius: 20rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        &-image {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 190rpx;
          height: 190rpx;
          border-radius: 20rpx;
          image {
            border-radius: 20rpx;
            width: 90rpx;
            height: 90rpx;
            // background-color: aqua;
          }
          span {
            line-height: 80rpx;
            display: flex;
            align-items: center;
            font-weight: 900;
            font-size: 80rpx;
            color: #ffffff;
            position: absolute;
          }
        }
        &-info {
          position: relative;
          height: 100%;
          align-items: center;
          display: flex;
          flex: 1;
          &-avatar {
            height: 100%;
            display: flex;
            align-items: center;
            image {
              width: 80rpx;
              height: 80rpx;
              border-radius: 50%;
            }
          }
          &-name {
            width: 100%;
            margin-right: 20rpx;
            margin-left: 20rpx;
            color: $uni-text-color;
            font-size: $uni-font-size-base;
            letter-spacing: 2rpx;
            display: flex;
            font-weight: 600;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            letter-spacing: 2rpx;
            color: #ffffff;
            &-order {
              font-weight: 900;
              display: block;
              margin-top: 20rpx;
              font-size: 80rpx;
              color: #ffffff;
            }
            &-number {
              position: absolute;
              top: 0;
              right: 0;
              background-color: #ffffff;
              color: gray;
              border-top-right-radius: 20rpx;
              border-bottom-left-radius: 50rpx;
              width: 130rpx;
              text-align: center;
              font-size: $uni-font-size-xs;
            }
          }
        }
      }
    }
  }
}
</style>
