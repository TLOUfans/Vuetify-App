import {PageLoad} from './page'

export const GetDocFile = ({index, size, humId}) => {
  const postParams = {
    KeyWord: 'DocFile',
    KeyWordType: 'BO',
    select: 'Id,Name,FileExt,UpdDate',
    swhere: ` RegHumId = '${humId}' `,
    sort: 'UpdDate desc',
    index: index,
    size: size
  }
  return PageLoad(postParams)
    .then(res => res)
}

export default {
  GetDocFile
}
