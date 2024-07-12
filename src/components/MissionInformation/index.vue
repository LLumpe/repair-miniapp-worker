<template>
  <view class="body">
    <view class="box">
      <view class="info">
        <u-cell-group>
          <view class="info-user">
            <view class="info-user-box">
              <image :src="data.familyUser.avatarUrl" class="avatarUrl"></image>
              <view class="info-user-name">
                <h1>{{ data.name }}</h1>
                <span>{{ data.createdAt }}</span>
              </view>
            </view>
            <view class="info-user-phone">
              <image
                class="image"
                src="@/static/images/repairDetail/phone-call.png"
              />
              {{ data.phone }}
            </view>
          </view>
          <!-- <u-cell-item
            title="设备数量"
            :value="data.repairEquipmentNumber"
            :arrow="false"
            hover-class="none"
          /> -->
          <u-cell-item
            title="期待维修日期"
            :value="data.expectDate"
            :arrow="false"
            hover-class="none"
          />
          <u-cell-item
            title="维修地址"
            :value="`${data.province} - ${data.city} - ${data.district}`"
            :arrow="false"
            hover-class="none"
          />
          <u-cell-item
            title="详细地址"
            :value="`${data.address}`"
            :arrow="true"
            @click="handleClickRoutePlan(data)"
            hover-class="none"
          />
          <!-- <u-cell-item
            title="距离"
            :value="`${getDistanceFromMe(
              [data.longitude, data.latitude],
              'km'
            ).toFixed(1)} km`"
            :arrow="false"
            hover-class="none"
          /> -->
          <!-- <u-cell-item
            title="待维修设备"
            :value="`当前 设备 ${repairIndex + 1} ( 总计 ${
              data.repairEquipmentContent.length
            } 个 )`"
            :arrow="true"
            hover-class="none"
            @click="handleChangeDevice"
          /> -->
          <view class="info-device">
            <view class="info-device-title"> 待维修设备 </view>
            <view class="info-device-content">
              <picker
                :value="repairIndex"
                :range="equipmentArray"
                @change="handlePickDevice"
              >
                <view class="info-device-content-box">
                  <view class="info-device-content-item">{{
                    equipmentArray[repairIndex]
                  }}</view>
                  <text class="iconfont icon-arrow-right" />
                </view>
              </picker>
            </view>
          </view>
          <u-cell-item
            title="待维修"
            :value="data.repairEquipmentContent[repairIndex].equipmentName"
            :arrow="false"
            hover-class="none"
          />
          <u-cell-item
            title="客户描述"
            :value="data.repairEquipmentContent[repairIndex].repairDesc"
            :arrow="false"
            hover-class="none"
          />
          <view class="info-pic">
            <view class="info-pic-title"> 设备照片 </view>
            <view class="info-pic-image">
              <view
                class="info-pic-image-item"
                v-for="(item, index) in data.repairEquipmentContent[repairIndex]
                  .equipmentImg"
                :key="index"
                @click="showImageEvent(item, index)"
              >
                <image :src="item" />
              </view>
            </view>
          </view>
        </u-cell-group>
      </view>
    </view>
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
          @change="handleSwiperChange"
        >
          <swiper-item
            class="popup-box-swiper-item"
            v-for="(item, index) in data.repairEquipmentContent[repairIndex]
              .equipmentImg"
            :key="index"
          >
            <image :src="item" />
          </swiper-item>
        </swiper>
      </view>
    </u-popup>
    <view class="option">
      <view class="option-take" @click="handleTakeOrder">接单</view>
    </view>
  </view>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, ref, watch } from "vue";
import UCellGroup from "@/components/UCellGroup/index.vue";
import UCellItem from "@/components/UCellItem/index.vue";
import UPopup from "@/components/UPopup/index.vue";
import dayjs from "@/utils/dayjs";
import PlacesPopup from "./PlacesPopup.vue";
import mapSettings from "@/config/map";
import { useLocation } from "@/uses/useLocation";
import { navigateTo } from "@/utils/helper";
const repairIndex: Ref<number> = ref(1);
const pickIndex: Ref<number> = ref(0);
const show: Ref<boolean> = ref(false);
const showImage: Ref<boolean> = ref(false);
const pickDeviceNo: Ref<any> = ref();
const equipmentArray: Ref<any> = ref([]);
export default defineComponent({
  name: "MissionInformationCom",
  components: { UCellGroup, UCellItem, UPopup },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    var that = this;
    //轮播图切换
    const handleSwiperChange = (event: any) => {
      console.log("event", event);
    };
    //debug
    console.log("props", props);
    //接单
    const handleTakeOrder = () => {
      console.log("跳转至确认订单界面");
      const params = {
        data: props.data,
        equipmentArray: equipmentArray.value,
      };
      const paramObject = encodeURIComponent(JSON.stringify(params));
      console.log("paramObject", paramObject);
      //这里需要判断订单和维修师傅的距离，如果距离过远，需要弹窗提示订单过远，如果不远，则直接跳转确认订单界面
      // navigateTo("/pages/orderDetail/index", {
      //   data: props.data,
      // });
      uni.navigateTo({
        url: `/pages/orderDetail/index?params=${paramObject}`,
      });
    };
    const index = 0;

    // const array = props.data.repairEquipmentContent.map(
    //   (item: object, index: number) => {
    //     return `当前设备  ${index + 1} ( 总计 ${
    //       props.data.repairEquipmentContent.length
    //     } 个)`;
    //   }
    // );

    const getCurrentRepairEquipment = () => {
      const equipment = props.data.repairEquipmentContent.map(
        (item: object, index: number) => {
          return `当前设备  ${index + 1} ( 总计 ${
            props.data.repairEquipmentContent.length
          } 个)`;
        }
      );
      console.log("equipment", equipment);
      equipmentArray.value = equipment;
    };

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

    //规划路线
    const handleClickRoutePlan = (value: any) => {
      // let plugin = requirePlugin("routePlan");
      console.log("value", value);
      let key = mapSettings.key; //使用在腾讯位置服务申请的key
      let referer = mapSettings.appName; //调用插件的app的名称
      console.log("key,referer", key, referer);
      // let endPoint = JSON.stringify({
      //   //终点
      //   name: value.address,
      //   latitude: value.latitude,
      //   longitude: value.longitude,
      // });
      let endPoint = JSON.stringify({
        //终点
        name: "奉贤信息大厦",
        latitude: 30.916772,
        longitude: 121.47439,
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

    //select列选择器
    const confirm = (event: any) => {
      console.log("event", event);
      console.log("select click");
    };

    //cell点击事情回调
    const handleChangeDevice = (event: any) => {
      show.value = true;
      console.log("cell click");
    };

    //监听props中data的变化
    watch(
      props,
      (newValue: any, oldValue: any) => {
        getCurrentRepairEquipment();
      },
      { immediate: true }
    );
    // 计算图片列表
    // const images = computed(() => {
    //   const lifePhotos = props?.data?.oldMan?.lifePhotos
    //     ? JSON.parse(props.data.oldMan.lifePhoto)
    //     : [];

    //   return [props?.data?.oldMan?.identificationPhoto, ...lifePhotos];
    // });

    // // 点击图片进行预览
    // const handlePreviewPhoto = (index: number) => {
    //   uni.previewImage({
    //     urls: images.value,
    //     current: index.toString(),
    //   });
    // };

    // // 计算年龄
    // const manAge = computed(() => {
    //   return parseInt(dayjs(props?.data?.oldMan?.birthDate).fromNow(), 10);
    // });

    // 常去地点
    // const offenPlace = computed(() => {
    //   return props?.data?.oldMan?.offerPlace
    //     ? JSON.parse(props.data.oldMan.offerPlace)
    //     : [];
    // });
    // // 常去地点数量
    // const offenPlaceNumber = computed(() => {
    //   return props?.data?.oldMan?.offerPlace
    //     ? JSON.parse(props.data.oldMan.offerPlace).length
    //     : [];
    // });

    // // 电话拨号
    // const makePhoneCall = (tel: string) => {
    //   uni.makePhoneCall({
    //     phoneNumber: tel,
    //   });
    // };

    // // 点击走失地点
    // const handleClickLostPlace = () => {
    //   uni.openLocation({
    //     latitude: props.data.latitude,
    //     longitude: props.data.longitude,
    //     name: props.data.place,
    //     address: props.data.address,
    //   });
    // };

    // // 是否展示常去地点弹框
    // const showOffenPlacesPopup = ref(false);
    // // 点击常去地点
    // const handleClickOffenPlace = () => {
    //   showOffenPlacesPopup.value = true;
    // };

    return {
      watch,
      index,
      handleClickRoutePlan,
      equipmentArray,
      handleTakeOrder,
      handleChangeDevice,
      handleSwiperChange,
      repairIndex,
      show,
      showImage,
      pickDeviceNo,
      pickIndex,
      confirm,
      handlePickDevice,
      showImageEvent,
      ...useLocation(),
      // images,
      // handlePreviewPhoto,
      // manAge,
      // offenPlace,
      // offenPlaceNumber,
      // makePhoneCall,
      // handleClickLostPlace,
      // showOffenPlacesPopup,
      // handleClickOffenPlace,
    };
  },
});
</script>

<style lang="scss" scoped>
.body {
  min-height: 100vh;
  .title {
    line-height: 50rpx;
    font-weight: 600;
    margin: 20rpx;
    padding-left: 20rpx;
    font-size: $uni-font-size-title;
    border-left: 6rpx solid $uni-color-primary;
  }
  .box {
    width: 100%;
    box-sizing: border-box;
    .problem {
      width: 100%;
      height: 500rpx;
      &-swiper {
        width: 100%;
        height: 100%;
        border: 1rpx solid rgba(0, 0, 0, 0.2);
        // box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
        //   rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
        // background-color: ghostwhite;
        &-item {
          display: flex;
          align-items: center;
          justify-content: center;
          &-image {
            width: 90%;
            height: 80%;
            object-fit: contain;
          }
        }
      }
    }
    .info {
      width: 100%;
      margin-bottom: 101rpx;
      &-user {
        width: 100%;
        padding: 20rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        border-bottom: 1rpx solid rgba(184, 184, 184, 0.2);
        &-box {
          display: flex;
        }
        &-phone {
          .image {
            width: 40rpx;
            height: 40rpx;
          }
          display: flex;
          align-items: center;
          flex-direction: row;
          line-height: 80rpx;
          text-align: right;
          font-size: $uni-font-size-base;
          color: $uni-text-color-grey;
          &:active {
            color: $uni-text-color;
          }
        }
        image {
          width: 90rpx;
          height: 90rpx;
          border-radius: 50%;
          margin-left: 10rpx;
        }
        &-name {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 20rpx;
          height: 90rpx;
          h1 {
            font-weight: 600;
            font-size: $uni-font-size-title;
          }
          span {
            color: $uni-text-color-grey;
            font-weight: 500;
            font-size: $uni-font-size-sm;
          }
        }
      }
      &-desc {
        width: 100%;
        padding-top: 30rpx;
        padding-right: 20rpx;
        padding-left: 32rpx;
        padding-bottom: 30rpx;
        box-sizing: border-box;
        &-title {
          font-size: $uni-font-size-base;
        }
        &-content {
          margin-top: 10rpx;
          color: #5d5c5e;
          font-size: $uni-font-size-sm;
        }
      }
      &-pic {
        width: 100%;
        padding: 20rpx 0rpx 20rpx 30rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background-color: #ffffff;
        justify-content: space-between;
        border-bottom: 1rpx solid rgba(184, 184, 184, 0.2);
        &-title {
          width: 150rpx;
          font-size: $uni-font-size-base;
        }
        &-image {
          height: 160rpx;
          float: right;
          margin-right: 30rpx;
          text-align: center;
          align-items: center;
          justify-content: space-between;
          display: flex;
          &-item {
            display: flex;
            border-radius: 20rpx;
            border: 1rpx solid gainsboro;
            margin-left: 20rpx;
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
      &-device {
        width: 100%;
        height: 110rpx;
        padding: 20rpx 0rpx 20rpx 30rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background-color: #ffffff;
        justify-content: space-between;
        border-bottom: 1rpx solid rgba(184, 184, 184, 0.2);
        &-title {
          width: 150rpx;
          font-size: $uni-font-size-base;
        }
        &-content {
          padding-right: 20rpx;
          &-box {
            display: flex;
            align-items: center;
            text {
              color: gray;
              font-size: 38rpx;
              margin-right: 12rpx;
            }
          }
          &-item {
            color: #5d5c5e;
            margin-right: 10rpx;
            font-size: $uni-font-size-base;
          }
        }
      }
    }
  }
  .option {
    width: 100%;
    height: 90rpx;
    text-align: center;
    padding-bottom: 50rpx;
    background-color: #ffffff;
    z-index: 4;
    border-top: 1rpx solid rgba(184, 184, 184, 0.2);
    position: fixed;
    bottom: 0;
    &-take {
      color: #ffffff;
      font-size: $uni-font-size-lg;
      font-weight: 600;
      line-height: 70rpx;
      margin: 10rpx;
      border-radius: 20rpx;
      background-color: $uni-color-primary;
      transition: 0.2s all;
      &:active {
        background-color: $uni-click-green;
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
  .device-no {
    width: 100%;
    height: 300rpx;
    padding: 20rpx;
  }
}

.image {
  width: 100%;
  white-space: nowrap;

  &-item {
    border-radius: 10rpx;
    margin-right: 8rpx;
    width: 308rpx;
    height: 196rpx;
  }
}
</style>
