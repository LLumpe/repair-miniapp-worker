<template>
  <view class="uploadRepairImage">
    <view class="box">
      <view class="box-form">
        <view class="box-form-item">
          <title class="box-form-item-title">维修描述</title>
          <view label="图片描述" class="box-form-item-desc">
            <textarea
              v-model="formData.repairDesc"
              type="textArea"
              placeholder="请输入维修描述"
              maxlength="50"
            ></textarea>
          </view>
        </view>
        <view class="box-form-item">
          <title class="box-form-item-title">上传维修照片</title>
          <view label="上传图片" class="box-form-item-image">
            <UUploader
              v-modal="formData.repairImg"
              :image-styles="imageStyles"
              @select="handleImageSelect"
              @delete="handleDelete"
              limit="3"
              title="最多选择3张图片"
            />
          </view>
        </view>
      </view>
      <view class="box-button">
        <button @click="handleSubmit" type="primary">提交</button>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { ref, Ref, reactive, defineComponent, onUnmounted } from "vue";
import UUploader from "@/components/UUploader/index.vue";
import { requestUploadImage } from "@/api/myRepairOrder";
import UInput from "@/components/UInput/index.vue";
import UEasyInput from "@/components/UEasyInput/index.vue";
import { requestWorkerFinishOrder } from "@/api/repairOrder";
import {
  hideLoading,
  navigateBack,
  navigateTo,
  showLoading,
  showModalError,
  showToast,
} from "@/utils/helper";
export interface formType {
  id: string;
  repairDesc: string;
  repairImg: Array<string> | string;
}
export default defineComponent({
  name: "UploadRepairImage",
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  components: { UUploader },
  setup(props) {
    const timeoutRef = ref<number | null>(null);
    const formData = reactive<formType>({
      id: props.id,
      repairDesc: "",
      repairImg: [],
    });
    const handleSubmit = async () => {
      let timeout;
      if (!formData.repairDesc) {
        showToast("请填写维修描述");
      } else if (JSON.stringify(formData.repairImg) === "[]") {
        showToast("请上传维修图片");
      } else {
        showLoading("提交中");
        try {
          formData.repairImg = JSON.stringify(formData.repairImg);
          const res = await requestWorkerFinishOrder(formData);
          if (res.data?.success) {
            hideLoading();
            showToast("完成订单成功", "success");
            timeoutRef.value = setTimeout(() => {
              uni.navigateBack({ delta: 2 });
            }, 600);
          }
        } catch (error) {
          console.log(error);
          hideLoading();
          showModalError("上传图片失败");
        }
      }
    };
    //选择图片
    const handleImageSelect = async (e: any) => {
      showLoading();
      try {
        const tempFilePath = e.tempFilePaths;
        for (let i = 0; i < tempFilePath.length; i++) {
          const imageUrl = await requestUploadImage(tempFilePath[i]);
          formData.repairImg.push(imageUrl.data.data as string);
        }
        showToast("加载成功", "success");
        hideLoading();
      } catch (error) {
        console.log(error);
        hideLoading();
        showModalError("上传图片失败");
      }
      // console.log("e", e);
      // formData.file.push(e?.tempFiles[0]);
      // return true;
    };
    //删除照片
    const handleDelete = (e: any) => {
      formData.repairImg.splice(e.index, 1);
    };
    //照片样式
    const imageStyles = {
      width: 100,
      height: 100,
      border: {
        width: 2,
        style: "dashed",
        radius: "10px",
      },
    };
    onUnmounted(() => {
      if (timeoutRef.value) {
        clearTimeout(timeoutRef.value);
      }
    });
    return {
      timeoutRef,
      formData,
      handleSubmit,
      imageStyles,
      handleImageSelect,
      handleDelete,
    };
  },
  onLoad(options) {
    console.log("options", options);
  },
});
</script>

<style lang="scss">
.uploadRepairImage {
  width: 100%;
  .box {
    position: relative;
    width: 100%;
    &-form {
      margin-top: 30rpx;
      border-radius: 20rpx;
      width: 100%;
      box-sizing: border-box;
      padding: 0 40rpx 0 40rpx;
      overflow: hidden;
      background-color: #ffffff;
      &-item {
        width: 100%;
        display: block;
        margin: 30rpx auto 30rpx auto;
        &-title {
          display: flex;
          align-items: center;
          font-size: $uni-font-size-xl;
          letter-spacing: 2rpx;
          &::before {
            content: "*";
            color: red;
          }
        }
        &-desc {
          width: 100%;
          height: 200rpx;
          margin-top: 20rpx;
          border-radius: 20rpx;
          textarea {
            font-size: $uni-font-size-base;
            box-sizing: border-box;
            padding: 20rpx;
            width: 100%;
            height: 100%;
            border-radius: 20rpx;
            border: 1rpx solid $uni-border-color;
            &:hover {
              background-color: #f4f4f4;
            }
          }
        }
        &-image {
          width: 100%;
          height: 300rpx;
          margin-top: 20rpx;
          border-radius: 20rpx;
        }
      }
    }
    &-button {
      width: 100%;
      background-color: #ffffff;
      height: 160rpx;
      padding: 10rpx;
      padding-bottom: 40rpx;
      box-sizing: border-box;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 2;
      button {
        margin-top: 20rpx;
        width: 700rpx;
        border-radius: 50rpx;
      }
    }
  }
}
</style>
