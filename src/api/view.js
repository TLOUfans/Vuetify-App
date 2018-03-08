import {FormData} from './utils'

export const GetDataJson = (params) => {
  const postParams = {
    datasetCode: params.datasetCode || '',
    pageIndex: params.pageindex || 0,
    extparams: JSON.stringify(params.extparams || ''),
    ignorefilter: params.ignorefilter || '1',
    where: params.where || ''
  }
  return FormData.post(`/NPMS/GetDataJson`, postParams)
    .then(res => res.data.data[params.datasetCode])
    .catch(err => ({success: false, data: [], message: err}))
}

export const GetDataAndSet = (params) => {
  const postParams = {
    queryParams: JSON.stringify(params.queryParams),
    setParams: JSON.stringify(params.setParams || ''),
    keyWord: params.keyWord,
    defaultValues: JSON.stringify(params.defaultValues || '')
  }
  const url = String(params.type).toLowerCase() === 'bo' ? `/NPMS/GetDataAndSetByBO` : `/NPMS/GetDataAndSet`
  return FormData.post(url, postParams)
    .then(res => res.data)
}

export const GetDatasAndSet = (params) => {
  const postParams = params.map(v => {
    return {
      queryParams: JSON.stringify(v.queryParams),
      setParams: JSON.stringify(v.setParams || ''),
      keyWord: v.keyWord,
      defaultValues: JSON.stringify(v.defaultValues || '')
    }
  })
  return FormData.post(`/NPMS/GetDatasAndSet`, postParams)
    .then(res => res.data)
}

export default {
  GetDataJson,
  GetDataAndSet,
  GetDatasAndSet
}
