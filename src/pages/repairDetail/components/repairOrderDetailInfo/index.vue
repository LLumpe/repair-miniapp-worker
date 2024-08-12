<template>
  <view class="repairOrderItem">
    <view class="box">
      <view class="box-info">
        <view class="box-info-user">
          <image
            v-if="orderDetail.familyUser.avatarUrl"
            :src="orderDetail.familyUser.avatarUrl"
            style="width: 80rpx; height: 80rpx; border-radius: 50%"
          />
          <image
            v-if="!orderDetail.familyUser.avatarUrl"
            src="@/static/images/icon/user.png"
            style="width: 80rpx; height: 80rpx; border-radius: 50%"
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
              {{ orderDetail.name || "匿名订单" }}
            </span>
            <span style="font-size: 24rpx; color: #999">{{
              orderDetail.updatedAt || "N/A"
            }}</span>
          </view>
          <view
            style="
              position: absolute;
              right: 0;
              display: flex;
              align-items: center;
            "
            @click="
              handleShowUserPhone(orderDetail.familyUser.phone || undefined)
            "
          >
            <image
              style="width: 40rpx; height: 40rpx"
              class="image"
              src="@/static/images/repairDetail/phone-call.png"
            />
            <span style="margin-left: 10rpx; font-size: 26rpx; color: #999">{{
              orderDetail.familyUser.phone || "未绑定手机号码"
            }}</span>
          </view>
        </view>
        <view class="box-divide" />
        <view class="box-info-item">
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
        </view>
        <view class="box-info-item">
          <view class="box-info-item-label">设备名</view>
          <view class="box-info-item-value">{{
            orderDetail.repairEquipmentContent[repairIndex].equipmentName ||
            "N/A"
          }}</view>
        </view>
        <view class="box-info-item">
          <view class="box-info-item-label">客户描述</view>
          <view class="box-info-item-value">{{
            orderDetail.repairEquipmentContent[repairIndex].repairDesc || "N/A"
          }}</view>
        </view>
        <view class="box-info-item">
          <view class="box-info-item-label">设备照片</view>
          <view class="box-info-item-value">
            <view
              v-if="
                orderDetail.repairEquipmentContent[repairIndex].equipmentImg &&
                orderDetail.repairEquipmentContent[repairIndex].equipmentImg
                  .length
              "
              class="box-info-item-value-image"
            >
              <view
                class="box-info-item-value-image-item"
                v-for="(item, index) in orderDetail.repairEquipmentContent[
                  repairIndex
                ].equipmentImg"
                :key="index"
                @click="showImageEvent(item, index)"
              >
                <image :src="item" mode="aspectFit" />
              </view>
            </view>
            <view
              v-if="
                !orderDetail.repairEquipmentContent[repairIndex].equipmentImg ||
                !orderDetail.repairEquipmentContent[repairIndex].equipmentImg
                  .length
              "
              >暂无照片</view
            >
          </view>
        </view>
        <view class="box-info-item">
          <view class="box-info-item-label">维修设备分值</view>
          <view class="box-info-item-value">
            {{
              orderDetail.repairEquipmentContent[repairIndex].score + "分" ||
              "N/A"
            }}
          </view>
        </view>
        <view class="box-info-item">
          <view class="box-info-item-label">期待维修日期</view>
          <view class="box-info-item-value">
            {{ orderDetail.expectDate || "N/A" }}
          </view>
        </view>
        <view class="box-info-item">
          <view class="box-info-item-label">期待维修师傅</view>
          <view class="box-info-item-value">
            {{ orderDetail.expectVolunteer || "无" }}
          </view>
        </view>
        <view class="box-info-item">
          <view class="box-info-item-label">维修地址</view>
          <view class="box-info-item-value">
            {{
              `${orderDetail.province || "N/A"} 
               - ${orderDetail.district || "N/A"}`
            }}
          </view>
        </view>
        <view class="box-info-item" @click="handleClickRoutePlan">
          <view class="box-info-item-label">详细地址</view>
          <view class="box-info-item-value">
            {{ orderDetail.address || "N/A" }}
          </view>
          <text class="iconfont icon-arrow-right" />
        </view>
        <view class="box-divide" />
        <view class="box-info-item">
          <view class="box-info-item-label">下单时间</view>
          <view class="box-info-item-value">
            {{ orderDetail.createdAt || "N/A" }}
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
          <view class="phone-title">联系用户</view>
          <view
            class="phone-number"
            @click="handleCallUser(orderDetail.familyUser.phone)"
          >
            <view style="display: flex; align-items: center">
              <image
                style="width: 40rpx; height: 40rpx; margin-right: 20rpx"
                class="image"
                src="@/static/images/repairDetail/phone-call.png"
              />
              电话联系
            </view>

            <span
              >{{ orderDetail.familyUser.phone }}
              <text class="iconfont icon-arrow-right"
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
import { ref, Ref, reactive, defineComponent, watch } from "vue";
import UPopup from "@/components/UPopup/index.vue";
import jestConfig from "jest.config";
import mapSettings from "@/config/map";
import { showToast } from "@/utils/helper";
const repairIndex: Ref<number> = ref(0);
const equipmentList: Ref<any> = ref([]);
const pickIndex: Ref<number> = ref(0);
const showImage: Ref<boolean> = ref(false);
const showPhone: Ref<boolean> = ref(false);
export default defineComponent({
  name: "RepairOrderDetailInfo",
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
    //规划路线
    const handleClickRoutePlan = (value: any) => {
      // let plugin = requirePlugin("routePlan");
      console.log("value", value);
      let key = mapSettings.key; //使用在腾讯位置服务申请的key
      let referer = mapSettings.appName; //调用插件的app的名称
      console.log("key,referer", key, referer);
      let endPoint = JSON.stringify({
        //终点
        name: props.orderDetail.address,
        latitude: props.orderDetail.latitude,
        longitude: props.orderDetail.longitude,
      });
      wx.navigateTo({
        url:
          "plugin://routePlan/index?key=" +
          key +
          "&referer=" +
          referer +
          "&endPoint=" +
          endPoint +
          `&themeColor=${mapSettings.color}`,
      });
    };
    //联系用户事件
    const handleShowUserPhone = (phone: string) => {
      if (phone != undefined) {
        showPhone.value = true;
      } else {
        showToast("用户未绑定手机号码");
      }
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
      handleClickRoutePlan,
      repairIndex,
      equipmentList,
      pickIndex,
      showImage,
      handleCallUser,
      handlePickDevice,
      handleShowUserPhone,
      showImageEvent,
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
  margin: 0 0 0 0;
  background-color: #ffffff;
  border-radius: 20rpx;
  .box {
    width: 100%;
    border-radius: 15rpx;
    padding: 0rpx 30rpx 30rpx 30rpx;
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
        margin-left: 15rpx;

        &-label {
          width: 180rpx;
          font-size: $uni-font-size-sm;
          color: $uni-text-color-grey;
        }
        &-value {
          flex: 1;
          white-space: nowrap; /* 强制文本在一行显示 */
          overflow: hidden; /* 隐藏超出容器的内容 */
          text-overflow: ellipsis; /* 用省略号表示被截断的文本 */
          font-size: $uni-font-size-sm;
          color: $uni-text-color;
          &-image {
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
                width: 120rpx;
                height: 120rpx;
                border-radius: 10rpx;
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
