export const menuTableConfig = {
  IsShowColumn: false,
  IsShowSelectColumn: false,
  propsList: [
    {
      prop: 'name',
      label: '菜单名称',
      minWidth: '100'
    },
    {
      prop: 'type',
      label: '菜单类型',
      minWidth: '100'
    },
    {
      prop: 'url',
      label: '菜单url',
      minWidth: '130'
    },
    {
      prop: 'icon',
      label: '菜单icon',
      minWidth: '100'
    },
    {
      prop: 'premission',
      label: '按钮权限',
      minWidth: '100'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '200',
      slotName: 'operate'
    }
  ],
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  isShowPagination: false
}
