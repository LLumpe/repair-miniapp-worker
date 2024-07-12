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
  getRepairOrdersByWorker = 'getRepairOrdersByWorker',
  getWorkingRepairOrderByWorker = 'getWorkingRepairOrderByWorker',//获取正在进行中的订单
  getUnconfirmedRepairOrderByWorker = 'getUnconfirmedRepairOrderByWorker',//获取待确认的订单
  getFinishedRepairOrderByWorker = 'getFinishedRepairOrderByWorker',//获取已完成的订单
  getBackRepairOrderByWorker = 'getBackRepairOrderByWorker',//获取退单的订单

}
