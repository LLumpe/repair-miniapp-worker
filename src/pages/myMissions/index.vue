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
        <empty message="暂时还没有你的任务哦，去任务大厅看看吧～" />
      </view>
      <view class="list-box">
        <view
          v-for="item in repairOrderInfo"
          :key="item.id"
          class="list-item"
          @click="handleClickShowmore(item)"
        >
          <view class="header">
            <view class="header-publisher">
              <image class="avatar" :src="item.familyUser.avatarUrl" />
              <view class="publisher-info">
                <view class="name">
                  {{ item.name }}
                  <view class="header-more">
                    查看更多
                    <text class="iconfont icon-arrow-right" />
                  </view>
                </view>
                <span class="address">
                  {{ item.city }} - {{ item.district }}
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
                  {{ item.address }}
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
                  {{ item.repairEquipmentNumber }} 个
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
                  {{ item.expectDate }}
                </span>
              </view>
            </view>
            <view class="content-accept">
              <view class="content-accept-action">接受</view>
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
import store from "@/store";
import DropDown from "@/components/DropDown/index.vue";
import { ActionTypes } from "@/enums/actionTypes";
import { useStore } from "vuex";
import Empty from "@/components/Empty/index.vue";
import { useLocation } from "@/uses/useLocation";
import { requestGetAllRepairOrder } from "@/api/repairOrder";
import { navigateTo, showToast } from "@/utils/helper";
import {
  computed,
  ComputedRef,
  defineComponent,
  reactive,
  onMounted,
  onActivated,
  Ref,
  ref,
} from "vue";
//维修订单详情
const repairOrderInfo: Ref<repairOrder[] | []> = ref([]);
//当前位置
const currentLocation = reactive({ latitude: 0, longitude: 0 });
//地图组件标记维修订单点位
const repairOrderMarkers: Ref<any[] | []> = ref([
  {
    id: 1,
    latitude: 30.916772,
    longitude: 121.47439,
    iconPath: "/static/images/map/user_location.png", // 需要自定义图标
    width: 30,
    height: 30,
    callout: {
      content: "奉贤信息大厦",
      color: "#fff",
      fontSize: 10,
      borderRadius: 4,
      borderWidth: 1,
      bgColor: "#59A9FF",
      padding: "5",
      display: "ALWAYS",
    },
  },
  {
    id: 2,
    latitude: 30.918985,
    longitude: 121.476623,
    iconPath: "/static/images/map/user_location.png", // 需要自定义图标
    width: 30,
    height: 30,
    callout: {
      content: "广播电视台",
      color: "#fff",
      fontSize: 10,
      borderRadius: 4,
      borderWidth: 1,
      bgColor: "#59A9FF",
      padding: "5",
      display: "ALWAYS",
    },
  },
  {
    id: 3,
    latitude: 30.915568,
    longitude: 121.475424,
    iconPath: "/static/images/map/user_location.png", // 需要自定义图标
    width: 30,
    height: 30,
    callout: {
      content: "曙光新苑",
      color: "#fff",
      fontSize: 10,
      borderRadius: 4,
      borderWidth: 1,
      bgColor: "#59A9FF",
      padding: "5",
      display: "ALWAYS",
    },
  },
  {
    id: 4,
    latitude: 30.91783,
    longitude: 121.472629,
    iconPath: "/static/images/map/user_location.png", // 需要自定义图标
    width: 30,
    height: 30,
    callout: {
      content: "绿的翡翠国际广场",
      color: "#fff",
      fontSize: 10,
      borderRadius: 4,
      borderWidth: 1,
      bgColor: "#59A9FF",
      padding: "5",
      display: "ALWAYS",
    },
  },
]);
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
      const res = await requestGetAllRepairOrder(params);
      if (res.data?.result) {
        console.log("res", res.data?.result);
        repairOrderInfo.value = res.data?.result;
      }
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};

export default defineComponent({
  components: { Empty, UMap },
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
    //当前选择的排序配置
    const disSortOption = ref(0);
    const timeSortOption = ref(0);
    //跳转，详细页面
    const handleClickShowmore = (item: any) => {
      navigateTo("/pages/missionInformation/index", { id: item.id });
    };
    //切换排序顺序，0-不排序，1-升序，2-降序
    const changeDisSortOption = () => {
      disSortOption.value = (disSortOption.value + 1) % 3;
      const params = {
        distance: sortOptions.get(disSortOption?.value),
      };
      getRepairOrder(params);
      console.log(disSortOption.value);
    };
    //切换排序顺序，0-不排序，1-升序，2-降序
    const changeTimeSortOption = () => {
      timeSortOption.value = (timeSortOption.value + 1) % 3;
      const params = {
        distance: sortOptions.get(timeSortOption?.value),
      };
      getRepairOrder(params);
      console.log(timeSortOption.value);
    };
    return {
      changeDisSortOption,
      changeTimeSortOption,
      handleClickShowmore,
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
  onShow() {
    // store.dispatch(ActionTypes.getMyUncheckedMissions);
    // store.dispatch(ActionTypes.getMyMissions);
    //获取维修订单
    getRepairOrder({});
    //每次页面出现重新获取位置
    getLocation();
    store.dispatch(ActionTypes.getRepairOrders);
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
  height: 1200rpx;
  z-index: 1;
  .top {
    width: 100%;
    height: 70rpx;
    box-sizing: border-box;
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
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
    height: 1200rpx;
    padding-top: 20rpx;
    overflow: auto;
  }
  &-item {
    margin: 0 auto 30rpx auto;
    box-sizing: border-box;
    width: 700rpx;
    // height: 300rpx;
    background-color: #ffffff;
    border: 1rpx solid#D8D8D8;
    border-radius: 10rpx;
    transition: 0.3s all;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
        }
        .publisher-info {
          display: flex;
          flex: 1;
          height: 100rpx;
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
            width: 150rpx;
            color: #ffffff;
            padding: 5rpx;
            font-size: $uni-font-size-xs;
            padding-left: 10rpx;
            padding-right: 10rpx;
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
