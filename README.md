# vue-ele-form-table-editor | vue-ele-form 的树形选择框

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)
[![npm](https://img.shields.io/npm/v/vue-ele-form-table-editor.svg)](https://www.npmjs.com/package/vue-ele-form-table-editor)
[![download](https://img.shields.io/npm/dw/vue-ele-form-table-editor.svg)](https://npmcharts.com/compare/vue-ele-form-table-editor?minimal=true)

## 介绍

[vue-ele-form-table-editor](https://github.com/dream2023/vue-ele-form-table-editor) 做为 vue-ele-form 的第三方扩展, 通过对 [ele-table-editor](https://github.com/dream2023/ele-table-editor) 的封装, 做到了表格编辑的双向绑定功能

![image](https://raw.githubusercontent.com/dream2023/images/master/ele-form-table-editor.uxlgna0kl1.gif)

## 安装

```bash
yarn add vue-ele-form-table-editor
```

或者

```bash
npm install vue-ele-form-table-editor --save
```

## 注册和使用

### 全局注册

```js
import EleForm from 'vue-ele-form'
import EleFormTableEditor from 'vue-ele-form-table-editor'

// 注册 table-editor 组件
Vue.component('table-editor', EleFormTableEditor)

// 注册 ele-form
Vue.use(EleForm, {
  // 专门设置全局的 table-editor 属性
  // 属性参考: https://github.com/dream2023/ele-table-editor 或者 下面的属性说明
  'table-editor': {
    isShowDelete: false // 所有的 table-editor 都会有 isShowDelete = false 的属性值, 即不显示删除按钮
  }
})
```

### 局部注册

局部注册和使用请参考: [https://www.yuque.com/chaojie-vjiel/vbwzgu/inlpxy#I5kdQ](https://www.yuque.com/chaojie-vjiel/vbwzgu/inlpxy#I5kdQ)

### 使用

```js
formDesc: {
  xxx: {
    label: 'xxx',
    // 只需要在这里指定为 table-editor 即可
    type: 'table-editor',
    // 属性参考: https://github.com/dream2023/ele-table-editor 或者 下面的属性说明
    attrs: {
      isShowDelete: false,
      // 校检规则写这里
      rules: {
        name: { required: true, message: '姓名必填' },
        // ...
      },
      // 表格列
      columns:
        [
          {
            // attrs 为 el-table-column 的属性
            attrs: {
              prop: 'age', // el-table-column 的 prop 属性
              label: '年龄', // el-table-column 的 label 属性
              // ...
            },
            // content 为table-column的内容, 可以省略, 省略的话就是显示文本
            // content 类型可以为对象(单个内容比如单个input框), 和 数组 (多个input框)
            // 具体可参考示例
            content: {} // []
          }
        ]
    }
  }
}
```

## 示例

```html
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
    data() {
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
                  click(scope) {
                    /* eslint-disable */
                    console.log(scope)
                  }
                }
              ],
              // 表格列
              columns: [
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
                      { name: '广州', id: 'guangzhou' }
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
      handleRequest(data) {
        console.log(data)
        return Promise.resolve()
      },
      handleSuccess() {
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
```

### attrs

> 具体请参考: [https://github.com/dream2023/ele-table-editor](https://github.com/dream2023/ele-table-editor)

### 参数概述

```js
attrs: {
  // 表格的属性
  tableAttrs: {
    type: Object,
    default: () => ({ border: true })
  },
  // 表格事件
  tableOn: {
    type: Object
  },
  // 表单数据
  value: {
    type: Array,
    default: () => []
  },
  // 是否显示删除
  isShowDelete: {
    type: Boolean,
    default: true
  },
  // 删除按钮属性
  deleteBtnAttr: {
    type: Object,
    default () {
      return {
        type: 'text'
      }
    }
  },
  // 右侧其它按钮
  extraBtns: {
    type: Array,
    default: null
  },
  // table 列
  columns: {
    type: Array,
    default: () => []
  },
  // 校检规则
  rules: Object,
  // 禁用 (对所有input框禁用))
  disabled: {
    type: Boolean,
    default: false
  },
  // 新增列的值
  newColumnValue: {
    type: Object,
    default: () => ({})
  },
  // 是否显示新增按钮
  isShowAdd: {
    type: Boolean,
    default: true
  },
  // 新增按钮文本
  addBtnText: {
    type: String,
    default: '新增'
  }
}
```

### columns 参数详解

> 具体请参考: [https://github.com/dream2023/ele-table-editor](https://github.com/dream2023/ele-table-editor)

```js
columns: [
  {
    // attrs 为 el-table-column 的属性 + content
    // el-table-column 的属性具体参考: https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes
    prop: 'name', // el-table-column 的 prop 属性
    label: '姓名', // el-table-column 的 label 属性
    width: 200, // el-table-column 的 width 属性
    // ...
    // column 的内容, 可省略, 省略时为显示字符串
    // column 的类型可以为对象或者对象数组, 例如
    content: {
      // 渲染的组件, 可以为全局注册的组件名称或者直接组件的引用
      type: 'el-select',
      valueKey: 'xxx', // 绑定的tableData 的key
      // select, checkbox, radio 三个组件特有的属性
      // 用于指定选项
      options: [ { text: '北京', value: 'beijing' }, { text: '上海', value: 'shanghai'} ]
      // 同上, 用于当 options的key不是 text 和 value 时指定key和value
      prop: {
        text: 'name',
        value: 'id'
      },
      // 组件属性
      attrs: {
        size: 'medium',
        // ...
      },
      // 组件样式
      style: {
        width: '200px',
        // ...
      },
      // 组件 class
      class: 'my-custom-select',
      // 组件事件
      on: {
        change(value) {
          console.log(value)
        },
        // ...
      },
      // 组件插槽
      slots: {
        default (h) {
          return [
            h('el-option', { attrs: { label: '男', value: 1 } }),
            h('el-option', { attrs: { label: '女', value: 2 } })
          ]
        }
      },
      // 作用域插槽
      scopedSlots: {
        test (h, data) {
          // data 为传递过来的参数
          return h('div', 'test')
        }
      }
    },
    // 此属性, 仅当当未指定 content 时, 用于格式化文本
    // status: 1 , options为枚举
    options: {
      1: '正常',
      2: '禁用'
    }
]
```

## 相关链接

- [ele-table-editor](https://github.com/dream2023/ele-table-editor)
- [vue-ele-form](https://github.com/dream2023/vue-ele-form)
- [element-ui](http://element-cn.eleme.io)
