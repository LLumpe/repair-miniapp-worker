import { repairOrder } from "@/api/types/models";
import { Module } from "vuex";
import { RepairOrder, RootState } from "../types";
import { MutationTypes } from "@/enums/mutationTypes";
import { ActionTypes } from "@/enums/actionTypes";
import {
  requestGetAllRepairOrder,
  requestGetAllRepairOrderByWorker,
} from "@/api/repairOrder";

const RepairOrder: Module<RepairOrder, RootState> = {
  state: {
    repairOrder: [],
  },

  mutations: {
    [MutationTypes.SET_MY_REPAIRORDERS]: (
      state,
      repairOrderList: typeof state.repairOrder
    ) => {
      state.repairOrder = repairOrderList;
    },
  },

  actions: {
    [ActionTypes.getRepairOrders]: ({ commit }) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const res = await requestGetAllRepairOrder();
          // console.log("res",res)
          if (res.data.result) {
            commit(MutationTypes.SET_MY_MISSIONS, res.data.result);
          }
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
    //获取维修师傅所有订单
    [ActionTypes.getRepairOrdersByWorker]: ({ commit }) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const res = await requestGetAllRepairOrderByWorker();
          // console.log("res",res)
          if (res.data.result) {
            commit(MutationTypes.SET_WORKER_REPAIRORDERS, res.data.result);
          }
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
    //获取维修师傅正在进行中的订单
    [ActionTypes.getWorkingRepairOrderByWorker]: ({ commit }) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const res = await requestGetAllRepairOrderByWorker({ state: 1 });
          // console.log("res",res)
          if (res.data.result) {
            commit(MutationTypes.SET_WORKER_REPAIRORDERS, res.data.result);
          }
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
    //获取维修师傅待确认的订单
    [ActionTypes.getUnconfirmedRepairOrderByWorker]: ({ commit }) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const res = await requestGetAllRepairOrderByWorker({ state: 2 });
          // console.log("res",res)
          if (res.data.result) {
            commit(MutationTypes.SET_WORKER_REPAIRORDERS, res.data.result);
          }
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
    //获取维修师傅已完成的订单
    [ActionTypes.getFinishedRepairOrderByWorker]: ({ commit }) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const res = await requestGetAllRepairOrderByWorker({ state: 3 });
          // console.log("res",res)
          if (res.data.result) {
            commit(MutationTypes.SET_WORKER_REPAIRORDERS, res.data.result);
          }
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
    //获取维修师傅已退单的订单
    [ActionTypes.getBackRepairOrderByWorker]: ({ commit }) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const res = await requestGetAllRepairOrderByWorker({ state: -10 });
          // console.log("res",res)
          if (res.data.result) {
            commit(MutationTypes.SET_WORKER_REPAIRORDERS, res.data.result);
          }
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
  },

  getters: {
    repairOrder: (state) => state.repairOrder,
  },
};

export default RepairOrder;
