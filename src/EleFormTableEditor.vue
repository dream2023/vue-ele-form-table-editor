<template>
  <ele-table-editor
    :class="desc.class"
    :style="desc.style"
    class="ele-form-table-editor"
    v-bind="attrs"
    ref="table-editor"
    v-model="newValue"
    v-on="onEvents"
  >
    <template v-for="(render, key) of desc.slots" v-slot:[key]="data">
      <extend-slot :data="data" :key="key" :render="render" />
    </template>
  </ele-table-editor>
</template>

<script>
import EleTableEditor from 'ele-table-editor'
import formMixin from 'vue-ele-form/lib/mixins/formMixin'

export default {
  name: 'EleFormTableEditor',
  mixins: [formMixin],
  components: { EleTableEditor },
  methods: {
    validate () {
      return new Promise((resolve, reject) => {
        this.$refs['table-editor'].validate().then(resolve).catch(() => {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ [this.$parent.$props.prop]: this.desc.label + '表格出错了' })
        })
      })
    }
  }
}
</script>
