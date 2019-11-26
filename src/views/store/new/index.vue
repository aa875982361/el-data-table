<template>
  <el-form-renderer label-width="100px" :content="content" ref="ruleForm">
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">提交</el-button>
      <el-button @click="returnPre">返回</el-button>
    </el-form-item>
  </el-form-renderer>
</template>

<script>
import ElSelectArea from '@femessage/el-select-area';
const URL = 'http://39.100.141.76:3000/mock/107/training/stores';
export default {
  data() {
    return {
      content: [
        {
          type: 'input',
          id: 'storeName',
          label: '门店名称',
          attrs: {'data-storeName': 'form1'},
          el: {
            size: 'mini',
            placeholder: '请输入门店名称',
          },
          rules: [{required: true, message: '没有输入门店名称', trigger: 'blur'}],
        },
        {
          component: ElSelectArea,
          id: 'area',
          type: 'select-area',
          label: '门店区域',
          attrs: {'data-area': 'form1'},
          default: [],
          el: {
            placeholders: ['请选择', '请选择', '请选择'],
            type: 'all',
          },
          rules: [
            {
              required: true,
              type: 'array',
              message: '请选择门店区域',
              trigger: 'blur',
            },
          ],
        },
        {
          type: 'input',
          id: 'address',
          label: '门店地址',
          attrs: {'data-address': 'form1'},
          el: {
            size: 'mini',
            placeholder: '请输入门店地址',
          },
          rules: [{required: true, message: '没有输入门店地址', trigger: 'blur'}],
        },
      ],
      loading: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(valid);
          const data = this.$refs[formName].getFormValue();
          this.submitData(data);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitData(data) {
      console.log('submitData', data);
      // 类型判断
      if (data['area']) {
        data = this.handleArea(data);
      }
      this.loading = true;
      if (this.id) {
        // 修改
        data.id = this.id;
        // PUT 请求
        this.$axios
          .$put(URL, data)
          .then(resp => {
            this.loading = false;
            console.log('返回结果', resp);
            if (resp.code === '0') {
              this.$message.success('操作成功');
              this.$router.replace({path: '/store'});
            } else {
              this.$message.error('操作失败');
            }
          })
          .catch(e => {
            this.loading = false;
            this.$message.error('操作失败');
            console.log('新增出错', e);
          });
      } else {
        // 新增
        data.createAt = +new Date() / 1000;
        // POST 请求
        this.$axios
          .$post(URL, data)
          .then((resp = {}) => {
            this.loading = false;
            console.log('返回结果', resp);
            if (resp.code === '0') {
              this.$message.success('操作成功');
              this.$router.replace({path: '/store'});
            } else {
              this.$message.error('操作失败');
            }
          })
          .catch(e => {
            this.loading = false;
            console.log('新增出错', e);
            this.$message.error('操作失败');
          });
      }

      console.log('处理后的数据', data);
      // 上传
    },
    handleArea(data = {}) {
      if (!data) {
        throw new Error('数据不为空');
      }
      const area = data['area'];
      if (!Array.isArray(area) && area.length !== 3) {
        throw new Error('handleArea data 里面的area 不是数组 或者长度不为3');
      }
      const province = area[0];
      const city = area[1];
      const region = area[2];
      const provinceCode = Object.keys(province)[0];
      const cityCode = Object.keys(city)[0];
      const regionCode = Object.keys(region)[0];
      data = {
        ...data,
        provinceCode,
        cityCode,
        regionCode,
        province: province[provinceCode],
        city: city[cityCode],
        region: region[regionCode],
        area: undefined,
      };
      return data;
    },
    returnPre() {
      this.$router.go(-1);
    },
  },
  mounted() {
    const query = this.$router.history.current.query || {};

    if (query.id) {
      this.id = query.id;
      query.area = [`${query.provinceCode}`, `${query.cityCode}`, `${query.regionCode}`];
      console.log('query', query);
      this.$refs['ruleForm'].updateForm(query);
    }
  },
};
</script>
