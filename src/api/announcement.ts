/*
 * @Author: LLumpe LLumpe@163.com
 * @Date: 2024-07-09 03:18:08
 * @LastEditors: LLumpe LLumpe@163.com
 * @LastEditTime: 2024-07-27 03:16:12
 * @FilePath: \repair-miniapp-worker\src\api\announcement.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import http from "@/utils/request";
import { Banner, JavaList, Notice, ResponseData } from "./types/models";

/**
 * 获取公告列表
 *
 * @return {*}
 */
export const requestGetAnnouncements = (params: { [key: string]: string }) => {
  return http.request<ResponseData<JavaList<Notice>>>({
    url: `api/richText`,
    method: "GET",
    params: params,
    data: {},
    custom: { noAuth: true },
  });
};

/**
 * 获取特定公告
 *
 * @param {number} id
 * @return {*}
 */
export const requestGetAnnouncementByID = (id: number) => {
  return http.request<ResponseData<JavaList<Notice>>>({
    url: `notice`,
    method: "GET",
    params: { roleId: 2, id },
    data: {},
    custom: { noAuth: true },
  });
};

/**
 * 获取 Banner 列表
 *
 * @return {*}
 */
export const requestGetBanners = () => {
  return http.request<ResponseData<JavaList<Banner>>>({
    url: `api/banner`,
    method: "GET",
    params: { type: 2 },
    data: {},
    custom: { noAuth: true },
  });
};

/**
 * 获取 排行榜 列表
 *
 * @return {*}
 */
export const requestGetLeaderboard = (data: { [key: string]: string }) => {
  return http.request<ResponseData<JavaList<Banner>>>({
    url: `api/repair/data`,
    method: "POST",
    params: {},
    data: data,
    custom: { noAuth: true },
  });
};
