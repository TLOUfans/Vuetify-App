import {FormData, EvalScript} from './utils'
import {Base64} from '../utils'

/**
 * 获取配置文件
 * */
export const GetFormConfig = (formId, type, keyValue) => {
  return FormData.get(`/Form/Init/${formId}/${type || 'view'}/${keyValue || ''}`)
    .then(res => {
      EvalScript(res.data)
      return window.formconfig
    })
    .catch(err => {
      return {
        success: false,
        err: err
      }
    })
}

/**
 * 获取窗体数据
 * */
export const PageLoad = (params) => {
  const postParams = {
    KeyWord: params.KeyWord,
    KeyWordType: params.KeyWordType || 'BO',
    sort: params.sort || '',
    select: '',
    index: params.index || '0',
    size: params.size || '0',
    swhere: Base64.encode(params.swhere || ' 1=1 '),
    extparams: `eyJlbmNvZGVzd2hlcmUiOiJ0cnVlIn0=`
  }
  return FormData.post(`/Form/GridPageLoad`, postParams)
    .then(res => {
      return JSON.parse(res.data.data.value || [])
    })
    .catch(err => {
      return {
        success: false,
        err: err
      }
    })
}

/**
 * 获取表单数据
 * */
export const FormLoad = (params) => {
  const postParams = {
    KeyWord: params.KeyWord,
    KeyWordType: params.KeyWordType || '',
    keyvalue: params.KeyValue,
    select: params.select || '',
    formstate: params.FormState || 'view',
    _: Math.random(123).toString(8).split('.')[1]
  }
  return FormData.get(`/Form/FormLoad`, postParams)
    .then(res => JSON.parse(res.data.data.value))
}

/**
 * 获取窗体配置文件 并根据配置文件获取数据
 * */
export const GetPageData = async (formId, openType, params) => {
  const formconfig = await GetFormConfig(formId, openType || 'view')
  const joindata = formconfig.config.joindata
  const postParams = {
    KeyWord: joindata.KeyWord,
    KeyWordType: joindata.KeyWordType,
    swhere: joindata.swhere
  }
  Object.keys(params || {}).forEach(key => {
    postParams[key] = params[key]
  })
  const data = await PageLoad(postParams)
  return {
    data,
    formconfig
  }
}

/**
 * 获取表单配置文件 并根据配置文件获取数据
 * */
export const GetFormData = async (formId, openType, keyValue, params) => {
  const formconfig = await GetFormConfig(formId, openType || 'view', keyValue)
  const joindata = formconfig.config.joindata
  const postParams = {
    KeyWord: joindata.KeyWord,
    KeyWordType: joindata.KeyWordType,
    swhere: joindata.swhere,
    KeyValue: keyValue
  }
  Object.keys(params || {}).forEach(key => {
    postParams[key] = params[key]
  })
  const data = await FormLoad(postParams)
  return {
    data,
    formconfig
  }
}

/**
 * 保存传入数据状态 =》 增删改
 * */
export const SaveForm = async(formId, postFormData) => {
  let jdata = {
    formId: formId,
    encode: 'r4',
    Params: Base64.encode(
      JSON.stringify({
        IsRegHuman: '1',
        IsWorkFlowHuman: '1'
      })
    ),
    jsonData: encodeURIComponent(
      Base64.rc4(
        JSON.stringify(postFormData)
      )
    )
  }
  return FormData.post(`/Form/SaveWebForm`, jdata)
    .then(res => res.data)
}

export default {
  GetFormConfig,
  PageLoad,
  FormLoad,
  GetPageData,
  GetFormData,
  SaveForm
}
