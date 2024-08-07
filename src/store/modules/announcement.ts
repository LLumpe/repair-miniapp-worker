/*
 * @Author: LLumpe LLumpe@163.com
 * @Date: 2024-07-09 03:18:08
 * @LastEditors: LLumpe LLumpe@163.com
 * @LastEditTime: 2024-08-08 01:02:22
 * @FilePath: \repair-miniapp-worker\src\store\modules\announcement.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
/*
 * @Author: LLumpe LLumpe@163.com
 * @Date: 2024-07-09 03:18:08
 * @LastEditors: LLumpe LLumpe@163.com
 * @LastEditTime: 2024-07-28 21:57:28
 * @FilePath: \repair-miniapp-worker\src\store\modules\announcement.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from "vuex";
import { AnnouncementState, RootState } from "../types";
import { MutationTypes } from "@/enums/mutationTypes";
import { ActionTypes } from "@/enums/actionTypes";
import {
  requestGetAnnouncements,
  requestGetBanners,
  requestGetLeaderboard,
} from "@/api/announcement";

// 获取当前日期
const now = new Date();
// 将日期格式化为 "YYYY-MM-DD"
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const Announcement: Module<AnnouncementState, RootState> = {
  state: {
    announcements: [],
    banners: [],
    leaderboardReceive: [],
    leaderboardResponse: [],
    leaderboardCancel: [],
  },

  mutations: {
    [MutationTypes.SET_ANNOUNCEMENT_LIST]: (
      state,
      announcements: typeof state.announcements
    ) => {
      state.announcements = announcements;
      console.debug(state);
    },
    [MutationTypes.SET_BANNER_LIST]: (state, banners: typeof state.banners) => {
      state.banners = banners;
      console.debug(state);
    },
    [MutationTypes.SET_LEADERBOARDRECEIVE]: (
      state,
      leaderboardReceive: typeof state.leaderboardReceive
    ) => {
      state.leaderboardReceive = leaderboardReceive;
      console.debug(state);
    },
    [MutationTypes.SET_LEADERBOARDRESPONSE]: (
      state,
      leaderboardResponse: typeof state.leaderboardResponse
    ) => {
      state.leaderboardResponse = leaderboardResponse;
      console.debug(state);
    },
    [MutationTypes.SET_LEADERBOARDCANCEL]: (
      state,
      leaderboardCancel: typeof state.leaderboardCancel
    ) => {
      state.leaderboardCancel = leaderboardCancel;
      console.debug(state);
    },
  },

  actions: {
    [ActionTypes.getAnnouncements]: ({ commit }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await requestGetAnnouncements({
            sceneType: "volunteer_notice",
          });
          if (res.data && res.data.result) {
            commit(MutationTypes.SET_ANNOUNCEMENT_LIST, res.data.result);
          }
          resolve(res.data.result);
        } catch (e) {
          reject(e);
        }
      });
    },
    [ActionTypes.getBanners]: ({ commit }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await requestGetBanners();
          if (res.data && res.data.result) {
            commit(MutationTypes.SET_BANNER_LIST, res.data.result);
          }
          resolve(res.data.result);
        } catch (e) {
          reject(e);
        }
      });
    },
    [ActionTypes.getLeaderboardReceive]: ({ commit }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const firstDayOfYear = new Date(now.getFullYear(), now.getMonth(), 1);
          console.log("今年的第一天:", formatDate(firstDayOfYear));
          const res = await requestGetLeaderboard({
            startAt: formatDate(firstDayOfYear),
            orderColumn: "finish_score",
            orderWay: "desc",
          });
          console.log("res", res);
          if (res.data && res.data.result) {
            commit(MutationTypes.SET_LEADERBOARDRECEIVE, res.data.result);
          }
          resolve(res.data.result);
        } catch (e) {
          reject(e);
        }
      });
    },
    [ActionTypes.getLeaderboardResponse]: ({ commit }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const firstDayOfYear = new Date(now.getFullYear(), now.getMonth(), 1);
          console.log("今年的第一天:", formatDate(firstDayOfYear));
          const res = await requestGetLeaderboard({
            startAt: formatDate(firstDayOfYear),
            orderColumn: "response_duration",
            orderWay: "asc",
          });
          console.log("res", res);
          if (res.data && res.data.result) {
            commit(MutationTypes.SET_LEADERBOARDRESPONSE, res.data.result);
          }
          resolve(res.data.result);
        } catch (e) {
          reject(e);
        }
      });
    },
    [ActionTypes.getLeaderboardCancel]: ({ commit }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const firstDayOfYear = new Date(now.getFullYear(), now.getMonth(), 1);
          console.log("今年的第一天:", formatDate(firstDayOfYear));
          const res = await requestGetLeaderboard({
            startAt: formatDate(firstDayOfYear),
            orderColumn: "cancel_rate",
            orderWay: "asc",
          });
          console.log("res", res);
          if (res.data && res.data.result) {
            commit(MutationTypes.SET_LEADERBOARDCANCEL, res.data.result);
          }
          resolve(res.data.result);
        } catch (e) {
          reject(e);
        }
      });
    },
  },

  getters: {
    announcements: (state) => state.announcements,
    banners: (state) => state.banners,
    leaderboardReceive: (state) => state.leaderboardReceive,
    leaderboardResponse: (state) => state.leaderboardResponse,
    leaderboardCancel: (state) => state.leaderboardCancel,
  },
};

export default Announcement;
