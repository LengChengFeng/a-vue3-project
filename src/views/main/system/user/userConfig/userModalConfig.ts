import { Iform } from '@/base-ui/form/type/type'
export const userModalConfig: Iform = {
  formItems: [
    {
      label: '用户名',
      field: 'name',
      placeholder: '请输入用户名',
      type: 'input'
    },
    {
      label: '真实姓名',
      field: 'realname',
      placeholder: '请输入姓名',
      type: 'input'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: true
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '选择部门',
      placeholder: '请选择部门',
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      label: '选择角色',
      placeholder: '请选择角色',
      options: []
    }
  ],
  LabelWidth: '80px',
  ItemStyle: {},
  titles: '新建用户',
  ColLayout: {
    span: 24
  }
}
