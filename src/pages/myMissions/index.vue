<template>
  <view>
    <view class="background background--green" />
    <span class="title sticky"> 维修任务 </span>
    <view class="map">
      <UMap
        map-config="mapSettings"
        :enable-traffic="false"
        :currentLocation="currentLocation"
        ref="map"
        :markers="repairOrderMarkers"
        @clickMark="handleClickMark"
      />
    </view>

    <view class="list">
      <view class="top">
        <view class="option">
          <view class="option-sort" @click="changeDisSortOption">
            距离
            <view class="arrow">
              <view
                class="arrow-up"
                :style="{
                  borderBottom: `4px solid ${
                    disSortOption === 1 ? '#09C46E' : '#666666'
                  }`,
                }"
              />
              <view
                class="arrow-down"
                :style="{
                  borderTop: `4px solid ${
                    disSortOption === 2 ? '#09C46E' : '#666666'
                  }`,
                }"
              />
            </view>
          </view>
          <view class="divider" />
          <view class="option-sort">
            <view style="width: 250rpx">
              <USelect
                :localdata="wayRange"
                @change="changeWaySortOption"
                :value="wayValue"
                :clear="false"
              />
            </view>
          </view>
          <view class="divider" />
          <view class="option-sort" @click="changeTimeSortOption">
            发布时间
            <view class="arrow">
              <view
                class="arrow-up"
                :style="{
                  borderBottom: `4px solid ${
                    timeSortOption === 1 ? '#09C46E' : '#666666'
                  }`,
                }"
              />
              <view
                class="arrow-down"
                :style="{
                  borderTop: `4px solid ${
                    timeSortOption === 2 ? '#09C46E' : '#666666'
                  }`,
                }"
              />
            </view>
          </view>
        </view>
      </view>

      <view
        v-if="!repairOrderInfo || !repairOrderInfo.length"
        class="empty"
        :style="{
          marginTop: `calc(${menuTop}px + 250rpx)`,
        }"
      >
        <empty message="暂时没有用户发布任务哦～" />
      </view>
      <view class="list-box">
        <view v-for="item in repairOrderInfo" :key="item.id" class="list-item">
          <view class="header">
            <view class="header-publisher">
              <image
                v-if="item.familyUser.avatarUrl"
                class="avatar"
                :src="item.familyUser.avatarUrl"
              />
              <image
                v-if="!item.familyUser.avatarUrl"
                class="avatar"
                src="@/static/images/icon/user.png"
              />
              <view class="publisher-info">
                <view class="name">
                  {{ item.name || "N/A" }}
                  <view class="header-more" @click="handleClickShowmore(item)">
                    查看更多
                    <text class="iconfont icon-arrow-right" />
                  </view>
                </view>
                <span class="address">
                  {{ item.city || "N/A" }} - {{ item.district || "N/A" }}
                </span>
              </view>
            </view>
          </view>
          <view class="content">
            <view class="content-info">
              <view class="content-info-item">
                <span>
                  <image
                    src="../../static/images/repairList/address.png"
                    class="item-image"
                  />
                  维修地址 :
                </span>
                <span class="content-info-item-right">
                  {{ item.address || "N/A" }}
                </span>
              </view>
              <view class="content-info-item">
                <span>
                  <image
                    src="../../static/images/repairList/number.png"
                    class="item-image"
                  />
                  设备数量 :
                </span>
                <span class="content-info-item-right">
                  {{ item.repairEquipmentNumber || "N/A" }} 个
                </span>
              </view>
              <view class="content-info-item">
                <span>
                  <image
                    src="../../static/images/repairList/time.png"
                    class="item-image"
                  />
                  预期维修时间 :
                </span>
                <span class="content-info-item-right">
                  {{ item.expectDate || "N/A" }}
                </span>
              </view>
            </view>
            <view class="content-accept">
              <view class="content-accept-action" @click="handleTake(item)"
                >接受</view
              >
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { useTop } from "@/uses/useTop";
import { repairOrder } from "@/api/types/models";
import mapSettings from "@/config/map";
import UMap from "@/components/UMap/index.vue";
// import Item from "./components/Item/index.vue";
import { useStore } from "vuex";
import Empty from "@/components/Empty/index.vue";
import { useLocation } from "@/uses/useLocation";
import { requestTakeRepairOrder } from "@/api/repairOrder";
import { requestGetAllRepairOrder } from "@/api/repairOrder";
import {
  hideLoading,
  navigateTo,
  showLoading,
  showToast,
} from "@/utils/helper";
import { USelect } from "@/components/USelect/index.vue";
import { computed, defineComponent, reactive, Ref, ref } from "vue";
import authService from "@/service/authService";
//维修订单详情
const repairOrderInfo: Ref<repairOrder[] | []> = ref([]);
//当前位置
const currentLocation = reactive({ latitude: 0, longitude: 0 });
//地图组件标记维修订单点位
const repairOrderMarkers: Ref<any[] | []> = ref([]);
//当前选择的排序配置
const disSortOption = ref(0);
const timeSortOption = ref(0);
//维修方式
const wayValue = ref(null);
//从vuex获取缓存维修订单信息
const useTaskList = () => {
  const store = useStore();
  const myRepairOrderList = computed(() => {
    return store.getters.repairOrders || [];
  });
  //获取维修任务信息
  const taskList = computed(() => {
    return [...myRepairOrderList.value];
  });
  return { myRepairOrderList, taskList };
};
//获取位置信息
const getLocation = () => {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: "gcj02",
      altitude: true,
      success: (data) => {
        console.log("location", data);
        [currentLocation.latitude, currentLocation.longitude] = [
          data.latitude,
          data.longitude,
        ];
        resolve("获取位置成功");
      },
      fail() {
        reject();
      },
    });
  });
};
//获取订单信息
const getRepairOrder = (params: any) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      showLoading("加载中...");
      const orderMarkers: Array<any> = [];
      const res = await requestGetAllRepairOrder(params);

      if (res.data?.result) {
        console.log("res", res.data?.result);
        repairOrderInfo.value = res.data?.result.records.filter(
          (item: any) => item.state === 1
        );
        res.data?.result.records
          .filter((item: any) => item.state === 1)
          .map((item: any) => {
            orderMarkers.push({
              id: item.id,
              latitude: item.latitude,
              longitude: item.longitude,
              iconPath: "/static/images/map/user_location.png",
              width: 30,
              height: 30,
              callout: {
                content: item.address,
                color: "#fff",
                fontSize: 10,
                borderRadius: 4,
                borderWidth: 1,
                bgColor: "#59A9FF",
                padding: "5",
                display: "ALWAYS",
              },
            });
          });
        console.log("orderMarkers", orderMarkers);
        repairOrderMarkers.value = orderMarkers;
        hideLoading();
      }
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};
export default defineComponent({
  components: { Empty, UMap, USelect },
  setup(props) {
    //抢单点击事件
    // const takeOrder = (event)=>{
    //   console.log("点击了抢单事件")
    //    event.stopPropagation();
    // }
    //排序配置
    const sortOptions = new Map([
      [0, null],
      [1, "asc"],
      [2, "desc"],
    ]);
    //点击地图小标事件
    const handleClickMark = (e: any) => {
      console.log("clickMarkEvent", e);
      navigateTo("/pages/missionInformation/index", { id: e });
    };
    //排序方法
    const wayRange = reactive([
      { text: "上门维修", value: 0 },
      { text: "店内维修", value: 1 },
      { text: "全部", value: null },
    ]);
    //跳转，详细页面
    const handleClickShowmore = (item: any) => {
      navigateTo("/pages/missionInformation/index", { id: item.id });
    };
    //是否接单
    const handleTake = (item: any) => {
      uni.showModal({
        title: "提示",
        content: "确定要接单吗？",
        success: (res: any) => {
          if (res.confirm) {
            console.log("用户接单");
            handleTakeOrder(item);
          } else {
            console.log("取消了接单");
          }
        },
      });
    };

    //接单
    const handleTakeOrder = async (item: any) => {
      showLoading("接单中...");
      console.log("item", item);
      const new_Data = {
        ...item,
        orderFlowDate: null,
        orderFlowDesc: null,
        orderFlowFinish: null,
        orderFlowList: null,
        orderFlowState: null,
      };
      try {
        const res = await requestTakeRepairOrder(new_Data);
        if (res.data.success) {
          hideLoading();
          getRepairOrder({});
          showToast("接单成功", "success");
        }
      } catch (error) {
        console.log("error", error);
        hideLoading();
      }
    };
    //切换排序顺序，0-不排序，1-升序，2-降序
    const changeDisSortOption = () => {
      disSortOption.value = (disSortOption.value + 1) % 3;
      const params = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        orderColumn: "distance",
        orderWay: sortOptions.get(disSortOption?.value),
      };
      getRepairOrder(params);
      console.log(disSortOption.value);
    };
    //切换排序顺序，0-不排序，1-升序，2-降序
    const changeTimeSortOption = () => {
      timeSortOption.value = (timeSortOption.value + 1) % 3;
      const params = {
        orderColumn: "created_at",
        orderWay: sortOptions.get(timeSortOption?.value),
      };
      getRepairOrder(params);
      console.log(timeSortOption.value);
    };
    //切换排序顺序，0-上门维修，1-店内维修
    const changeWaySortOption = (e) => {
      console.log("e", e);
      wayValue.value = e;
      const params = {
        way: wayValue.value,
      };
      getRepairOrder(params);
      console.log(timeSortOption.value);
    };
    return {
      wayValue,
      handleTake,
      handleTakeOrder,
      handleClickMark,
      changeDisSortOption,
      changeTimeSortOption,
      changeWaySortOption,
      handleClickShowmore,
      wayRange,
      disSortOption,
      timeSortOption,
      ...useTop(),
      ...useTaskList(),
      repairOrderInfo,
      ...useLocation(),
      sortOptions,
      currentLocation,
      repairOrderMarkers,
    };
  },
  // onReachBottom() {
  //   console.log("到达底部");
  //   current.value++;
  //   const params = {
  //     current: current.value,
  //     size: 10,
  //   };
  //   getRepairOrder(params);
  // },
  onShow() {
    const store = useStore();
    const logged = store.getters.logged;
    if (logged) {
      const params = {
        way: wayValue.value,
      };
      console.log("params", params);

      getRepairOrder(params);
      getLocation();
    } else {
      showToast("您还未登录，请先登录");
      authService.login();
    }
    // store.dispatch(ActionTypes.getMyUncheckedMissions);
    // store.dispatch(ActionTypes.getMyMissions);
    //获取维修订单

    //每次页面出现重新获取位置

    // store.dispatch(ActionTypes.getRepairOrders);
  },
});
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 750rpx;
  height: 150rpx;
  z-index: 2;
  &--green {
    background: linear-gradient(
      to bottom,
      rgba(9, 196, 110, 1),
      rgba(9, 196, 110, 1),
      rgba(9, 196, 110, 1),
      rgba(9, 196, 110, 0.4),
      rgba(9, 196, 110, 0.2),
      rgba(9, 196, 110, 0)
    );
  }
}

