import { Iform } from '@/base-ui/form/type/type'
export const searchInputConfig: Iform = {
  formItems: [
    {
      label: 'id',
      field: 'id',
      placeholder: '请输入id',
      type: 'input'
    },
    {
      label: '用户名',
      field: 'name',
      placeholder: '请输入用户名',
      type: 'input'
    },
    {
      type: 'datepicker',
      field: 'creatTime',
      label: '创建时间',
      othersOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  LabelWidth: '80px',
  ItemStyle: {
    padding: '10px 40px'
  }
}
