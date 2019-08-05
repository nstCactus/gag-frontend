/**
 * @author nstCactus
 * @date 12/01/2018 10:28
 */

import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {RootState} from '@/store/types';
import {authenticationVuexModule} from '@/store/modules/authentication';
import {cartVuexModule} from '@/store/modules/cart';
import {menuVuexModule} from '@/store/modules/menu';
import {currentSaleVuexModule} from '@/store/modules/current-sale';
import createPersistedState from 'vuex-persistedstate';
import cartStorage from '@/store/storage/cart-storage';
import sessionCookieStorage from '@/store/storage/session-cookie-storage';

Vue.use(Vuex);

export const MODULES_NAMES = {
  authentication: 'authentication',
  cart:           'cart',
  menu:           'menu',
  currentSale:    'currentSale',
};

const isDebug = process.env.NODE_ENV !== 'production';

const store: StoreOptions<RootState> = {
  strict:  isDebug,
  plugins: [
    createPersistedState({
      paths:   ['cart'],
      storage: cartStorage,
    }),

    createPersistedState({
      paths:   ['authentication'],
      storage: sessionCookieStorage,
    }),
  ],
  modules: {
    [MODULES_NAMES.authentication]: authenticationVuexModule,
    [MODULES_NAMES.cart]:           cartVuexModule,
    [MODULES_NAMES.menu]:           menuVuexModule,
    [MODULES_NAMES.currentSale]:    currentSaleVuexModule,
  },
};

export default new Vuex.Store<RootState>(store);
