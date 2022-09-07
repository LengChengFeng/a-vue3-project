import { ref } from 'vue'
import pageModal from '@/components/page-modal/pageModal.vue'
type cbFn = (value?: any) => void
export function usePageModal(fn1?: cbFn, fn2?: cbFn) {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()

  const defaultInfo = ref({})
  //新建
  const handleCreate = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true
    }
    fn1 && fn1()
  }
  const handleEdit = (value: any) => {
    console.log(value)

    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true
    }
    defaultInfo.value = { ...value }
    fn2 && fn2(value)
  }
  return [pageModalRef, defaultInfo, handleCreate, handleEdit]
}
