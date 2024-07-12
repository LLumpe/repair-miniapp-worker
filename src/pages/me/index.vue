<template>
  <view class="top top--title" :style="{ paddingTop: `${menuTop}px` }">
    <view
      class="background background--red"
      :style="{
        height: `calc(${menuTop}px + 500rpx)`,
        clipPath: `circle(calc(${menuTop}px + 1600rpx) at 375rpx calc(-${menuTop}px + -1100rpx))`,
      }"
    />
    <view class="title" :style="{ lineHeight: `${menuHeight}px` }"> 我的 </view>
    <view class="box">
      <volunteer-information-box :status="topStatus" :user-info="myInfo" />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import VolunteerInformationBox from "@/components/VolunteerInformationBox/index.vue";
import { useStore } from "vuex";
import authService from "@/service/authService";
import { useTop } from "@/uses/useTop";
// import store from "@/store";
// import { ActionTypes } from "@/enums/actionTypes";

export default defineComponent({
  components: { VolunteerInformationBox },
  setup() {
    const store = useStore();

    const logged = computed(() => {
      console.log("logged", store.getters.logged);
      return store.getters.logged;
    });

    // const handleLogout = () => {
    //   authService.logout();
    // };

    const topStatus = computed(() => {
      console.log("login?", logged.value ? "me" : "unlogin");
      return logged.value ? "me" : "unlogin";
    });

    const myInfo = computed(() => {
      return store.getters.userInfo;
    });

    return { ...useTop(), logged, topStatus, myInfo };
  },
  // onShow() {
  //   store.dispatch(ActionTypes.getMyAllMissions);
  // },
});
</script>

<style lang="scss" scoped>
.actions {
  // margin-top: 60px;
  text-align: center;
  margin-bottom: 60rpx;
  box-sizing: border-box;
}

.top--title {
  .box {
    margin-top: 80rpx;
  }
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 750rpx;
  height: 432rpx;
  clip-path: circle(700rpx at 375rpx -250rpx);
  z-index: -1;

  &--red {
    background-image: linear-gradient(
      to right,
      #09c46e,
      #06be6c,
      #03b96b,
      #02b369,
      #01ae67
    );
  }
}

.title {
  font-size: $uni-font-size-xxl;
  color: #ffffff;
  margin-left: 39rpx;
}
</style>
