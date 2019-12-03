import Vue from 'vue'
import Vuex from 'vuex'

import navigator from '@/_store/navigator';


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    navigator
  },
  strict: debug,

})