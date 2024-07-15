<template>
  <view class="information">
    <view class="userBox" @click="handleJump">
      <view
        class="avatar"
        :class="{ 'avatar--nologin': status === 'unlogin' || !avatarUrl }"
        :style="{
          backgroundImage:
            status !== 'unlogin' && avatarUrl ? `url(${avatarUrl})` : null,
        }"
      >
      </view>
      <view class="name">
        <span class="name-lg">
          {{ status !== "unlogin" && name ? name : "登录/注册" }}</span
        >
        <span class="name-ws">{{
          status !== "unlogin" && phone ? phone : "支持微信快速登录"
        }}</span>
      </view>
      <view class="more">
        <text class="iconfont icon-arrow-right" />
      </view>
    </view>
    <view class="box">
      <view class="title">
        <span class="title-name">我的维修订单</span>
        <view class="title-more" @click="handleMoreRepairOrder">
          查看更多订单
          <text class="iconfont icon-arrow-right" />
        </view>
      </view>
      <view class="list">
        <view
          class="list-box"
          v-for="item in orderList"
          :key="item.id"
          @click="handleNavigateToRepairList(item.id)"
        >
          <image :src="item.icon" class="list-box-image" />
          <!-- <UBadge
            class="uni-badge-left-margin"
            :text="item.value"
            absolute="rightTop"
            size="small"
            v-if="status !== 'unlogin'"
          >
            <image :src="item.icon" class="list-box-image" />
          </UBadge> -->
          <image
            :src="item.icon"
            class="list-box-image"
            v-if="status === 'unlogin'"
          />
          <view class="list-box-title">{{ item.title }}</view>
        </view>
      </view>
      <!-- <view class="left">
        <view
          class="avatar"
          :class="{'avatar--nologin': status === 'unlogin' || !avatarUrl}"
          :style="{backgroundImage: status !== 'unlogin' && avatarUrl ? `url(${avatarUrl})` : null}"
        />
        <view
          v-if="status === 'unlogin'"
          class="tag tag--nologin"
        >
          未登录
        </view>
        <view
          v-if="status !== 'unlogin' && registerTimeFromNow"
          class="tag tag--time"
        >
          {{ `加入 ${registerTimeFromNow}` }}
        </view>
      </view>
      <view class="right">
        <view class="name">
          {{ status !== 'unlogin' && name ? name : "志愿者" }}
          <view
            v-if="status !== 'unlogin'"
            class="sex-icon"
            :class="[sex === 1 ? 'sex-icon-man' : sex === 2 ? 'sex-icon-woman' : '']"
          />
        </view>
        
        <button
          v-if="status === 'unlogin'"
          class="action-btn"
          hover-class="none"
          @click="handleLogin"
        >
          <view class="action-btn-text">
            去登录
            <text
              class="iconfont icon-arrow-right"
            />
          </view>
        </button>
        <button
          v-if="status === 'user'"
          class="action-btn"
          @click="handleClickPhone"
        >
          <view class="action-btn-text">
            TEL: {{ phone }}
            <text
              class="iconfont icon-arrow-right"
            />
          </view>
        </button>
        <button
          v-if="status === 'me'"
          class="action-btn"
          @click="handleEditProfile"
        >
          <view class="action-btn-text">
            修改个人信息
            <text
              class="iconfont icon-arrow-right"
            />
          </view>
        </button>

        <view class="divider" />
        <view class="tasks">
          <view
            class="task"
          >
            <u-count-to
              :end-val="doingMissionsNumber"
              font-size="44"
              line-height="60"
              color="#000000"
            />
            <view class="task-description">
              正在进行
            </view>
          </view>
          <view class="task">
            <u-count-to
              :end-val="endedMissionsNumber"
              font-size="44"
              line-height="60"
              color="#000000"
            />
            <view class="task-description">
              历史任务
            </view>
          </view>
          <view
            v-if="status === 'me'"
            class="task"
          >
            <u-count-to
              :end-val="allMissionsNumber"
              font-size="44"
              line-height="60"
              color="#000000"
            />
            <view class="task-description">
              共计参与
            </view>
          </view>
        </view>
      </view> -->
    </view>
    <view class="service">
      <view class="title">
        <span class="title-name">功能服务</span>
        <view class="title-more">
          查看功能服务
          <text class="iconfont icon-arrow-right" />
        </view>
      </view>
    </view>
    <!--   <view
      v-if="historyMissions"
      class="list"
    >
      <view
        v-for="item in historyMissions"
        :key="item.id"
        class="list-item"
      >
        <view
          v-if="item.state === 1"
          class="list-item-badge badge-running"
        >
          进行中
        </view>
        <view
          v-if="item.state === 2"
          class="list-item-badge badge-complete"
        >
          已完成
        </view>
        <view
          v-if="item.state === 3"
          class="list-item-badge badge-timeout"
        >
          已归档
        </view>
        <view
          v-if="item.state === 4"
          class="list-item-badge badge-canceled"
        >
          已归档
        </view>
        <view class="list-item-content">
          <image
            v-if="item.oldMan"
            class="list-item-content-photo"
            :src="item.oldMan.identificationPhoto"
            mode="aspectFill"
          />
          <view class="list-item-content-info">
            <view class="list-item-content-info-title">
              {{ item.district }}走失老人
            </view>
            <view
              v-if="item.lostTime"
              class="list-item-content-info-desc"
            >
              于 {{ item.lostTime }}
            </view>
            <view class="list-item-content-info-desc">
              走失于{{ item.place }}附近
            </view>
          </view>
        </view>
        <view
          v-if="item.state === 1"
          class="list-item-icon icon-running"
        />
        <view
          v-if="item.state === 2"
          class="list-item-icon icon-complete"
        />
        <view
          v-if="item.state === 3"
          class="list-item-icon icon-timeout"
        />
        <view
          v-if="item.state === 4"
          class="list-item-icon icon-canceled"
        />
      </view> -->
    <!--    </view> -->
  </view>
