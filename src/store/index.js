import Vue from "vue"
import Vuex from "vuex"

import state from "./states"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

// vuex를 사용하기 위해 먼저 아래 코드를 호출한다.
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
