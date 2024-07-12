import { createStore } from "vuex";

import user from "./modules/user";
import announcement from "./modules/announcement";
import location from "./modules/location";
import common from "./modules/common";
import mission from "./modules/mission";
import websocket from "./modules/websocket";
import tim from "./modules/tim";
import repairOrder from "./modules/repairOrder";

export default createStore({
  modules: {
    user,
    announcement,
    location,
    common,
    mission,
    websocket,
    tim,
    repairOrder,
  },
});