</template>

<script lang="ts">
import {
  computed,
  Ref,
  defineComponent,
  PropType,
  ref,
  ComputedRef,
} from "vue";
import authService from "@/service/authService";
import dayjs from "@/utils/dayjs";
import { navigateTo } from "@/utils/helper";
import UCountTo from "../UCountTo/index.vue";
import { Case } from "@/api/types/models";
import { requestGetVolunteerCases } from "@/api/mission";
import { useStore } from "vuex";
import UBadge from "@/components/UBadge/index.vue";

const useLogin = () => {
  const handleLogin = () => {
    authService.login(true);
  };

  return { handleLogin };
};

// const useHistory = (status: "unlogin" | "me" | "user", info: any) => {
//   const store = useStore();
//   let userHistoryMissions: Ref<Array<Case>> = ref([]);

//   const getHistoryMissions = async () => {
//     if (status === "user" && (!info.volunteer || !info.volunteer.id)) return;

//     try {
//       const res = await requestGetVolunteerCases({
//         volunteerId: info.volunteer.id,
//       });
//       if (res.data.data) {
//         userHistoryMissions.value = res.data.data;
//       }
//       console.debug(res);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   if (status === "user") {
//     getHistoryMissions();
//   }

//   const historyMissions: ComputedRef<Array<Case>> = computed(() => {
//     return status === "me"
//       ? store.getters.myAllMissions.reverse()
//       : userHistoryMissions.value.reverse();
//   });

//   const doingMissionsNumber = computed(() => {
//     return historyMissions.value.filter((item) => item.state === 1).length;
//   });

//   const endedMissionsNumber = computed(() => {
//     return historyMissions.value.filter(
//       (item) => item.state === 2 || item.state === 3
//     ).length;
//   });

//   const allMissionsNumber = computed(() => {
//     return historyMissions.value.length;
//   });

//   return {
//     historyMissions,
//     doingMissionsNumber,
//     endedMissionsNumber,
//     allMissionsNumber,
//   };
// };

