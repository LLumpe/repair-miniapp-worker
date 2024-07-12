<template>
  <view>
    <UMap
      width="100%"
      height="100vh"
      map-config="mapSettings"
      :enable-traffic="false"
      :currentLocation="currentLocation"
      ref="map"
    />
  </view>
</template>

<script lang="ts">
import UMap from "@/components/UMap/index.vue";
import {
  computed,
  ComputedRef,
  defineComponent,
  Ref,
  ref,
  reactive,
} from "vue";
import mapSettings from "@/config/map";
export default defineComponent({
  components: { UMap },
  props: {},

  setup(props) {
    //当前位置信息
    const currentLocation = reactive({ latitude: 0, longitude: 0 });
    //获取位置信息
    const getLocation = () => {
      return new Promise((resolve, reject) => {
        uni.getLocation({
          type: "gcj02",
          altitude: true,
          success: (data) => {
            console.log("location", data);
            [currentLocation.latitude, currentLocation.longitude] = [
              data.latitude,
              data.longitude,
            ];
            resolve("获取位置成功");
          },
          fail() {
            reject();
          },
        });
      });
    };
    return { ...getLocation(), currentLocation };
  },
});
</script>

<style></style>
