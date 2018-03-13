import { main, page, message, view, file } from "@/api/index"

const types = {
  FORMCONFIG_MUTATION: 'FORMCONFIG_MUTATION', // 提交表单配置
  SESSIONDATA_MUTATION: 'SESSIONDATA_MUTATION', // 提交session
  FORMSTATE_MUTATION: 'FORMSTATE_MUTATION', // 提交表单状态 add/edit/view
  FORMID_MUTATION: 'FORMID_MUTATION', // 提交表单ID
  KEYVALUE_MUTATION: 'KEYVALUE_MUTATION', // 提交记录ID
  FORMTITLE_MUTATION: 'FORMTITLE_MUTATION', // 提交表单标题
  KEYWORD_MUTATION: 'KEYWORD_MUTATION', // 提交关键字
  MENUOPTION_MUTATION: 'MENUOPTION_MUTATION', // 提交菜单配置
}

const state = {
  formconfig: {}, // 表单配置
  sessiondata: {}, // session
  FormState: '', // 表单状态 add/edit/view
  formId: '', // 表单ID
  KeyValue: '', // 记录ID
  formTitle: '', // 表单标题
  KeyWord: '', // 关键字
  menuOption: {}, // 菜单配置
};

const mutations = {
  [types.FORMCONFIG_MUTATION](state, formconfig) {
    state.formconfig = formconfig;
  },
  [types.SESSIONDATA_MUTATION](state, sessiondata) {
    state.sessiondata = sessiondata;
  },
  [types.FORMSTATE_MUTATION](state, FormState) {
    state.FormState = FormState;
  },
  [types.FORMID_MUTATION](state, formId) {
    state.formId = formId;
  },
  [types.KEYVALUE_MUTATION](state, KeyValue) {
    state.KeyValue = KeyValue;
  },
  [types.FORMTITLE_MUTATION](state, formTitle) {
    state.formTitle = formTitle;
  },
  [types.KEYWORD_MUTATION](state, KeyWord) {
    state.KeyWord = KeyWord;
  },
  [types.MENUOPTION_MUTATION](state, menuOption) {
    state.menuOption = menuOption;
  },
};

const actions = {
  getFormConfig({ commit, state }) {
    return new Promise((resolve, reject) => {
      page.GetFormConfig(state.formId, state.FormState, state.KeyValue).then(res => {
        commit(types.FORMCONFIG_MUTATION, res.config);
        commit(types.SESSIONDATA_MUTATION, res.sessiondata);
        commit(types.FORMSTATE_MUTATION, res.config.FormState);
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  },
};

const getters = {
  formConfig: state => state.formconfig,
  sessiondata: state => state.sessiondata,
  formId: state => state.formId,
  FormState: state => state.FormState,
  KeyValue: state => state.KeyValue,
  formTitle: state => state.formTitle,
  KeyWord: state => state.KeyWord,
  menuOption: state => state.menuOption,
};

export default {
  state,
  getters,
  actions,
  mutations,
}

