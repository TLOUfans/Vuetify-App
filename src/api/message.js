import {FormData} from './utils'

// 消息
export const GetOwnMes = () => {
  return FormData.post(`/Message/MyNotifyInfos`, {
    types: 'infos,actived,join',
    index: 0,
    size: 8,
    swhere: ''
  })
    .then(res => res.data)
}
// 审批消息
export const GetWorkFlowMes = () => {
  return FormData.post(`/WorkFlow/MyWorkInfos`, {
    types: 'infos,actived,join',
    index: 0,
    size: 8,
    swhere: ''
  })
    .then(res => res.data)
}

export default {
  GetOwnMes,
  GetWorkFlowMes
}
