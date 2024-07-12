<template>
  <view class="repairListItem">
    <view class="box">
      <view class="box-list" v-for="item in repairOrderList" :key="item.id">
        <view class="box-list-item" @click="handleShowMoreRepairOrder(item)">
          <view class="box-list-item-label">
            <span class="box-list-item-label-text">
              {{ repairLabel[String(item.state)] }}
            </span>
            <text class="iconfont icon-arrow-right box-list-item-label-arrow" />
          </view>
          <view class="box-list-item-top">
            <span class="box-list-item-top-time">
              {{ item.receiveAt }}
            </span>
            <view class="box-list-item-top-user">
              <image :src="item.familyUser.avatarUrl" />
              <span style="color: #999">{{ item.familyUser.name }}</span>
            </view>
          </view>
          <view class="box-list-item-divide" />
          <view class="box-list-item-content">
            <view class="box-list-item-content-address">
              <span style="color: #999"> 维修地址： </span>
              <span>
                {{ item.province }} - {{ item.district }} -
                {{ item.address }}
              </span>
            </view>
            <view class="box-list-item-content-number">
              <span style="color: #999">维修数量：</span>
              {{ item.repairEquipmentNumber }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Case, repairOrder } from "@/api/types/models";
import { RepairOrder } from "@/store/types";
import { reactive, defineComponent, ref, Ref, watch } from "vue";
import { useStore } from "vuex";

