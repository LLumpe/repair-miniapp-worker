import { repairOrder } from "@/api/types/models";
import { Module } from "vuex";
import { RepairOrder, RootState } from "../types";
import { MutationTypes } from "@/enums/mutationTypes";
import { ActionTypes } from "@/enums/actionTypes";
import { requestGetAllRepairOrderByWorker } from "@/api/repairOrder";

const RepairOrder: Module<RepairOrder, RootState> = {
  state: {
    workerRepairOrder: [],
  },

  mutations: {
    [MutationTypes.SET_MY_REPAIRORDERS]: (
      state,
      workerRepairOrder: typeof state.workerRepairOrder
    ) => {
      state.workerRepairOrder = workerRepairOrder;
    },
  },

  actions: {
    [ActionTypes.getRepairOrders]: ({ commit }) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const res = await requestGetAllRepairOrderByWorker();
          if (res.data.result) {
            commit(MutationTypes.SET_MY_REPAIRORDERS, res.data.result.records);
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
    workerRepairOrder: (state) => state.workerRepairOrder,
  },
};

export default RepairOrder;
