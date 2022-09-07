<template>
  <div class="form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="LabelWidth" :rules="rules">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="ColLayout">
            <el-form-item
              :label="item.label"
              :style="ItemStyle"
              v-if="!item.isHidden"
              :prop="item.field"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :label="item.label"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.othersOptions"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from './type/type'
export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      require: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    LabelWidth: {
      type: String,
      default: '80px'
    },
    ItemStyle: {
      type: Object,
      default: () => ({ padding: '10px 20px' })
    },
    ColLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    },
    rules: {
      type: Object
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    console.log(props.modelValue)

    const formData = ref({ ...props.modelValue })
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )

    return {
      formData
    }
  }
})
</script>

<style lang="less" scoped>
.form {
  padding-top: 22px;
}
</style>
