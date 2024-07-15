import http from "@/utils/request";
import { Banner, JavaList, Notice, ResponseData } from "./types/models";

/**
 * 上传维修图片
 *
 * @return {*}
 */
export const requestUploadImage = (filePath: string) => {
  return http.upload<ResponseData<string>>(`volunteer/photo`, {
    filePath,
    name: "photo",
  });
};

/**
 * 获取维修师傅维修订单
 *
 * @return {*}
 */
export const requestGetAllWorkerRepairOrder = (
  params?: {
    /* 当前页码 */
    current?: number;
    /* 页码数据量 */
    pageSize?: number;
    /* 查询开始日期 */
    startAt?: string;
    /* 查询结束日期 */
    endAt?: string;
    [key: string]: unknown;
  },
  options?: { [key: string]: any }
) => {
  return http.request({
    url: `/api/repairOrder/volunteer/my`,
    method: "GET",
    data: {},
    params: params,
    custom: { noAuth: true },
  });
};
