<template>
  <view class="repairDetail">
    <view class="box">
      <view class="box-title" v-if="currentRepairOrder.state === 1">
        <h1>进行中</h1>
        <h2>订单正在进行中，祝您生活愉快~</h2>
      </view>
      <view class="box-title" v-if="currentRepairOrder.state === 2">
        <h1>等待用户确认</h1>
        <h2>订单正在等待用户确认，祝您生活愉快~</h2>
      </view>
      <view class="box-title" v-if="currentRepairOrder.state === 3">
        <h1>已完成</h1>
        <h2>订单已经完成，祝您生活愉快~</h2>
      </view>
      <view class="box-title" v-if="currentRepairOrder.state === -10">
        <h1>已退单</h1>
        <h2>订单已经退单，祝您生活愉快~</h2>
      </view>
      <view class="box-notice">
        <view class="box-notice-image">
          <image src="@/static/images/repairDetail/repairWorker.svg" />
        </view>
        <view class="box-notice-content">
          <span v-if="currentRepairOrder.state === 1">
            HI!~订单正在进行中，待设备维修完毕后请上传维修图片和备注!
          </span>
          <span v-if="currentRepairOrder.state === 2">
            HI!~订单正在等待用户确认哦，请维修师傅耐心等待!
          </span>
          <span v-if="currentRepairOrder.state === 3">
            HI!~订单已经由用户确认完成了哦，感谢您对该订单的维修支持!
          </span>
          <span v-if="currentRepairOrder.state === -10">
            HI!~订单已经由用户退单了哦，感谢您对该订单的维修支持!
          </span>
        </view>
        <RepairDetailNotice />
      </view>
      <view class="box-orderId">
        <span class="box-orderId-content">
          订单号：1020240706143145142099
        </span>
        <view style="color: #09c46e" @click="handleCopyRepairId">复制</view>
      </view>
      <view class="box-order">
        <view class="box-order-title"> 订单详情：</view>
        <view class="box-order-content">
          <view class="box-order-steps">
            <USteps
              :options="stepList"
              :active="currentRepairOrder.state"
              active-color="#09C46E"
            />
          </view>
          <RepairOrderDetailInfo :orderDetail="currentRepairOrder" />
        </view>
      </view>
      <view v-if="currentRepairOrder.state !== 1" class="box-order">
        <view class="box-order-title"> 维修记录：</view>
        <view class="box-order-content">
          <RepairOrderWorkerInfo></RepairOrderWorkerInfo>
        </view>
      </view>

      <view class="block" />

      <view class="box-option">
        <view v-if="currentRepairOrder.state === 1" class="box-option-item">
          取消订单
        </view>
        <view
          v-if="currentRepairOrder.state === 2"
          class="box-option-item"
          @click="handlePushUser"
        >
          提醒用户
        </view>
        <view v-if="currentRepairOrder.state === -10" class="box-option-item">
          查看历史订单
        </view>
        <view
          v-if="currentRepairOrder.state === 1"
          class="box-option-item"
          @click="handleSubmitImage"
        >
          确认订单
        </view>
      </view>

      <u-popup
        v-model="showMessage"
        custom-class="place-info-popup"
        mode="center"
        :border-radius="20"
        @close="handleModalClose"
      >
        <view class="message">
          <title class="message-title">确认订单须知</title>
          <h1></h1>
          <view class="message-content">
            <view>
              尊敬的维修师傅，您好！在完成维修工作后，请您遵循以下须知内容，以确保顺利交付和客户满意：
            </view>
            <view class="message-content-text">
              请现场测试维修后的设备或系统，确保其正常运转，确保维修项目按照要求完成，无遗漏或质量问题。
            </view>
            <view class="message-content-text">
              请清理维修现场，确保工作区域干净整洁,将拆卸的零件、工具和垃圾妥善处理。
            </view>
            <view class="message-content-text">
              与客户核对维修费用明细，确保客户对费用无异议,根据公司的结算方式，完成费用收取或确认。
            </view>
            <br />
          </view>
          <view class="message-button">
            <button @click="handleCancelOrder">
              {{ text }}
            </button>
            <button @click="handleAcceptOrder">确认</button>
          </view>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<script lang="ts">
