import { ref } from 'vue'
import MyTables from '@/components/page-table/MyTables.vue'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof MyTables>>()
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}
