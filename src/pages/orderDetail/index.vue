<template>
  <view class="orderDetail">
    <view class="box">
      <view class="box-notice">
        <image
          src="@/static/images/orderDetail/notice.png"
          style="width: 40rpx; height: 40rpx; object-fit: cover"
        />
        <view class="box-notice-text">
          <span>当前处于待接单状态</span>
          <span>请仔细确认维修订单信息，并明确订单各个处理步骤</span>
        </view>
      </view>
      <view class="box-detail">
        <view class="box-detail-title">确认订单信息</view>
        <view class="box-detail-info">
          <view class="box-detail-info-user">
            <image
              src="@/static/images/icon/user.png"
              style="width: 80rpx; height: 80rpx"
            />
            <view
              style="
                display: flex;
                flex-direction: column;
                margin-left: 20rpx;
                color: #333;
              "
            >
              <span style="font-size: 30rpx"> {{ orderDetail.name }} </span>
              <span style="font-size: 24rpx; color: #999">{{
                orderDetail.createdAt
              }}</span>
            </view>
            <view
              style="
                position: absolute;
                right: 0;
                display: flex;
                align-items: center;
              "
            >
              <image
                style="width: 40rpx; height: 40rpx"
                class="image"
                src="@/static/images/repairDetail/phone-call.png"
              />
              <span style="margin-left: 10rpx; font-size: 26rpx; color: #999">{{
                orderDetail.phone
              }}</span>
            </view>
          </view>
          <view class="box-detail-info-item">
            <view class="box-detail-info-item-title">待维修设备</view>
            <view class="box-detail-info-item-value">
              <picker
                :value="repairIndex"
                :range="equipmentList"
                @change="handlePickDevice"
              >
                <view
                  style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                  "
                >
                  <view class="info-device-content-item">{{
                    equipmentList[repairIndex]
                  }}</view>
                  <text class="iconfont icon-arrow-right" />
                </view>
              </picker>
            </view>
          </view>
          <view class="box-detail-info-item">
            <view class="box-detail-info-item-title">设备名</view>
            <view class="box-detail-info-item-value">{{
              orderDetail.repairEquipmentContent[repairIndex].equipmentName
            }}</view>
          </view>

          <view class="box-detail-info-item">
            <view class="box-detail-info-item-title">客户描述</view>
            <view class="box-detail-info-item-value">{{
              orderDetail.repairEquipmentContent[repairIndex].repairDesc
            }}</view>
          </view>

          <view class="box-detail-info-item">
            <view class="box-detail-info-item-title">设备照片</view>
            <view class="box-detail-info-item-value">
              <view class="box-detail-info-item-value-image">
                <view
                  class="box-detail-info-item-value-image-item"
                  v-for="(item, index) in orderDetail.repairEquipmentContent[
                    repairIndex
                  ].equipmentImg"
                  :key="index"
                  @click="showImageEvent(item, index)"
                >
                  <image :src="item" />
                </view>
              </view>
            </view>
          </view>

          <view class="box-detail-info-item">
            <view class="box-detail-info-item-title">期待维修日期</view>
            <view class="box-detail-info-item-value">{{
              orderDetail.expectDate
            }}</view>
          </view>
          <view class="box-detail-info-item">
            <view class="box-detail-info-item-title">维修地址</view>
            <view class="box-detail-info-item-value">{{
              `${orderDetail.province} - ${orderDetail.city} - ${orderDetail.district}`
            }}</view>
          </view>
          <view class="box-detail-info-item">
            <view class="box-detail-info-item-title">详细地址</view>
            <view class="box-detail-info-item-value">{{
              orderDetail.address
            }}</view>
          </view>
        </view>
      </view>
      <view class="box-process">
        <view class="box-process-title">
          <image
            src="@/static/images/orderDetail/confirm.png"
            style="width: 50rpx; height: 50rpx"
          />
          <span style="color: #333; margin-left: 10rpx"
            >请确定需要维修的订单信息</span
          >
        </view>
        <view class="box-process-steps">
          <USteps :options="stepList" :active="0" active-color="#09C46E" />
        </view>
      </view>
      <view class="box-option">
        <view class="box-option-item" @click="handleOpenPhoneModal"
          >联系用户</view
        >
        <view class="box-option-item">确认接单</view>
      </view>
      <u-popup
        v-model="showPhone"
        custom-class="place-info-popup"
        mode="bottom"
        :border-radius="20"
      >
        <view class="phone">
          <view class="phone-title">联系用户</view>
          <view class="phone-number" @click="handleCallUser(orderDetail.phone)">
            <view style="display: flex; align-items: center">
              <image
                style="width: 40rpx; height: 40rpx; margin-right: 20rpx"
                class="image"
                src="@/static/images/repairDetail/phone-call.png"
              />
              电话联系
            </view>

            <span
              >{{ orderDetail.phone }} <text class="iconfont icon-arrow-right"
            /></span>
          </view>
        </view>
      </u-popup>
      <u-popup
        v-model="showImage"
        custom-class="place-info-popup"
        mode="center"
        :border-radius="20"
      >
        <view class="popup-box">
          <swiper
            class="popup-box-swiper"
            :indicator-dots="true"
            :autoplay="false"
            :animation="false"
            :interval="3000"
            :duration="200"
            :current="pickIndex"
            circular
          >
            <swiper-item
              class="popup-box-swiper-item"
              v-for="(item, index) in orderDetail.repairEquipmentContent[
                repairIndex
              ].equipmentImg"
              :key="index"
            >
              <image :src="item" />
            </swiper-item>
          </swiper>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, ref } from "vue";
