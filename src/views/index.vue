<!--
 * @Description: 
 * @Author: wish.WuJunLong
 * @Date: 2021-01-20 14:37:20
 * @LastEditTime: 2021-01-20 15:13:37
 * @LastEditors: wish.WuJunLong
-->
<template>
  <div class="index">
    <div class="header">
      <div class="header_list">
        <div class="list_title">订单归属：</div>
        <div class="list_item">
          <el-select
            size="mini"
            clearable
            v-model="formData.query.orderAscription"
            placeholder="请选择"
          >
            <el-option label="国内" value="gn"> </el-option>
            <el-option label="国际" value="gj"> </el-option>
          </el-select>
        </div>
      </div>

      <div class="header_list">
        <div class="list_title">订单类型：</div>
        <div class="list_item">
          <el-select
            size="mini"
            clearable
            v-model="formData.query.orderType"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in orderTyleList"
              :key="index"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="header_list">
        <div class="list_title">赔付类型：</div>
        <div class="list_item">
          <el-select
            size="mini"
            clearable
            v-model="formData.query.indemnityType"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in orderIndemnityList"
              :key="index"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="header_list">
        <div class="list_title">销采类型：</div>
        <div class="list_item">
          <el-input
            size="mini"
            clearable
            v-model="formData.query.businessType"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </div>

      <div class="header_list">
        <div class="list_title">订单号/票号：</div>
        <div class="list_item">
          <el-input
            size="mini"
            clearable
            v-model="formData.query.keyNo"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </div>

      <div class="header_list">
        <div class="list_title">创建时间：</div>
        <div class="list_item">
          <el-input
            size="mini"
            clearable
            v-model="formData.query.startTime"
            placeholder="请输入内容"
          ></el-input>
          <el-input
            size="mini"
            clearable
            v-model="formData.query.endTime"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </div>

      <div class="header_list">
        <div class="list_title">利润中心：</div>
        <div class="list_item">
          <el-input
            size="mini"
            clearable
            v-model="formData.query.profitCentersCode"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </div>

      <div class="header_list">
        <div class="list_title">渠道：</div>
        <div class="list_item">
          <el-input
            size="mini"
            clearable
            v-model="formData.query.channelId"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </div>

      <div class="header_list">
        <el-button size="mini" type="primary" @click="getDataList()">搜索</el-button>
        <el-button size="mini" @click="resetSearchBtn()">重置</el-button>
      </div>
    </div>

    <div class="table">
      <el-table size="mini" stripe border :data="tableData" style="width: 100%">
        <el-table-column label="操作" width="180">
          <el-button size="mini">详情</el-button>
          <el-button size="mini">关联订单</el-button>
        </el-table-column>
        <el-table-column prop="orderTypeName" label="状态"> </el-table-column>
        <el-table-column prop="businessTypeName" label="订单类型"> </el-table-column>
        <el-table-column prop="indemnityTypeName" label="赔付类型"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        query: {
          orderAscription: null,
          orderType: null,
          indemnityType: null,
          businessType: null,
          keyNo: "",
          startTime: "",
          endTime: "",
          profitCentersCode: "",
          channelId: "",
        },
        currentPage: 0,
        pageSize: 0,
      },
      input: "",

      tableData: [], // 数据列表
      orderTyleList: [], // 订单类型
      orderIndemnityList: [], // 赔付类型
    };
  },
  methods: {
    // 获取列表
    getDataList() {
      this.$axios.post("/api/Compensation/QueryPage", this.formData).then((res) => {
        if (res.data.isSuccess) {
          this.tableData = res.data.data;
        }
      });
    },

    // 获取订单类型
    getOrderTyle() {
      this.$axios.get("/api/Basic/GetOrderTypes").then((res) => {
        if (res.data.isSuccess) {
          this.orderTyleList = res.data.data;
        }
      });
    },

    // 获取赔付类型
    getIndemnityType() {
      this.$axios.get("/api/Basic/GetIndemnityTypes").then((res) => {
        if (res.data.isSuccess) {
          this.orderIndemnityList = res.data.data;
        }
      });
    },

    // 筛选栏重置
    resetSearchBtn() {
      this.formData = {
        query: {
          orderAscription: 0,
          orderType: 0,
          indemnityType: 0,
          businessType: 0,
          keyNo: "",
          startTime: "",
          endTime: "",
          profitCentersCode: "",
          channelId: "",
        },
      };
    },
  },

  created() {
    this.getDataList(); // 获取列表
    this.getOrderTyle(); // 获取订单类型
    this.getIndemnityType(); // 获取赔付类型
  },
};
</script>

<style scoped lang="less">
.index {
  .header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .header_list {
      display: inline-flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 15px;
      &:not(:last-child) {
        margin-right: 10px;
      }
      .list_title {
        min-width: 100px;
        text-align: right;
      }
      .list_item {
        width: 160px;
      }
    }
  }
}
</style>
