<template>
  <view class="body safe-area-inset-bottom">
    <MissionInformationCom :data="repairOrderInfo" v-if="repairOrderInfo" />
  </view>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  reactive,
  Ref,
  ref,
} from "vue";
import MissionInformationCom from "@/components/MissionInformation/index.vue";
import { requestGetAllRepairOrderById } from "@/api/repairOrder";
import { Case } from "@/api/types/models";
import { requestGetCases } from "@/api/mission";
import { useStore } from "vuex";
import UButton from "@/components/UButton/index.vue";
import { navigateTo, showToast } from "@/utils/helper";
import { ActionTypes } from "@/enums/actionTypes";
import UModal from "@/components/UModal/index.vue";
import DataCheckbox from "@/components/DataCheckbox/index.vue";
import { repairOrder } from "@/api/types/models";
// const caseInfo: Ref<Case | null> = ref({});
const repairOrderInfo: Ref<repairOrder | {}> = ref({});

const isLoading = ref(true);

//获取维修报单详细信息
const getRepairOrderInfo = async (id: number) => {
  uni.showNavigationBarLoading();
  isLoading.value = true;
  try {
    const res = await requestGetAllRepairOrderById({ id });
    if (res.data.result) {
      console.log("data", res.data.result);
      const newData = {
        ...res.data.result,
        repairEquipmentContent: JSON.parse(
          res.data.result.repairEquipmentContent
        ),
      };
      console.log("Data", newData);
      repairOrderInfo.value = newData;
    }
  } catch (e) {
    console.log(e);
  }
  uni.hideNavigationBarLoading();
  isLoading.value = false;
};

const useTask = () => {
  const equipmentStatusRange = [
    {
      value: 1,
      text: "齐全",
    },
    {
      value: 2,
      text: "不齐全",
    },
  ];

  const trafficStatusRange = [
    {
      value: "驾车",
      text: "驾车",
    },
    {
      value: "骑行",
      text: "骑行",
    },
    {
      value: "步行",
      text: "步行",
    },
  ];

  const store = useStore();
  const showAcceptModal = ref(false);

  const acceptForm = reactive({
    equipment: 1,
    traffic: "驾车",
  });

  const handleAccept = async () => {
    try {
      // await store.dispatch(ActionTypes.acceptMission, {
      //   item: repairOrderInfo.value,
      //   equipment: acceptForm.equipment,
      //   traffic: acceptForm.traffic,
      // });
      showToast("接受成功", "success");
    } catch (e) {
      console.log(e);
    }
    showAcceptModal.value = false;
  };

  return {
    showAcceptModal,
    handleAccept,
    acceptForm,
    equipmentStatusRange,
    trafficStatusRange,
  };
};

export default defineComponent({
  components: { MissionInformationCom, UButton, UModal, DataCheckbox },
  setup(props) {
    const store = useStore();
    // 我加入的任务的 id 集合
    const myMissionIDs: ComputedRef<Set<number>> = computed(() => {
      return store.getters.myMissionIDs;
    });
    // 判断是否已加入该任务
    const checkIsInMission = (id: number) => {
      return myMissionIDs.value.has(id);
    };

    const handleClickEnterMission = () => {
      // navigateTo("/pages/mission/index", { id: caseInfo?.value?.id });
    };

    return {
      repairOrderInfo,
      checkIsInMission,
      handleClickEnterMission,
      ...useTask(),
    };
  },
  onLoad(option) {
    if (option && option.id) {
      console.log("option", option, option.id);
      getRepairOrderInfo(option.id);
    }
  },
});
</script>

<style lang="scss" scoped>
.body {
  padding-bottom: 40rpx;
}

.action {
  margin-top: 30rpx;
  display: flex;
  justify-content: center;
}
</style>
