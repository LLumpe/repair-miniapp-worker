<template>
  <view class="leaderBoardList">
    <view class="list">
      <view v-if="!leaderboardType || !leaderboardType.length" class="empty">
        <LeaderBoardListEmpty message="本月暂无排行榜~" />
      </view>
      <view
        class="item"
        v-for="(item, index) in leaderboardType"
        :key="item.id"
      >
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
              <image :src="item.avatarUrl || '@/static/images/icon/user.png'" />
            </view>
            <view class="item-top-info-name">
              <span>{{ item.name }}</span>
              <view v-if="type === 1">
                <span class="item-top-info-name-number">完成订单分值</span>
                <view
                  style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                  "
                >
                  <text
                    class="item-top-info-name-order"
                    style="font-size: 60rpx"
                  >
                    {{ item.finishScore === null ? "-" : item.finishScore }}
                  </text>
                  <span
                    v-if="item.receiveNumber != null"
                    style="font-size: 20rpx; color: gray"
                    >分</span
                  >
                </view>
              </view>
              <view v-if="type === 2">
                <span class="item-top-info-name-number">平均响应时间</span>
                <view
                  style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                  "
                >
                  <text
                    class="item-top-info-name-order"
                    style="font-size: 60rpx"
                  >
                    {{
                      item.responseDuration === null
                        ? "-"
                        : item.responseDuration
                    }}
                  </text>
                  <span
                    v-if="item.responseDuration != null"
                    style="font-size: 20rpx; color: gray"
                    >分钟</span
                  >
                </view>
              </view>
              <view v-if="type === 3">
                <span class="item-top-info-name-number">退单返修率</span>
                <view
                  style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                  "
                >
                  <text
                    class="item-top-info-name-order"
                    style="font-size: 60rpx"
                  >
                    {{
                      item.cancelRate == null
                        ? "-"
                        : `${(item.cancelRate * 100).toFixed(1)}`
                    }}
                  </text>
                  <span
                    v-if="item.cancelRate != null"
                    style="font-size: 20rpx; color: gray"
                    >%</span
                  >
                </view>
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
import { computed, defineComponent } from "vue";
import LeaderBoardListEmpty from "../Empty/index.vue";
import store from "@/store";
export default defineComponent({
  name: "LeaderBoardList",
  components: { LeaderBoardListEmpty },
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    console.log("list props", props.type);
    let leaderboardType;
    const leaderboard = computed(() => {
      return store.getters.leaderboard;
    });
    console.log("leaderboard", leaderboard);

    if (props.type === 1) {
      leaderboardType = computed(() => {
        return store.getters.leaderboardReceive;
      });
    }
    if (props.type === 2) {
      leaderboardType = computed(() => {
        return store.getters.leaderboardResponse;
      });
    }
    if (props.type === 3) {
      leaderboardType = computed(() => {
        return store.getters.leaderboardCancel;
      });
    }
    return {
      leaderboardType,
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
            font-size: $uni-font-size-lg;
            letter-spacing: 2rpx;
            display: flex;
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
              width: 150rpx;
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
