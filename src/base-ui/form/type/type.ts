type IInputType = 'input' | 'password' | 'select' | 'datepicker'
interface IselectOptions {
  value: any
  title: string
}
//选择时间的配置
interface Itime {
  startPlaceholder: string
  endPlaceholder: string
  type: string
}
export interface IFormItem {
  type: IInputType
  label: string
  field: string
  placeholder?: any
  options?: IselectOptions[]
  othersOptions?: Itime
  isHidden?: boolean
}

export interface Iform {
  formItems: IFormItem[]
  LabelWidth?: string
  ItemStyle?: any
  ColLayout?: any
  rules?: object
  titles?: string
}
