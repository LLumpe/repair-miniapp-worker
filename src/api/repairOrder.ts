import http from "@/utils/request";
import { ResponseData, JavaList, repairOrder } from "./types/models";
/**
 * 获取所有维修订单
 *
 * @return {*}
 */
export const requestGetAllRepairOrder = (
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
    url: `api/repairOrder`,
    method: "GET",
    params: params,
    data: {},
    custom: { noAuth: true },
  });
};

/**
 * 通过维修订单ID获取所有维修订单
 *
 * @return {*}
 */
export const requestGetAllRepairOrderById = (params: { id: number }) => {
  return http.request({
    url: `api/repairOrder/id`,
    method: "GET",
    data: {},
    params: params,
    custom: { noAuth: true },
  });
};

/**
 * 获取当前维修师傅的维修订单
 *
 * @return {*}
 */
export const requestGetAllRepairOrderByWorker = ( 
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
options?: { [key: string]: any }) => {
  return http.request({ 
    url: `/api/repairOrder/volunteer/my`,
    method: "GET",
    data: {},
    params: params,
    custom: { noAuth: true },
  });
};