//维修标签状态
const repairLabel = {
  "1": "进行中",
  "2": "待确认",
  "3": "已完成",
  "-10": "已退单",
};
const repairOrderList: Ref<Array<repairOrder>> = ref([]);
const text_data: Array<repairOrder> = [
  {
    id: 1,
    createTime: "2024-07-02 16:40:02",
    address: "软件园3号楼405",
    name: "赵师傅",
    phone: "14192043237",
    district: "西青区",
    createdAt: "2024-06-29 21:59:46",
    familyUser: {
      avatarUrl:
        "https://home-action.oss-cn-shanghai.aliyuncs.com/admin/33/4c2cbed4-d8d1-41bc-b5af-455b12a935c6.png",
      city: "天津市",
      country: null,
      district: "西青区",
      id: 15,
      name: "赵肖云",
      nickName: "zxy",
      phone: "15192043237",
      province: "天津市",
      registerTime: "2021-03-18 14:49:12",
      sex: 1,
      state: 1,
    },
    finishAt: null,
    latitude: 0,
    longitude: 0,
    orderColumn: null,
    orderType: 1,
    expectDate: "2024-06-26",
    orderWay: null,
    province: "天津市",
    receiveAt: "2024-06-29 21:59:46",
    repairEquipmentContent: [
      {
        equipmentName: "冰箱",
        repairDesc:
          "这个冰箱的门坏了，他打不开了，我自己修了半天都没修好，能帮我看看怎么办吗能帮我看看怎么办吗？",
        equipmentImg: [
          "data:image/jpeg;base64,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",
          "https://luxushopping.oss-us-west-1.aliyuncs.com/69b78b545920754ec46e9f14363536fb/c0aaf648-025a-49d5-a739-e9ec4bec54f3.jpg",
        ],
      },
      {
        equipmentName: "冰箱",
        repairDesc: "打不开门了",
        equipmentImg: [
          "https://luxushopping.oss-us-west-1.aliyuncs.com/69b78b545920754ec46e9f14363536fb/c0aaf648-025a-49d5-a739-e9ec4bec54f3.jpg",
        ],
      },
    ],
    repairEquipmentNumber: 1,
    startAt: null,
    state: 1, //进行中
    updatedAt: "2024-06-29 21:59:46",
    userId: 15,
    volunteerId: null,
  },
  {
    id: 2,
    createTime: "2024-07-02 16:40:02",
    address: "软件园3号楼405",
    name: "赵师傅",
    phone: "14192043237",
    district: "西青区",
    createdAt: "2024-06-29 21:59:46",
    familyUser: {
      avatarUrl:
        "https://home-action.oss-cn-shanghai.aliyuncs.com/admin/33/4c2cbed4-d8d1-41bc-b5af-455b12a935c6.png",
      city: "天津市",
      country: null,
      district: "西青区",
      id: 15,
      name: "赵肖云",
      nickName: "zxy",
      phone: "15192043237",
      province: "天津市",
      registerTime: "2021-03-18 14:49:12",
      sex: 1,
      state: 1,
    },
    finishAt: null,
    latitude: 0,
    longitude: 0,
    orderColumn: null,
    orderType: 1,
    expectDate: "2024-06-26",
    orderWay: null,
    province: "天津市",
    receiveAt: "2024-06-29 21:59:46",
    repairEquipmentNumber: 1,
    startAt: null,
    state: 2, //待确认
    updatedAt: "2024-06-29 21:59:46",
    userId: 15,
    volunteerId: null,
  },
  {
    id: 3,
    createTime: "2024-07-02 16:40:02",
    address: "软件园3号楼405",
    name: "赵师傅",
    phone: "14192043237",
    district: "西青区",
    createdAt: "2024-06-29 21:59:46",
    familyUser: {
      avatarUrl:
        "https://home-action.oss-cn-shanghai.aliyuncs.com/admin/33/4c2cbed4-d8d1-41bc-b5af-455b12a935c6.png",
      city: "天津市",
      country: null,
      district: "西青区",
      id: 15,
      name: "赵肖云",
      nickName: "zxy",
      phone: "15192043237",
      province: "天津市",
      registerTime: "2021-03-18 14:49:12",
      sex: 1,
      state: 1,
    },
    finishAt: null,
    latitude: 0,
    longitude: 0,
    orderColumn: null,
    orderType: 1,
    orderWay: null,
    province: "天津市",
    receiveAt: "2024-06-29 21:59:46",
    repairEquipmentNumber: 1,
    expectDate: "2024-06-26",
    startAt: null,
    state: 3, //已完成
    updatedAt: "2024-06-29 21:59:46",
    userId: 15,
    volunteerId: null,
  },
  {
    id: 4,
    createTime: "2024-07-02 16:40:02",
    address: "软件园3号楼405",
    name: "赵师傅",
    phone: "14192043237",
    district: "西青区",
    createdAt: "2024-06-29 21:59:46",
    familyUser: {
      avatarUrl:
        "https://home-action.oss-cn-shanghai.aliyuncs.com/admin/33/4c2cbed4-d8d1-41bc-b5af-455b12a935c6.png",
      city: "天津市",
      country: null,
      district: "西青区",
      id: 15,
      name: "赵肖云",
      nickName: "zxy",
      phone: "15192043237",
      province: "天津市",
      registerTime: "2021-03-18 14:49:12",
      sex: 1,
      state: 1,
    },
    finishAt: null,
    latitude: 0,
    longitude: 0,
    orderColumn: null,
    orderType: 1,
    orderWay: null,
    province: "天津市",
    receiveAt: "2024-06-29 21:59:46",
    expectDate: "2024-06-26",
    repairEquipmentNumber: 1,
    startAt: null,
    state: -10, //已退单
    updatedAt: "2024-06-29 21:59:46",
    userId: 15,
    volunteerId: null,
  },
  {
    id: 4,
    createTime: "2024-07-02 16:40:02",
    address: "软件园3号楼405",
    name: "赵师傅",
    phone: "14192043237",
    district: "西青区",
    createdAt: "2024-06-29 21:59:46",
    familyUser: {
      avatarUrl:
        "https://home-action.oss-cn-shanghai.aliyuncs.com/admin/33/4c2cbed4-d8d1-41bc-b5af-455b12a935c6.png",
      city: "天津市",
      country: null,
      district: "西青区",
      id: 15,
      name: "赵肖云",
      nickName: "zxy",
      phone: "15192043237",
      province: "天津市",
      registerTime: "2021-03-18 14:49:12",
      sex: 1,
      state: 1,
    },
    finishAt: null,
    latitude: 0,
    longitude: 0,
    expectDate: "2024-06-26",
    orderColumn: null,
    orderType: 1,
    orderWay: null,
    province: "天津市",
    receiveAt: "2024-06-29 21:59:46",
    repairEquipmentNumber: 1,
    startAt: null,
    state: 2,
    updatedAt: "2024-06-29 21:59:46",
    userId: 15,
    volunteerId: null,
  },
  {
    id: 4,
    createTime: "2024-07-02 16:40:02",
    address: "软件园3号楼405",
    name: "赵师傅",
    phone: "14192043237",
    district: "西青区",
    createdAt: "2024-06-29 21:59:46",
    familyUser: {
      avatarUrl:
        "https://home-action.oss-cn-shanghai.aliyuncs.com/admin/33/4c2cbed4-d8d1-41bc-b5af-455b12a935c6.png",
      city: "天津市",
      country: null,
      district: "西青区",
      id: 15,
      name: "赵肖云",
      nickName: "zxy",
      phone: "15192043237",
      province: "天津市",
      registerTime: "2021-03-18 14:49:12",
      sex: 1,
      state: 1,
    },
    finishAt: null,
    latitude: 0,
    longitude: 0,
    expectDate: "2024-06-26",
    orderColumn: null,
    orderType: 1,
    orderWay: null,
    province: "天津市",
    receiveAt: "2024-06-29 21:59:46",
    repairEquipmentNumber: 1,
    startAt: null,
    state: 3,
    updatedAt: "2024-06-29 21:59:46",
    userId: 15,
    volunteerId: null,
  },
  {
    id: 4,
    createTime: "2024-07-02 16:40:02",
    address: "软件园3号楼405",
    name: "赵师傅",
    phone: "14192043237",
    district: "西青区",
    createdAt: "2024-06-29 21:59:46",
    familyUser: {
      avatarUrl:
        "https://home-action.oss-cn-shanghai.aliyuncs.com/admin/33/4c2cbed4-d8d1-41bc-b5af-455b12a935c6.png",
      city: "天津市",
      country: null,
      district: "西青区",
      id: 15,
      name: "赵肖云",
      nickName: "zxy",
      phone: "15192043237",
      province: "天津市",
      registerTime: "2021-03-18 14:49:12",
      sex: 1,
      state: 1,
    },
    finishAt: null,
    latitude: 0,
    longitude: 0,
    orderColumn: null,
    orderType: 1,
    expectDate: "2024-06-26",
    orderWay: null,
    province: "天津市",
    receiveAt: "2024-06-29 21:59:46",
    repairEquipmentNumber: 1,
    startAt: null,
    state: 1,
    updatedAt: "2024-06-29 21:59:46",
    userId: 15,
    volunteerId: null,
  },
];

