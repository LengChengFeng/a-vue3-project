import getData from '../index'
import { IgetPageList } from '@/store/system/type/type'
export function getPageList(url: string, queryInfo: any) {
  return getData.post<IgetPageList>({
    url: url,
    data: queryInfo
  })
}
//删除
export function deletePageData(url: string) {
  return getData.delete<IgetPageList>({
    url: url
  })
}
//新建
export function createPageData(url: string, newData: any) {
  return getData.post<IgetPageList>({
    url: url,
    data: newData
  })
}

//编辑
export function editPageData(url: string, editData: any) {
  return getData.patch<IgetPageList>({
    url: url,
    data: editData
  })
}
