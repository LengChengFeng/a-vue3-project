import getData from '../index'
interface Iaccount {
  name: string
  password: string
}
//控制登录成功的
interface IdateType<T = any> {
  code: string
  data: T
}
//登录成功后data里面的数据
interface IloginResult {
  id: number
  name: string
  token: string
}
//用户信息
enum LoginApI {
  AcountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/' // 用法: role/1/menu
}
//登录的请求
export function accountLoginRequest(account: Iaccount) {
  return getData.post<IdateType<IloginResult>>({
    url: LoginApI.AcountLogin,
    data: account
  })
}
//获取用户数据
export function getUserInfoByid(id: number) {
  return getData.get<IdateType>({
    url: LoginApI.LoginUserInfo + id
  })
}

//用户权限
export function requestUserMenuByRoleId(id: number) {
  return getData.get<IdateType>({
    url: LoginApI.UserMenus + id + '/menu'
  })
}
