import { main, page, message, view, file } from "@/api/index"

const types = {
  FORMCONFIG_MUTATION = 'FORMCONFIG_MUTATION',
  SESSIONDATA_MUTATION = 'SESSIONDATA_MUTATION',
  FORMSTATE_MUTATION = 'FORMSTATE_MUTATION',
  FORMID_MUTATION = 'FORMID_MUTATION',
  KEYVALUE_MUTATION = 'KEYVALUE_MUTATION',
}

const state = {
  formconfig: {},
  sessiondata: {},
  FormState: 'edit',
  formId: '',
  KeyValue,
};

const mutations = {
  [FORMCONFIG_MUTATION](state, payload) {
    state.formconfig = payload.formconfig;
  },
  [SESSIONDATA_MUTATION](state, payload) {
    state.sessiondata = payload.sessiondata;
  },
  [FORMSTATE_MUTATION](state, payload) {
    state.FormState = 'edit';
  },
  [FORMID_MUTATION](state, payload) {
    state.formId = payload.formId;
  },
  [SESSIONDATA_MUTATION](state, payload) {
    state.KeyValue = '';
  },
};

const actions = {
  getFormConfigAndSessiondata({ commit, state }) {
    page.GetFormConfig(state.formId, state.FormState, state.KeyValue).then(res => {
      commit(types.FORMCONFIG_MUTATION, res.data.formconfig);
      commit(types.SESSIONDATA_MUTATION, res.data.sessiondata);
    });
  },
};

const getters = {
  formConfig = state => state.formconfig,
  sessiondata = state => state.sessiondata,
  formId = state => state.formId,
  FormState = state => state.FormState,
  KeyValue = state => state.KeyValue,
};

export default {
  state,
  getters,
  actions,
  mutations,
}

