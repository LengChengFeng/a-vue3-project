import {
  ElAside,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCheckbox,
  ElCol,
  ElContainer,
  ElDatePicker,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElMessage,
  ElOption,
  ElRow,
  ElSelect,
  ElSubMenu,
  ElTable,
  ElTableColumn,
  ElTabPane,
  ElTabs,
  ElPagination,
  ElImage,
  ElMessageBox,
  ElPopconfirm,
  ElDialog,
  ElTree,
  ElCard
} from 'element-plus'
import { App } from 'vue'
import 'element-plus/dist/index.css'
const components = [
  ElButton,
  ElInput,
  ElForm,
  ElFormItem,
  ElLink,
  ElCheckbox,
  ElMessage,
  ElMain,
  ElContainer,
  ElHeader,
  ElAside,
  ElRow,
  ElCol,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTabPane,
  ElPagination,
  ElImage,
  ElMessageBox,
  ElMessage,
  ElDialog,
  ElTree,
  ElCard
]
export default function (app: App) {
  for (const component of components) {
    app.component(component.name, component)
  }
}