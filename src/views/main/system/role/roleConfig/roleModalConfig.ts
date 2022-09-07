import { Iform } from '@/base-ui/form/type/type'
export const roleModalConfig: Iform = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  LabelWidth: '80px',
  ItemStyle: {},
  titles: '新建角色',
  ColLayout: {
    span: 24
  }
}
