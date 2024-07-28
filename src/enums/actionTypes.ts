/*
 * @Author: LLumpe LLumpe@163.com
 * @Date: 2024-07-09 03:18:08
 * @LastEditors: LLumpe LLumpe@163.com
 * @LastEditTime: 2024-07-28 21:55:16
 * @FilePath: \repair-miniapp-worker\src\enums\actionTypes.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
export enum ActionTypes {
  login = "login",
  logout = "logout",
  getUserInfo = "getUserInfo",
  getAnnouncements = "getAnnouncements",
  getBanners = "getBanners",
  getLocation = "getLocation",
  getCount = "getCount",
  getMyMissions = "getMyMissions",
  getMyUncheckedMissions = "getMyUncheckedMissions",
  getMyAllMissions = "getMyAllMissions",
  acceptMission = "acceptMission",
  refuseMission = "refuseMission",
  initCurrentMission = "initCurrentMission",
  clearCurrentMission = "clearCurrentMission",
  getCurrentMissionInfo = "getCurrentMissionInfo",
  getCurrentMissionMembers = "getCurrentMissionMembers",
  getCurrentMissionFaceRecognitionHistories = "getCurrentMissionFaceRecognitionHistories",
  onMessageEvent = "onMessageEvent",
  getMessageList = "getMessageList",
  checkoutConversation = "checkoutConversation",
  getRepairOrders = "getRepairOrders",
  getLeaderboardReceive = "getLeaderboardReceive",
  getLeaderboardResponse = "getLeaderboardResponse",
  getLeaderboardCancel = "getLeaderboardCancel",
}
