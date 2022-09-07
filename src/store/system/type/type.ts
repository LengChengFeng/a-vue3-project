export interface Isystem {
  userCount: number
  userList: any[]
  roleCount: number
  roleList: any[]
  goodsCount: number
  goodsList: any[]
  menuCount: number
  menuList: any[]
}

export interface IgetPageList<T = any> {
  code: number
  data: T
}
