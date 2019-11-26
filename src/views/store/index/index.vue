<template>
  <div class="store">
    <el-data-table v-bind="tableConfig" />
  </div>
</template>

<script>
export default {
  name: 'store',
  data() {
    return {
      tableConfig: {
        url: 'http://39.100.141.76:3000/mock/107/training/stores',
        columns: [
          {prop: 'storeName', label: '门店名称'},
          {
            prop: 'area',
            label: '所属区域',
            formatter: row => `${row.province}-${row.city}-${row.region}`,
          },
          {
            prop: 'createdAt',
            label: '创建时间',
            formatter: row => row.createdAt,
          },
        ],
        searchForm: [
          {
            el: {placeholder: '请输入'},
            label: '门店名称',
            id: 'storeName',
            type: 'input',
          },
          {
            label: '创建时间',
            id: 'createdAt',
            type: 'date-picker',
            el: {
              // type: 'daterange',   // 如果 type 为 daterange，则获取到的是一个数组
              valueFormat: 'timestamp', // 不使用 value-format 属性，则获取到的是一个空对象，格式请参考 element-ui 组件 date-picker 的日期格式部分
            },
            outputFormat: val => {
              return val / 1000;
            },
          },
        ],
        hasNew: false,
        hasEdit: false,
        hasDelete: true,
        canDelete: () => true,
        headerButtons: [
          {
            type: 'button',
            text: '新增',
            atClick: this.edit,
            show: selected => {
              console.log(selected);
              return true;
            },
          },
        ],
        extraButtons: [
          {
            type: 'text',
            text: '修改',
            atClick: this.edit,
            show: () => true,
          },
        ],
        single: true, // 单选
        beforeSearch: value => {
          console.log('search', value);
          return Promise.resolve(value);
        },
      },
    };
  },
  methods: {
    edit(selected) {
      console.log('selected', selected);
      // this.$router.replace(`/new?store-id=${id}`);
      this.$router.push({path: '/new', query: {...selected}});
      return Promise.resolve();
    },
  },
};
</script>

<style lang="less"></style>
