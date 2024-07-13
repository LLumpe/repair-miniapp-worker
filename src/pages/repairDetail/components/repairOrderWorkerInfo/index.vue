<template>
  <view class="repairOrderItem">
    <view class="box">
      <view class="box-info">
        <view class="box-info-user">
          <image
            src="@/static/images/icon/user.png"
            style="width: 80rpx; height: 80rpx"
          />
          <view
            style="
              display: flex;
              flex-direction: column;
              color: #333;
              margin-left: 20rpx;
            "
          >
            <span style="font-size: 30rpx">
              {{ test_data.name || "N/A" }}
            </span>
          </view>
          <view
            style="
              position: absolute;
              right: 0;
              display: flex;
              align-items: center;
            "
            @click="handleShowUserPhone"
          >
            <image
              style="width: 40rpx; height: 40rpx"
              class="image"
              src="@/static/images/repairDetail/phone-call.png"
            />
            <span style="margin-left: 10rpx; font-size: 26rpx; color: #999">{{
              test_data.phone || "N/A"
            }}</span>
          </view>
        </view>
        <!-- <view class="box-info-item">
          <view class="box-info-item-label">维修设备</view>
          <view class="box-info-item-value">
            <picker
              :value="repairIndex"
              :range="equipmentList"
              @change="handlePickDevice"
            >
              <view
                style="display: flex; flex-direction: row; align-items: center"
              >
                <view class="info-device-content-item">{{
                  equipmentList[repairIndex] || "N/A"
                }}</view>
                <text class="iconfont icon-arrow-right" />
              </view>
            </picker>
          </view>
        </view> -->
        <!-- <view class="box-info-item">
          <view class="box-info-item-label">设备名</view>
          <view class="box-info-item-value">{{
            orderDetail.repairEquipmentContent[repairIndex].equipmentName ||
            "N/A"
          }}</view>
        </view> -->
        <view class="box-info-item">
          <view class="box-info-item-label">维修描述</view>
          <view class="box-info-item-value">{{ test_data.desc || "N/A" }}</view>
        </view>
        <view class="box-info-item">
          <view class="box-info-item-label">维修图片</view>
          <view class="box-info-item-value">
            <view
              v-if="test_data.repairPicture || test_data.repairPicture.length"
              class="box-info-item-value-image"
            >
              <view
                class="box-info-item-value-image-item"
                v-for="(item, index) in test_data.repairPicture"
                :key="index"
                @click="showImageEvent(item, index)"
              >
                <image :src="item" />
              </view>
            </view>
            <view
              v-if="!test_data.repairPicture && !test_data.repairPicture.length"
              >暂无照片</view
            >
          </view>
        </view>
      </view>
      <view class="box-divide" />
      <view class="box-info-item">
        <view class="box-info-item-label">维修时间</view>
        <view class="box-info-item-value">
          {{ test_data.createAt || "N/A" }}
        </view>
      </view>
    </view>
    <u-popup
      v-model="showPhone"
      custom-class="place-info-popup"
      mode="bottom"
      :border-radius="20"
    >
      <view class="phone">
        <view class="phone-title">联系师傅</view>
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
            >{{ test_data.phone }} <text class="iconfont icon-arrow-right"
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
</template>

<script lang="ts">
import { ref, Ref, reactive, defineComponent, watch } from "vue";
import UPopup from "@/components/UPopup/index.vue";
const repairIndex: Ref<number> = ref(0);
const equipmentList: Ref<any> = ref([]);
const pickIndex: Ref<number> = ref(0);
const showImage: Ref<boolean> = ref(false);
const showPhone: Ref<boolean> = ref(false);
//当前订单维修订单
const test_data: any = {
  id: 1,
  desc: "设备已经全部维修好了",
  name: "杨师傅",
  phone: "14192043237",
  repairPicture: [
    "https://luxushopping.oss-us-west-1.aliyuncs.com/69b78b545920754ec46e9f14363536fb/c0aaf648-025a-49d5-a739-e9ec4bec54f3.jpg",
    "data:image/jpeg;base64,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",
  ],
  createAt: "2024-06-29 21:59:46",
};
export default defineComponent({
  name: "RepairOrderWorkerInfo",
  components: { UPopup },
  props: {
    orderDetail: {
      type: Object,
      default: null,
    },
    pageIndex: {
      type: String,
      default: "0",
    },
  },
  setup(props) {
    console.log("props---->", props.orderDetail);

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
    //构造设备列表
    const getCurrentRepairEquipment = () => {
      const equipment = props.orderDetail.repairEquipmentContent.map(
        (item: object, index: number) => {
          return `当前设备  ${index + 1} ( 总计 ${
            props.orderDetail.repairEquipmentContent.length
          } 个)`;
        }
      );
      console.log("equipment", equipment);
      equipmentList.value = equipment;
    };
    //联系用户事件
    const handleShowUserPhone = () => {
      showPhone.value = true;
    };
    const handleCallUser = (value: string) => {
      uni.makePhoneCall({
        phoneNumber: value,
      });
    };
    //监听props中data的变化
    watch(
      props,
      (newValue: any, oldValue: any) => {
        getCurrentRepairEquipment();
      },
      { immediate: true }
    );
    return {
      repairIndex,
      equipmentList,
      pickIndex,
      showImage,
      handleCallUser,
      handlePickDevice,
      handleShowUserPhone,
      showImageEvent,
      test_data,
      showPhone,
    };
  },
});
</script>
<style lang="scss">
@mixin flex($direction: row) {
  display: flex;
  flex-direction: $direction;
}

.repairOrderItem {
  width: 100%;
  background-color: #ffffff;
  border-radius: 20rpx;

  .box {
    width: 100%;
    border-radius: 15rpx;
    &-info {
      width: 100%;
      height: fit-content;

      &-user {
        width: 100%;
        @include flex;
        box-sizing: border-box;
        position: relative;
        align-items: center;
      }

      &-item {
        margin-top: 20rpx;
        width: 100%;
        @include flex;
        margin-left: 20rpx;
        &-label {
          width: 180rpx;
          font-size: $uni-font-size-sm;
          color: $uni-text-color-grey;
        }

        &-value {
          flex: 1;
          white-space: nowrap;
          /* 强制文本在一行显示 */
          overflow: hidden;
          /* 隐藏超出容器的内容 */
          text-overflow: ellipsis;
          /* 用省略号表示被截断的文本 */
          font-size: $uni-font-size-sm;
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

    &-divide {
      margin-top: 20rpx;
      height: 100%;
      border: 1rpx solid $uni-border-color;
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
  }
}
</style>
