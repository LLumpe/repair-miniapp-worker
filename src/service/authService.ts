import { requestGetTimUserSig } from "@/api/tim";
import templateMessageSettings from "@/config/templateMessage";
import { ActionTypes } from "@/enums/actionTypes";
import { MutationTypes } from "@/enums/mutationTypes";
import store from "@/store";
import {
  hideLoading,
  navigateTo,
  showLoading,
  showModalError,
  showToast,
} from "@/utils/helper";
import tim from "@/utils/tim";
import WebsocketService from "./websocketService";

let websocketService: WebsocketService | null = null;

const login = async (triggeredByButton = false) => {
  showLoading("登录中");
  await store.dispatch(ActionTypes.login);
  await getUserInfo(); //获取个人信息
  await requestLocationPermission(); // 申请定位权限
  // await loginTIM(); // 登录 IM

  if (store.getters.hasVolunteerInfo) {
    showToast("登录成功", "success");
    try {
      checkPermissions(triggeredByButton); // 检查权限
      // // 启动 WebSocket 服务
      // if (!websocketService) {
      //   websocketService = new WebsocketService();
      // }
      // websocketService.start();
      // 获取我的任务
      // store.dispatch(ActionTypes.getMyUncheckedMissions);
      // store.dispatch(ActionTypes.getMyMissions);
      // store.dispatch(ActionTypes.getMyAllMissions);
    } catch (e) {
      console.log(e);
    }
  } else {
    hideLoading();
    if (store.getters.userInfo.phone) {
      // 如果已绑定手机，则直接进入绑定个人信息页面
      navigateTo("/pages/register/index?step=2");
    } else {
      // 如果否则先绑定手机
      navigateTo("/pages/register/index");
    }
  }
};

const logout = async () => {
  showLoading("退出中");

  try {
    await store.dispatch(ActionTypes.logout);
    await store.dispatch(ActionTypes.clearCurrentMission);
    store.commit(MutationTypes.SET_MY_ALL_MISSIONS, []);
    // websocketService && websocketService.end();
    showToast("退出成功", "success");
  } catch (e) {
    hideLoading();
    console.log(e);
  }
};

const getUserInfo = async () => {
  try {
    await store.dispatch(ActionTypes.getUserInfo);
  } catch (e) {
    console.log(e);
  }
};

const getLocation = () => {
  return new Promise<UniApp.GetLocationSuccess>((resolve, reject) => {
    uni.getLocation({
      type: "gcj02",
      altitude: true,
      success: (data) => {
        console.log("location", data);
        resolve(data);
      },
      fail() {
        reject();
      },
    });
  });
};

const requestLocationPermission = () => {
  return new Promise<void>((resolve, reject) => {
    uni.authorize({
      scope: "scope.userLocation",
      success() {
        console.log("位置权限申请成功");
        getLocation();
        resolve();
      },
      fail() {
        showModalError("请授予本程序定位权限");
        reject();
      },
    });
  });
};

const checkPermissions = (triggeredByButton = false) => {
  return new Promise<void>((resolve, reject) => {
    uni.getSetting({
      withSubscriptions: true,
      success(res) {
        console.debug(res.subscriptionsSetting);
        if (
          !res.subscriptionsSetting.mainSwitch ||
          !res.subscriptionsSetting.itemSettings ||
          res.subscriptionsSetting.itemSettings[
            templateMessageSettings.tmplIds[0]
          ] !== "accept"
        ) {
          // navigateTo("/pages/requestSubscribeMessage/index");
        } else if (triggeredByButton) {
          // 如果用户已永久授权并通过点击登录按钮登录，则申请一次订阅权限
          try {
            uni.requestSubscribeMessage({
              tmplIds: templateMessageSettings.tmplIds,
            });
          } catch (e) {}
        }

        resolve();
      },
      fail() {
        reject();
      },
    });
  });
};

export const loginTIM = async () => {
  const uid = store.getters.userInfo.id;
  const userID = `volunteer_${uid}`;
  if (
    store.getters.tim.myInfo.userID &&
    store.getters.tim.myInfo.userID === userID
  ) {
    // 说明已经登录 IM，无需重复登录
    return;
  }
  const res = await requestGetTimUserSig();

  tim.login({
    userID,
    userSig: res.data.data,
  });
};

export default { login, logout, getUserInfo };
