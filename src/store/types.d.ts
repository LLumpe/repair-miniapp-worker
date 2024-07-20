import {
  Volunteer,
  Notice,
  Banner,
  Case,
  Face,
  repairOrder,
} from "@/api/types/models";
import Ws from "../utils/websocket";

export interface RootState {
  version?: string;
  user: UserState;
  announcement: AnnouncementState;
  location: LocationState;
  common: CommonState;
  mission: MissionState;
  websocket: WebsocketState;
  tim: TimState;
  repairOrder: repairOrder;
}

export interface UserState {
  logged: boolean;
  hasVolunteerInfo: boolean;
  userInfo?: null | Volunteer;
}

export interface AnnouncementState {
  announcements: Array<Notice>;
  banners: Array<Banner>;
}

export interface LocationState {
  location: {
    longitude: number;
    latitude: number;
  };
}

export interface CommonState {
  count: {
    onlineVolunteerNumber: number;
    totalVolunteerNumber: number;
    openingTaskNumber: number;
  };
}

export interface ICurrentMission {
  missionInfo: null | Case;
  teamMembers: Array<Volunteer>;
  onlineTeamMembers: Array<Volunteer>;
  faceRecognitionHistory: Array<Face>;
}

export interface MissionState {
  myMissions: Array<Case>;
  myMissionIDs: Set<number>;
  myUncheckedMissions: Array<Case>;
  myAllMissions: Array<Case>;
  currentMission: ICurrentMission;
}

export interface WebsocketState {
  ws: Ws | null;
}

export interface TimState {
  isSdkReady: boolean; // TIM SDK 初始化状态
  myInfo: any; // 个人信息
  allConversation: Array<any>; // 所有的conversation
  currentConversationID: string; // 当前聊天对话ID
  currentConversation: any; // 当前聊天对话信息
  currentMessageList: Array<any>; // 当前聊天消息列表
  unreadMessageNumber: number; // 当前聊天的未读消息计数
  nextReqMessageID: string; // 下一条消息标志
  isCompleted: boolean; // 当前会话消息是否已经请求完毕
  isLoading: boolean; // 是否正在请求
  groupIDsMap: Map<string, string>; // 群名 -> 群 ID 的 Map
}

export interface RepairOrder {
  workerRepairOrder: Array<repairOrder>; //维修订单
}