import USteps from "@/components/USteps/index.vue";
import UPopup from "@/components/UPopup/index.vue";
const orderDetail: Ref<object | {}> = ref({});
const equipmentList: Ref<any> = ref([]);
const repairIndex: Ref<number> = ref(0);
const pickIndex: Ref<number> = ref(0);
const showImage: Ref<boolean> = ref(false);
export default defineComponent({
  components: { USteps, UPopup },
  setup() {
    //确认订单当前所在步骤
    const active = 1;
    //联系电话弹窗
    const showPhone: Ref<boolean> = ref(false);
    //打开联系电话弹窗事件
    const handleOpenPhoneModal = () => {
      showPhone.value = true;
    };
    //电话联系用户
    const handleCallUser = (value: string) => {
      console.log("phone", value);
      uni.makePhoneCall({
        phoneNumber: value, //仅为示例
      });
    };
    //待维修设备选择设备
    const handlePickDevice = (e: any) => {
      console.log("value", e.target.value);
      repairIndex.value = e.target.value;
    };
    //放大图片
    const showImageEvent = (item: any, index: number) => {
      uni.previewImage({
        urls: [item],
      });
      // showImage.value = true;
      pickIndex.value = index;
    };
    //确认订单步骤条配置
    const stepList = [
      {
        title: "待接单",
      },
      {
        title: "进行中",
      },
      {
        title: "待确认",
      },
      {
        title: "已完成",
      },
    ];
    return {
      active,
      repairIndex,
      stepList,
      showPhone,
      handleOpenPhoneModal,
      orderDetail,
      equipmentList,
      handlePickDevice,
      showImageEvent,
      pickIndex,
      showImage,
      handleCallUser,
    };
  },
  onLoad(option) {
    if (option?.params) {
      const { data, equipmentArray } = JSON.parse(
        decodeURIComponent(option.params)
      );
      console.log("value", data, equipmentArray);
      orderDetail.value = data;
      equipmentList.value = equipmentArray;
    }
  },
});
</script>

<style lang="scss">
@mixin flex($direction: row) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
}
.orderDetail {
  .box {
    // background-color: $uni-color-primary;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;

    &-process {
      margin-top: 20rpx;
      width: 100%;
      height: 300rpx;
      background-color: #ffffff;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      &-title {
        @include flex;
        padding: 40rpx;
        font-weight: 600;
      }
    }
    &-notice {
      @include flex;
      width: 100%;
      height: 100rpx;
      background-color: #ffffff;
      box-sizing: border-box;
      margin-top: 20rpx;
      padding: 30rpx;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      &-text {
        display: flex;
        flex-direction: column;
        margin-left: 20rpx;
        color: $uni-text-color;
        font-size: $uni-font-size-sm;
      }
    }
    &-detail {
      width: 100%;
      margin-top: 20rpx;
      background-color: #ffffff;
      box-sizing: border-box;
      padding: 30rpx;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      &-title {
        font-weight: 600;
      }
      &-info {
        width: 100%;
        position: relative;
        &-user {
          @include flex;
          margin-top: 20rpx;
          width: 100%;
          height: 100rpx;
        }
        &-item {
          margin-top: 20rpx;
          width: 100%;
          // height: 50rpx;
          @include flex;
          &-title {
            width: 180rpx;
            font-size: $uni-font-size-sm;
            color: $uni-text-color-grey;
          }
          &-value {
            margin-left: 20rpx;
            flex: 1;
            white-space: nowrap; /* 强制文本在一行显示 */
            overflow: hidden; /* 隐藏超出容器的内容 */
            text-overflow: ellipsis; /* 用省略号表示被截断的文本 */
            font-size: $uni-font-size-base;
            color: $uni-text-color;
            &-image {
              height: 200rpx;
              margin-right: 30rpx;
              text-align: center;
              align-items: center;
              display: flex;
              &-item {
                display: flex;
                border-radius: 20rpx;
                border: 1rpx solid gainsboro;
                margin-right: 20rpx;
                &:active {
                  border: 1rpx solid rgba(124, 124, 124, 0.7);
                }
                image {
                  width: 160rpx;
                  height: 160rpx;
                  border-radius: 20rpx;
                  object-fit: contain;
                }
                span {
                  font-size: $uni-font-size-sm;
                }
              }
            }
          }
        }
      }
    }
    &-option {
      @include flex;
      justify-content: flex-end;
      width: 100%;
      height: 100rpx;
      padding-bottom: 40rpx;
      background-color: #ffffff;
      z-index: 1;
      position: fixed;
      bottom: 0;
      &-item {
        width: 160rpx;
        text-align: center;
        margin-right: 20rpx;
        color: $uni-color-primary;
        font-weight: 400;
        font-size: $uni-font-size-lg;
        font-weight: 600;
        line-height: 70rpx;
        border: 1rpx solid $uni-color-primary;
        border-radius: 60rpx;
        transition: 0.2s all;
        &:active {
          background-color: $uni-color-primary;
          color: #ffffff;
        }
      }
    }
  }
}
.phone {
  width: 100%;
  height: 200rpx;
  &-title {
    width: 100%;
    text-align: center;
    font-size: 32rpx;
    margin-top: 20rpx;
  }
  &-number {
    width: 100%;
    @include flex;
    justify-content: space-between;
    margin-top: 30rpx;
    padding: 30rpx;
    border-radius: 20rpx;
    box-sizing: border-box;
    &:active {
      background-color: $uni-click-black;
    }
  }
}
.popup-box {
  width: 600rpx;
  height: 600rpx;
  background-color: rgba(124, 124, 124, 0.2);
  &-swiper {
    width: 100%;
    height: 100%;
    &-item {
      display: flex;
      // align-items: center;
      justify-content: center;
      image {
        width: 100%;
        height: 90%;
        object-fit: contain;
      }
    }
  }
}
</style>
