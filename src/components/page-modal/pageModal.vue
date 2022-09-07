<template>
  <div class="modal">
    <el-dialog
      :title="modalConfig.titles"
      v-model="centerDialogVisible"
      width="30%"
      destroy-on-close
      center
    >
      <my-form v-bind="modalConfig" v-model="formData"></my-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="btnEnsure">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import MyForm from '@/base-ui/form/MyForm.vue'
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    MyForm
  },
  props: {
    modalConfig: {
      type: Object,
      require: true
    },
    defaultInfo: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    },
    titles: {
      type: String
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const centerDialogVisible = ref(false)
    console.log(props.otherInfo)
    const formData = ref({})
    const store = useStore()
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    const btnEnsure = () => {
      centerDialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        store.dispatch(`system/editPageDataAction`, {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        store.dispatch(`system/createPageDataAction`, {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      centerDialogVisible,
      formData,
      btnEnsure
    }
  }
})
</script>

<style></style>
