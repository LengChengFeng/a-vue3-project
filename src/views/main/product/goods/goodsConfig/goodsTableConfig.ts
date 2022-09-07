export const goodsTableConfig = {
  IsShowColumn: true,
  IsShowSelectColumn: true,
  propsList: [
    {
      prop: 'name',
      label: '商品名称',
      minWidth: '100'
    },
    {
      prop: 'newPrice',
      label: '商品价格',
      minWidth: '100',
      slotName: 'price'
    },
    {
      prop: 'imgUrl',
      label: '商品图片',
      minWidth: '130',
      slotName: 'image'
    },
    {
      prop: 'desc',
      label: '商品描述',
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
  ]
}
