<template>
  <view class="box">
    <view class="leaderBoard">
      <view class="title">
        <view class="title-left">
          <view class="title-left-back">
            <text class="iconfont icon-arrow-right" @click="goback" />
          </view>
          <view class="title-left-time">
            <span>{{ year }} - {{ month }}</span>
          </view>
          <view class="title-left-content">
            <span style="font-size: 90rpx">{{ message }}</span>
            <span
              style="
                font-family: 'alimama VF Regular';
                font-size: 50rpx;
                font-style: oblique;
              "
            >
              排行榜
            </span>
          </view>
          <view class="title-left-notice">
            <span class="title-left-notice-text">
              排行结果基于维修师傅本月
              {{ message }}
              数据实时更新
              <image
                src="@/static/images/leaderBoard/notice.png"
                style="margin-left: 10rpx"
                color="#E9E9E9"
              />
            </span>
          </view>
        </view>
        <view class="title-right">
          <view class="title-right-image">
            <image src="@/static/images/leaderBoard/leader.png"></image>
          </view>
        </view>
      </view>
      <view class="list">
        <LeaderBoardList :type="type" />
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import LeaderBoardList from "./components/LeaderBoardList/index.vue";
import store from "@/store";
import { ActionTypes } from "@/enums/actionTypes";
const leaderType = {
  1: "完成订单分值",
  2: "平均响应时间",
  3: "退单返修率",
};
export default defineComponent({
  components: { LeaderBoardList },
  props: {
    type: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    console.log("props", props.type);
    const message = computed(() => {
      return leaderType[props.type];
    });
    /* 获取时间 */
    const [year, month] = [
      new Date().getFullYear(),
      String(new Date().getMonth() + 1).padStart(2, "0"),
    ];
    //返回
    const goback = () => {
      uni.navigateBack({
        delta: 1,
      });
    };
    return {
      leaderType,
      message,
      year,
      month,
      goback,
    };
  },
  onShow() {
    store.dispatch(ActionTypes.getLeaderboardReceive);
    store.dispatch(ActionTypes.getLeaderboardResponse);
    store.dispatch(ActionTypes.getLeaderboardCancel);
  },
});
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  min-height: 100vh;
  padding: 20rpx;
  box-sizing: border-box;
  background-image: linear-gradient(
    to bottom,
    #09c46e,
    #95f0c1,
    #c9e6d9,
    #ffffff,
    #c1e1d2
  );

  .leaderBoard {
    width: 100%;

    .title {
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      padding: 10rpx 0 20rpx 20rpx;

      &-left {
        margin-top: 140rpx;
        z-index: 2;

        &-back {
          display: inline-block;
          transform: rotate(180deg);
          color: #ffffff;

          text {
            &:active {
              cursor: pointer;
            }

            position: fixed;
            top: 50rpx;
            left: -50rpx;
            font-size: 70rpx;
          }
        }

        &-time {
          margin-left: 20rpx;
          color: #ffffff;
          font-size: 60rpx;
          font-style: oblique;
        }

        &-content {
          // font-family: "alimama VF Regular";
          color: #ffffff;
          font-size: 80rpx;
        }

        &-notice {
          margin-top: 20rpx;
          margin-left: 10rpx;

          &-text {
            display: flex;
            align-items: center;
            color: #ffffff;
            font-size: $uni-font-size-sm;
            font-weight: 600;

            image {
              width: 30rpx;
              height: 30rpx;
            }

            &::before {
              content: "•";
              /* 使用Unicode符号为点 */
              margin-right: 4px;
              /* 调整点和文字之间的间距 */
              color: #e9e9e9;
              /* 设置点的颜色 */
            }
          }
        }
      }

      &-right {
        position: absolute;
        top: 0rpx;
        right: 0rpx;
        z-index: 0;
      }
    }

    .list {
    }
  }
}
</style>
