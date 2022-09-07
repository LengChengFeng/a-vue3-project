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
      label: '商品名称',
      field: 'name',
      placeholder: '请输入用户名',
      type: 'input'
    },
    {
      field: 'enable',
      type: 'select',
      label: '商品状态',
      placeholder: '请选择商品状态',
      options: [
        { title: '启用', value: 1 },
        { title: '禁用', value: 0 }
      ]
    }
  ],
  LabelWidth: '80px',
  ItemStyle: {
    padding: '10px 40px'
  }
}