const useWorkerRepairInfo = () => {
  //注册store实例
  const store = useStore();
  //维修师傅所有订单
  let totalRepairOrders: Ref<Array<Case>> = ref([]);
  //维系师傅正在进行中订单
  let workingRepairOrders: Ref<Array<Case>> = ref([]);
  //维修师傅待确认订单
  let unconfirmedRepairOrders: Ref<Array<Case>> = ref([]);
  //维修师傅已完成订单
  let finishedRepairOrders: Ref<Array<Case>> = ref([]);
  //维修师傅已退单订单
  let backRepairOrders: Ref<Array<Case>> = ref([]);
  return {
    totalRepairOrders,
    workingRepairOrders,
    unconfirmedRepairOrders,
    finishedRepairOrders,
    backRepairOrders,
  };
};
export default defineComponent({
  components: { UBadge },
  props: {
    status: {
      type: String as PropType<"unlogin" | "me" | "user">,
      default: "unlogin",
    },
    userInfo: {
      type: Object,
      default: undefined,
    },
  },
  setup(props) {
    const name = computed(() => {
      return props.status === "me"
        ? props?.userInfo?.volunteerInformation?.name
        : props?.userInfo?.name;
    });

    const sex = computed(() => {
      return props.status === "me"
        ? props?.userInfo?.volunteerInformation?.sex
        : props?.userInfo?.sex;
    });

    const registerTimeFromNow = computed(() => {
      const time =
        props.status === "me"
          ? props?.userInfo?.volunteerInformation?.registerTime
          : props?.userInfo?.registerTime;

      return dayjs(time).fromNow(true);
    });

    const avatarUrl = computed(() => {
      return props.status === "me"
        ? props?.userInfo?.avatarUrl
        : props?.userInfo?.volunteer?.avatarUrl;
    });

    const phone = computed(() => {
      return props.status === "me"
        ? props?.userInfo?.phone
        : props?.userInfo?.volunteer?.phone;
    });

    const handleEditProfile = () => {
      navigateTo("/pages/editProfile/index");
    };

    const handleJump = () => {
      console.log("正在登录");
      if (props.status === "unlogin") {
        authService.login(true);
      } else {
        navigateTo("/pages/editProfile/index");
      }
    };
    const handleClickPhone = () => {
      uni.makePhoneCall({
        phoneNumber: phone.value,
      });
    };
    //跳转至订单详情页面
    const handleNavigateToRepairList = (index: number) => {
      console.log("pageId", index);
      //如果未登录，则跳转登录
      if (props.status === "unlogin") {
        authService.login(true);
      } else {
        uni.navigateTo({
          url: `/pages/repairList/index?pageIndex=${index}`,
        });
      }
    };
    //查看更多订单
    const handleMoreRepairOrder = () => {
      //如果未登录，则跳转登录
      if (props.status === "unlogin") {
        authService.login(true);
      } else {
        uni.navigateTo({
          url: `/pages/repairList/index?pageIndex=0`,
        });
      }
    };

    const orderList = [
      {
        id: 1,
        icon: "../../static/images/user/repairring.png",
        title: "进行中",
        value: 5,
      },
      {
        id: 2,
        icon: "../../static/images/user/unconfirmed.png",
        title: "待确认",
        value: 2,
      },
      {
        id: 3,
        icon: "../../static/images/user/done.png",
        title: "已完成",
        value: 3,
      },
      {
        id: 4,
        icon: "../../static/images/user/cancel.png",
        title: "已售后",
        value: 1,
      },
    ];
    console.log("isLogin?", props.status);
    return {
      ...useLogin(),
      name,
      sex,
      registerTimeFromNow,
      avatarUrl,
      phone,
      handleEditProfile,
      handleJump,
      handleClickPhone,
      orderList,
      handleNavigateToRepairList,
      // ...useHistory(props.status, props.userInfo),
      handleMoreRepairOrder,
      ...useWorkerRepairInfo(),
    };
  },
});
</script>

<style lang="scss" scoped>
.tag {
  border-radius: 16rpx;
  font-size: 16rpx;
  font-weight: $uni-font-weight-base;
  line-height: 32rpx;
  padding: 0 16rpx;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;

  &--nologin {
    background: #d0d0d0;
  }

  &--time {
    background: #f6eec9;
  }
}