export default defineComponent({
  name: "RepairListItem",
  components: {},
  onLoad() {},
  props: {
    pageIndex: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    //跳转页面事件
    const handleShowMoreRepairOrder = (item: RepairOrder) => {
      console.log("item", item);
      uni.navigateTo({
        url:
          "/pages/repairDetail/index?repairOrder=" +
          encodeURIComponent(JSON.stringify(item)),
      });
    };
    const getRepairListItemData = () => {
      //注册store实例
      const store = useStore();
      console.log("pageIndex", props.pageIndex);

      if (props.pageIndex !== 0) {
        repairOrderList.value = text_data.filter((item: any) => {
          return item.state === props.pageIndex;
        });
      } else {
        repairOrderList.value = text_data;
      }
      return {
        repairOrderList,
      };
    };
    //监听props中data的变化
    console.log("pageIndex", props.pageIndex);
    return {
      ...getRepairListItemData(),
      repairLabel,
      handleShowMoreRepairOrder,
    };
  },
});
</script>

<style lang="scss">
@mixin flex($direction: row) {
  display: flex;
  flex-direction: $direction;
}
.repairListItem {
  .box {
    width: 100%;
    overflow: hidden;
    &-list {
      width: 700rpx;
      margin: 20rpx auto 0 auto;
      height: 220rpx;
      margin-bottom: 30rpx;
      border-radius: 20rpx;
      background-color: #ffffff;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      border: 1rpx solid transparent;
      transition: 0.2s all;
      &:active {
        border: 1rpx solid $uni-text-color-grey;
      }
      &-item {
        width: 100%;
        height: 100%;
        // padding: 20rpx;
        box-sizing: border-box;
        position: relative;
        &-label {
          @include flex;
          align-items: center;
          justify-content: space-between;
          &-text {
            border-top-left-radius: 20rpx;
            border-bottom-right-radius: 50rpx;
            background-color: $uni-color-primary;
            padding: 0 30rpx 0 10rpx;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            color: #ffffff;
            line-height: 35rpx;
            font-size: 26rpx;
          }
          &-arrow {
            margin-right: 20rpx;
            color: $uni-text-color-grey;
            font-size: 30rpx;
          }
        }
        &-top {
          width: 100%;
          height: 70rpx;
          padding: 20rpx;
          box-sizing: border-box;
          font-size: 26rpx;
          @include flex;
          justify-content: space-between;
          &-user {
            @include flex;
            align-items: center;
            image {
              width: 50rpx;
              height: 50rpx;
              border-radius: 50%;
              object-fit: contain;
            }
            span {
              margin-left: 10rpx;
            }
          }
        }
        &-divide {
          width: 660rpx;
          height: 1rpx;
          margin: 0 auto 0 auto;
          border-bottom: 2rpx solid $uni-border-color;
        }
        &-content {
          width: 100%;
          padding: 20rpx;
          box-sizing: border-box;
          font-size: 26rpx;
          height: 100rpx;
          font-size: 24rpx;
          &-address {
            &-detail {
            }
          }
          &-number {
          }
        }
      }
    }
  }
}
</style>