import { ref, Ref, reactive, defineComponent, onMounted } from "vue";
import USteps from "@/components/USteps/index.vue";
import RepairOrderDetailInfo from "./components/repairOrderDetailInfo/index.vue";
import RepairOrderWorkerInfo from "./components/repairOrderWorkerInfo/index.vue";
import UCollapse from "@/components/UCollapse/index.vue";
import UCollapseItem from "@/components/UCollapseItem/index.vue";
import UPopup from "@/components/UPopup/index.vue";
import {
  hideLoading,
  navigateTo,
  showLoading,
  showModalError,
  showToast,
} from "@/utils/helper";
import { repairOrder } from "@/api/types/models";
//维修进度状态
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
  {
    title: "已退单",
  },
];
//显示确认须知
const showMessage = ref(false);
//定时关闭
let timeout = ref<number | null>(null);
//设置关闭秒数
const count = ref<number>(7);
//显示关闭
const text = ref<string>("取消");
//折叠是否显示
const showCollapse = ref<Array<string>>(["0"]);
//维修标签状态
const repairLabel = {
  "2": "订单进行中",
  "3": "订单待确认",
  "4": "订单已完成",
  "4-4": "订单已退单",
};
const currentRepairOrder: Ref<repairOrder | null> = ref(null);
export default defineComponent({
  name: "RepairDetail",
  components: {
    USteps,
    RepairOrderDetailInfo,
    UPopup,
    RepairOrderWorkerInfo,
  },
  props: {
    repairOrder: {
      type: String,
      default: null,
    },
  },

  setup(props) {
    console.log(
      "repairDetail prps--->",
      JSON.parse(decodeURIComponent(props.repairOrder))
    );
    const handleCopyRepairId = () => {
      showToast("复制成功", "success");
    };
    //折叠面板折叠
    const handleCollapseChange = (value: any) => {
      console.log("value", value);
    };
    //提醒用户
    const handlePushUser = () => {
      showToast("提醒用户成功！", "success");
    };
    //上传维修图片
    const handleSubmitImage = () => {
      startCountDown();
      showMessage.value = true;
    };
    //取消
    const handleCancelOrder = () => {
      showMessage.value = false;
      handleClearInterval();
    };
    //确认
    const handleAcceptOrder = () => {
      showMessage.value = false;
      handleClearInterval();
      navigateTo("/pages/uploadRepairImage/index", {
        id: currentRepairOrder.value.id,
      });
    };
    //弹窗关闭
    const handleModalClose = () => {
      handleClearInterval();
    };
    const handleClearInterval = () => {
      clearInterval(timeout.value);
    };
    const startCountDown = () => {
      count.value = 7;
      text.value = "关闭";
      timeout.value = setInterval(() => {
        console.log("count", count.value);

        if (count.value > 0) {
          if (count.value <= 5) {
            text.value = `关闭 (${count.value})`;
          } else {
            text.value = "关闭";
          }
          count.value--;
        } else {
          showMessage.value = false;
          handleClearInterval();
        }
      }, 1000);
    };
    return {
      repairLabel,
      currentRepairOrder,
      handleCopyRepairId,
      stepList,
      handleCollapseChange,
      showCollapse,
      handleSubmitImage,
      showMessage,
      handlePushUser,
      timeout,
      handleCancelOrder,
      handleClearInterval,
      handleModalClose,
      count,
      startCountDown,
      text,
      handleAcceptOrder,
    };
  },
  onLoad(options) {
    console.log(
      "repairDetail options --->",
      JSON.parse(decodeURIComponent(options?.repairOrder))
    );
    currentRepairOrder.value = JSON.parse(
      decodeURIComponent(options?.repairOrder)
    );
  },
  beforeUnmount() {
    this.handleClearInterval();
  },
});
</script>

<style lang="scss">
@mixin flex($direction: row) {
  display: flex;
  flex-direction: $direction;
}
@mixin box() {
  width: 100%;
  border-radius: 20rpx;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
}
.repairDetail {
  .box {
    width: 100vw;
    // min-height: 100vh;
    padding: 30rpx;
    // padding-bottom: 120rpx;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 15rpx;
    // margin-bottom: 100rpx;
    &-title {
      @include flex(column);
      flex-direction: column;
      height: 150rpx;
      justify-content: space-around;
      h1 {
        font-size: $uni-font-size-xxl;
      }
      h2 {
        font-size: $uni-font-size-lg;
      }
    }
    &-notice {
      width: 100%;
      height: 200rpx;
      @include flex;
      align-items: center;
      &-image {
        width: 130rpx;
        height: 130rpx;
        border-radius: 50%;
        overflow: hidden;
        image {
          width: 130rpx;
          height: 130rpx;
        }
      }
      &-content {
        flex: 1;
        height: 130rpx;
        background-color: #ffffff;
        margin-left: 20rpx;
        border-radius: 30rpx;
        padding: 10rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
        span {
          margin-left: 20rpx;
          width: 100%;
          letter-spacing: 2rpx;
          font-size: $uni-font-size-base;
          color: $uni-text-color;
        }
      }
    }
    &-orderId {
      @include box;
      @include flex(row);
      justify-content: space-between;
      box-sizing: border-box;
      padding: 30rpx;
      &-content {
        letter-spacing: 2rpx;
        font-size: $uni-font-size-base;
        color: $uni-text-color;
        width: 530rpx;
        white-space: nowrap; /* 禁止文本换行 */
        overflow: hidden; /* 隐藏溢出内容 */
        text-overflow: ellipsis; /* 使用省略号表示溢出内容 */
      }
    }
    &-order {
      width: 100%;
      @include flex(column);
      border-radius: 20rpx;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      margin-top: 35rpx;
      background-color: #ffffff;
      display: flex;
      &-title {
        font-size: $uni-font-size-base;
        color: $uni-text-color;
        padding: 30rpx 0 20rpx 30rpx;
      }
      &-steps {
        // background-color: aqua;
        padding: 20rpx;
        box-sizing: border-box;
      }
    }
    &-option {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      width: 100%;
      height: 140rpx;
      background-color: #ffffff;
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 20rpx;
      box-sizing: border-box;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        // width: 200rpx;
        padding: 0 20rpx;
        height: 70rpx;
        margin-left: 20rpx;
        border-radius: 50rpx;
        background-color: $uni-color-primary;
        color: #ffffff;
      }
    }
    .message {
      width: 600rpx;
      position: relative;
      padding-bottom: 100rpx;
      &-title {
        display: block;
        text-align: center;
        box-sizing: border-box;
        padding: 20rpx;
        font-size: $uni-font-size-xl;
        color: $uni-color-primary;
        font-weight: 600;
      }
      &-content {
        width: 100%;
        padding: 40rpx;
        box-sizing: border-box;
        &-text {
          padding: 20rpx 20rpx 0 20rpx;
          box-sizing: border-box;
          &::before {
            content: "*";
            color: red;
          }
        }
      }
      &-button {
        width: 100%;
        display: flex;
        flex-direction: row;
        position: absolute;
        bottom: 0;
        button {
          font-size: $uni-font-size-lg;
          width: 50%;
        }
      }
    }
    .block {
      display: inline-block;
      width: 100%;
      height: 130rpx;
    }
  }
}
</style>