.map {
  width: 100%;
  height: 40vh;
  margin-top: 40rpx;
}
.sticky {
  position: fixed;
  top: 80rpx;
}
.title {
  font-weight: 700;
  border-bottom: 10rpx solid $uni-color-primary;
  font-size: $uni-font-size-xxl;
  margin-left: 39rpx;
  z-index: 2;
}

.list {
  border-radius: 20rpx;
  z-index: 1;
  .top {
    width: 100%;
    height: 70rpx;
    box-sizing: border-box;
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
    border-top: 3rpx solid#E2E2E3;
    border-bottom: 1rpx solid#E2E2E3;
    .option {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .divider {
        height: 40rpx;
        border-left: 0.5rpx solid#E2E2E3;
      }
      &-sort {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        transition: 0.3s all;
        font-size: $uni-font-size-base;
        &:active {
          background-color: rgba(85, 85, 85, 0.1);
        }
      }
    }
    .arrow {
      margin-left: 10rpx;
      height: 30rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .arrow-up {
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        // border-bottom: 4px solid #666666;
        cursor: pointer;
      }
      .arrow-down {
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        // border-top: 4px solid #666666;
        cursor: pointer;
      }
    }
  }
  &-box {
    width: 100%;
    padding: 10rpx 0 30rpx 0;
  }
  &-item {
    margin: 20rpx auto 0 auto;
    box-sizing: border-box;
    width: 700rpx;
    background-color: #ffffff;
    border: 1rpx solid#D8D8D8;
    border-radius: 10rpx;
    transition: 0.3s all;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
    &:active {
      background-color: rgba(85, 85, 85, 0.1);
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      align-items: center;
      padding: 10rpx 20rpx 0rpx 20rpx;
      &-title {
        // line-height: 60rpx;
        font-size: $uni-font-size-xl;
        font-weight: 600;
      }
      &-dis {
        //line-height: 60rpx;
        font-size: $uni-font-size-sm;
      }
      &-publisher {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10rpx;
        .avatar {
          width: 90rpx;
          height: 90rpx;
          border-radius: 50%;
        }
        .publisher-info {
          display: flex;
          flex: 1;
          width: 100%;
          flex-direction: column;
          justify-content: space-around;
          margin-left: 20rpx;
          .name {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            font-size: $uni-font-size-lg;
          }
          .address {
            width: fit-content;
            color: #ffffff;
            padding: 5rpx;
            font-size: $uni-font-size-xs;
            padding-left: 15rpx;
            padding-right: 15rpx;
            border-radius: 20rpx;
            background-color: $u-type-func;
          }
        }
      }
      &-more {
        line-height: 60rpx;
        font-size: $uni-font-size-sm;
        color: #666666;
      }
    }
    .content {
      width: 100%;
      flex: 1;
      position: relative;
      padding: 10rpx 20rpx 0rpx 20rpx;
      box-sizing: border-box;
      font-size: $uni-font-size-sm;
      &-info {
        width: 100%;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        border-top: 1rpx solid#E2E2E3;
        border-bottom: 1rpx solid#E2E2E3;
        color: #666666;
        &-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 4rpx;
          .item-image {
            margin-right: 5rpx;
            width: 20rpx;
            height: 20rpx;
          }
          &-right {
            white-space: nowrap; /* 禁止文本换行 */
            overflow: hidden; /* 隐藏溢出内容 */
            text-overflow: ellipsis; /* 使用省略号表示溢出内容 */
            flex: 1;
            padding-left: 10rpx;
            color: #000000;
          }
        }
      }
      &-accept {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        &-action {
          margin: 10rpx;
          line-height: 45rpx;
          font-size: $uni-font-size-base;
          color: #ffffff;
          text-align: center;
          width: 15%;
          height: 45rpx;
          background-color: #000000;
          border-radius: 20rpx;
          background-color: $uni-color-primary;
        }
      }
    }
  }
}
</style>