.userBox {
  display: flex;
  height: 100rpx;
  box-sizing: border-box;
  margin: 0 auto 40rpx auto;
  width: 672rpx;
  align-items: center;
  position: relative;
  .avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 100%;
    background-size: cover;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
  .avatar--nologin {
    background-color: #dadada;
    background-image: url("../../static/images/icon/user.png");
  }
  .name {
    display: flex;
    flex-direction: column;
    margin-left: 20rpx;
    font-weight: $uni-font-weight-bold;
    line-height: 44rpx;
    transition: 1s all;
    &-lg {
      color: #ffffff;
      font-size: $uni-font-size-lg;
      letter-spacing: 1rpx;
    }
    &-ws {
      color: #ebebeb;
      font-size: $uni-font-size-xs;
      letter-spacing: 0.5rpx;
    }
  }
  .more {
    color: #ebebeb;
    position: absolute;
    right: 0rpx;
  }
  &:active {
    border-radius: 10rpx;
    background-color: rgba(85, 85, 85, 0.3); /* 半透明蓝色 */
  }
}
.box {
  margin: 0 auto 20rpx auto;
  width: 700rpx;
  height: 250rpx;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    height: 50rpx;
    display: flex;
    box-sizing: border-box;
    padding: 20rpx;
    margin-top: 10rpx;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 0.5rpx;
    &-name {
      font-size: $uni-font-size-base;
    }
    &-more {
      display: flex;
      align-items: center;
      font-size: $uni-font-size-xs;
      color: #979797;
    }
  }
  .list {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding: 20rpx;
    width: 100%;
    flex: 1;
    justify-content: center;
    .list-box {
      width: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &-image {
        width: 70rpx;
        height: 70rpx;
      }
      &-title {
        margin-top: 20rpx;
        font-size: $uni-font-size-sm;
        color: #979797;
      }
    }
  }
  // .left {
  //   box-sizing: border-box;
  //   width: 202rpx;
  //   padding: 32rpx 32rpx 0 42rpx;
  //   text-align: center;

  //   .avatar {
  //     width: 128rpx;
  //     height: 128rpx;
  //     border-radius: 100%;
  //     background-size: cover;

  //     // &--nologin {
  //     //   background: #666666;
  //     // }
  //   }

  //   .tag {
  //     margin-top: 16rpx;
  //   }
  // }

  // .right {
  //   padding: 52rpx 0 18rpx 0;

  //   .name {
  //     font-size: $uni-font-size-lg;
  //     font-weight: $uni-font-weight-bold;
  //     color: #000000;
  //     line-height: 44rpx;

  //     .sex-icon {
  //       display: inline-block;
  //       margin-left: 10rpx;
  //       width: 24rpx;
  //       height: 24rpx;
  //       background-image: url("@/static/images/profile/man.png");
  //       background-size: cover;

  //       &-man {
  //         background-image: url("@/static/images/profile/man.png");
  //       }
  //       &-woman {
  //         background-image: url("@/static/images/profile/woman.png");
  //       }
  //     }
  //   }

  //   .action-btn {
  //     margin-top: 16rpx;
  //     padding: 0;
  //     border-radius: 10rpx;
  //     border: 2rpx solid #979797;
  //     color: #000000;
  //     position: relative;
  //     display: inline-block;
  //     background-color: #ffffff;

  //     &-text {
  //       font-size: 18rpx;
  //       font-weight: $uni-font-weight-base;
  //       line-height: 40rpx;
  //       margin: 0 5rpx 0 15rpx;

  //       .icon-arrow-right {
  //         vertical-align: middle;
  //         font-size: 26rpx;
  //         line-height: 40rpx;
  //         color: #979797;
  //       }
  //     }

  //     &::after {
  //       border: none;
  //     }
  //   }
  // }

  .divider {
    width: 416rpx;
    height: 2rpx;
    background-color: #979797;
    margin: 20rpx 0;
  }

  // .tasks {
  //   width: 416rpx;
  //   display: flex;

  //   .task {
  //     flex-shrink: 1;
  //     width: 100%;

  //     // &-number {
  //     //   font-size: 44rpx;
  //     //   color: #000000;
  //     //   line-height: 60rpx;
  //     // }
  //     &-description {
  //       font-size: 24rpx;
  //       color: #000000;
  //       line-height: 34rpx;
  //     }
  //   }
  // }
}
.service {
  margin: 0 auto 20rpx auto;
  width: 700rpx;
  height: 400rpx;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    height: 50rpx;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 20rpx;
    margin-top: 10rpx;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 0.5rpx;
    &-name {
      font-size: $uni-font-size-base;
    }
    &-more {
      display: flex;
      align-items: center;
      font-size: $uni-font-size-xs;
      color: #979797;
    }
  }
}

// .list {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 80rpx;

//   &-item {
//     width: 672rpx;
//     height: 176rpx;
//     background: #ffffff;
//     box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
//     border-radius: 10rpx;
//     margin-bottom: 48rpx;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 24rpx 32rpx 24rpx 42rpx;
//     box-sizing: border-box;
//     position: relative;

//     &-content {
//       display: flex;

//       &-photo {
//         width: 128rpx;
//         height: 128rpx;
//         border-radius: 100%;
//       }

//       &-info {
//         display: flex;
//         flex-direction: column;
//         justify-content: flex-start;
//         margin-left: 40rpx;

//         &-title {
//           font-size: 36rpx;
//           font-weight: 400;
//           color: #000000;
//           line-height: 50rpx;
//           margin-bottom: 14rpx;
//         }

//         &-desc {
//           font-size: 20rpx;
//           font-weight: 400;
//           color: #303133;
//           line-height: 28rpx;
//         }
//       }
//     }

//     &-badge {
//       width: 96rpx;
//       height: 32rpx;
//       border-radius: 10rpx 10rpx 10rpx 0rpx;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       font-size: 20rpx;
//       font-weight: 400;
//       line-height: 28rpx;
//       position: absolute;
//       top: 0;
//       right: 0;

//       &.badge-running {
//         color: #303133;
//         background: #ffa36c;
//       }

//       &.badge-complete {
//         color: #303133;
//         background: #799351;
//       }

//       &.badge-timeout,
//       &.badge-canceled {
//         color: #303133;
//         background: #b0b2b2;
//       }
//     }

//     &-icon {
//       width: 60rpx;
//       height: 60rpx;
//       background-size: contain;
//       background-position: 50% 50%;
//       background-repeat: no-repeat;

//       &.icon-running {
//         background-image: url("@/static/images/icon/clock.png");
//       }
//       &.icon-complete {
//         background-image: url("@/static/images/icon/done.png");
//       }
//     }
//   }
// }
</style>
