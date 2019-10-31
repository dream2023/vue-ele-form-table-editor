<template>
  <el-card
    header="ele-form-table-editor 演示"
    shadow="never"
    style="max-width: 1250px;min-height: 1000px;margin: 20px auto;"
  >
    <ele-form
      :form-data="formData"
      :form-desc="formDesc"
      :span="22"
      :request-fn="handleRequest"
      @request-success="handleSuccess"
    ></ele-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        class: '三年级二班',
        students: [
          {
            grade: '三年级二班',
            name: '小张',
            sex: 1,
            tuition: 2000,
            unPay: 100,
            dream: ''
          }
        ]
      },
      formDesc: {
        class: {
          label: '所属班级',
          type: 'input',
          attrs: {
            disabled: true
          }
        },
        students: {
          label: '学员',
          type: 'table-editor',
          attrs: {
            // 校检规则
            rules: {
              name: { required: true, message: '姓名必填' },
              tuition: { required: true, message: '已缴纳金额必填' }
            },
            // 其它按钮
            extraBtns: [
              {
                // text 按钮显示的文本
                text: '关联',
                // 按钮的属性
                attrs: {
                  type: 'text'
                },
                // click事件
                click (scope) {
                  /* eslint-disable */
                  console.log(scope)
                }
              }
            ],
            // 表格列
            columns:
              [
                {
                  // el-table-column 的属性
                  type: 'index',
                  width: 50
                },
                {
                  // el-table-column 的属性
                  prop: 'grade',
                  label: '年级'
                },
                {
                  prop: 'name',
                  label: '姓名',
                  // 当有 content 属性时, 可以指定相应的组件
                  content: {
                    // type 可以为全局注册的组件名或者组件引用
                    type: 'el-input',
                    // attrs 是组件的属性
                    attrs: {
                      placeholder: '学员姓名'
                    }
                    // 此外还有
                    // 具体使用参考: https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
                    // style: {}, // 组件的样式
                    // class: {}, // 组件的class
                    // on: {} // 组件的事件
                    // slots: {}, // 插槽
                    // scopedSlots: {}, // 作用域插槽
                  }
                },
                {
                  prop: 'sex',
                  label: '性别',
                  width: 50,
                  // 用于格式化枚举文本
                  options: {
                    1: '男',
                    2: '女'
                  }
                },
                {
                  label: '缴费',
                  width: 340,
                  // content 可以为数组
                  content: [
                    '已缴纳: ', // 数组可以是 组件 和 普通字符串 混用
                    {
                      type: 'el-input',
                      valueKey: 'tuition', // 当content为数组时, 必须制定组件绑定 的 key
                      style: {
                        width: '100px',
                        marginRight: '10px'
                      }
                    },
                    '未缴纳: ',
                    {
                      type: 'el-input',
                      valueKey: 'unPay', // 这里也需要绑定 key
                      style: {
                        width: '100px'
                      }
                    }
                  ]
                },
                {
                  prop: 'dream',
                  label: '梦想',
                  content: {
                    type: 'el-radio-group',
                    // 对于 el-select, el-checkbox-group, el-radio-group 三个组件
                    // 可以指定  options 数组进行选项的渲染
                    options: [
                      // option 的值可以为对象
                      // 此处对以上三个组件做了封装, 显示的key为 text, 值key为 value
                      { text: '科学家', value: 'scientist' },
                      { text: '警察', value: 'policeman' },
                      // 也可以指定为字符串, 则会转化为 '程序员' => { text: '程序员', value: '程序员' }
                      '程序员'
                    ]
                  }
                },
                {
                  prop: 'birthplace',
                  label: '籍贯',
                  content: {
                    type: 'el-select',
                    // 如果 key 不是 text 和 value
                    // 可以使用 prop 指定 key
                    options: [
                      { name: '北京', id: 'beijing' },
                      { name: '上海', id: 'shanghai' },
                      { name: '广州', id: 'guangzhou' },
                    ],
                    // prop 将 text 对应 name, value 对应 id
                    prop: {
                      text: 'name',
                      value: 'id'
                    }
                  }
                }
              ],
            // 新行默认值
            newColumnValue: {
              grade: '三年级二班',
              sex: 2
            }
          }
        }
      }
    }
  },
  methods: {
    handleRequest (data) {
      console.log(data)
      return Promise.resolve()
    },
    handleSuccess () {
      this.$message.success('提交成功')
    }
  }
}
</script>

<style>
body {
  background-color: #f0f2f5;
}
</style>
