import http from "@/utils/request";
import { ResponseData, JavaList, repairOrder } from "./types/models";
/**
 * 分页获取所有维修订单
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
    url: `api/repairOrder/page`,
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

/**
 * 接受订单
 *
 * @return {*}
 */
export const requestTakeRepairOrder = (data: any) => {
  return http.request({
    url: `/api/repairOrder/receive`,
    method: "POST",
    data: data,
    params: {},
    custom: { noAuth: true },
  });
};

/**
 * 维修师傅完成订单
 *
 * @return {*}
 */
export const requestWorkerFinishOrder = (data: any) => {
  return http.request({
    url: `/api/repairOrder/finish`,
    method: "POST",
    data: data,
    params: {},
    custom: { noAuth: true },
  });
};
