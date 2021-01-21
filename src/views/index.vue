<!--
 * @Description: 
 * @Author: wish.WuJunLong
 * @Date: 2021-01-20 14:37:20
 * @LastEditTime: 2021-01-21 10:09:12
 * @LastEditors: mzr
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
            <el-option label="国内" value="inner"> </el-option>
            <el-option label="国际" value="outer"> </el-option>
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
          <el-select
            size="mini"
            clearable
            v-model="formData.query.businessType"
            placeholder="请选择"
            @change="getSellChannel"
            @clear="channelClear"
          >
            <el-option label="销售" value="0"> </el-option>
            <el-option label="采购" value="1"> </el-option>
          </el-select>
        </div>
      </div>

      <div class="header_list">
        <div class="list_title">渠道：</div>
        <div class="list_item">
          <el-cascader
            :show-all-levels="false"
            size="mini"
            v-model="formData.query.channelId"
            :options="sellChannel"
            :props="optionProps"
          ></el-cascader>
        </div>
      </div>

      <div class="header_list">
        <div class="list_title">订单号/票号：</div>
        <div class="list_item">
          <el-input
            size="mini"
            clearable
            v-model="formData.query.keyNo"
            placeholder="请输入"
          ></el-input>
        </div>
      </div>

      <div class="header_list">
        <div class="list_title">创建时间：</div>
        <div class="list_date">
           <el-date-picker
            v-model="formData.query.startTime"
            type="date"
            size="mini"
            placeholder="选择日期">
          </el-date-picker> - 
          <el-date-picker
            v-model="formData.query.endTime"
            type="date"
            size="mini"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        
      </div>

      <div class="header_list">
        <div class="list_title">利润中心：</div>
        <div class="list_item">
          <el-cascader
            size="mini"
            v-model="formData.query.profitCentersCode"
            :options="profitCenter"
            :props="optionProps"
            :show-all-levels="false"
          ></el-cascader>
        </div>
      </div>


      <div class="header_list">
        <el-button size="mini" type="primary" @click="getDataList()">搜索</el-button>
        <el-button size="mini" @click="resetSearchBtn()">重置</el-button>
      </div>
    </div>

    <!-- 表格 新增 -->
    <div class="table_action">
        <el-button round size="mini" @click="openDialog">新增</el-button>
        <el-dialog
          title="新建信息"
          :visible.sync="dialogVisible"
          width="50%"
          center
          modal
          >
          <div class="dialog_div">
              <div class="title_item">
                <div class="item_icon"></div>
                <div class="item_title">订单信息</div>
              </div>
              <div class="item_div">
                  <div class="modal_item">
                      <div class="modal_title">关联订单:</div>
                      <div class="modal_div">
                          <el-radio v-model="radio" label="1">是</el-radio>
                          <el-radio v-model="radio" label="2">否</el-radio>
                      </div>
                  </div>
                  <div class="modal_item">
                      <div class="modal_title">单号/票号:</div>
                      <div class="modal_div">
                          <el-input size="mini" v-model="orderNo" placeholder="请输入"></el-input>
                      </div>
                  </div>
                  <div class="modal_item">
                      <div class="modal_div">
                          <el-button size="mini">匹配</el-button>
                      </div>
                  </div>
                  <div class="modal_item">
                      <div class="modal_title">订单类型:</div>
                      <div class="modal_div">
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
                  <div class="modal_item">
                      <div class="modal_title">订单归属:</div>
                      <div class="modal_div">
                          <el-select
                            size="mini"
                            clearable
                            v-model="formData.query.orderAscription"
                            placeholder="请选择"
                          >
                            <el-option label="国内" value="inner"> </el-option>
                            <el-option label="国际" value="outer"> </el-option>
                          </el-select>
                      </div>
                  </div>  959632fe8f04d55975b04519c4d7a66f4993560e
                  <div class="modal_item">
                      <div class="modal_title">外部单号:</div>
                      <div class="modal_div">
                          <el-input size="mini" v-model="outerNO" placeholder="请输入"></el-input>
                      </div>
                  </div> 
                  <div class="modal_item">
                      <div class="modal_title">销采类型:</div>
                      <div class="modal_div">
                          <el-select
                            size="mini"
                            clearable
                            v-model="formData.query.businessType"
                            placeholder="请选择"
                            @change="getSellChannel"
                            @clear="channelClear"
                          >
                            <el-option label="销售" value="0"> </el-option>
                            <el-option label="采购" value="1"> </el-option>
                          </el-select>
                      </div>
                  </div>
                  <div class="modal_item">
                      <div class="modal_title">销/采渠道:</div>
                      <div class="modal_div">
                          <el-cascader
                            :show-all-levels="false"
                            size="mini"
                            v-model="formData.query.channelId"
                            :options="sellChannel"
                            :props="optionProps"
                          ></el-cascader>
                      </div>
                  </div>
              </div>
          </div>
          <!-- 底部按钮 -->
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="colseDialog">提交</el-button>
            <el-button @click="colseDialog">取消</el-button>
          </span>
        </el-dialog>
    </div>
    <div class="table">
      <el-table size="mini" stripe border :data="tableData" style="width: 100%">
        <el-table-column label="操作" width="180">
          <el-button size="mini">详情</el-button>
          <el-button size="mini">关联订单</el-button>
        </el-table-column>
        <el-table-column prop="orderStatusName" label="状态"> </el-table-column>
        <el-table-column prop="orderTypeName" label="订单类型"> </el-table-column>
        <el-table-column prop="indemnityTypeName" label="赔付类型"> </el-table-column>
        <el-table-column prop="businessTypeName" label="销采类型"> </el-table-column>
        <el-table-column prop="" label="收支方向"> </el-table-column>
        <el-table-column prop="currency" label="赔付币种"> </el-table-column>
        <el-table-column prop="totalAmount" label="赔付金额"> </el-table-column>
        <el-table-column prop="profitCentersName" label="所属中心"> </el-table-column>
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
      profitCenter: [], //利润中心
      sellChannel: [], //销采渠道
      // 级联选择
      optionProps: {
        label: 'name'
      },
      // 新增弹窗
      dialogVisible: false,
      radio:'1'
    };
  },
  methods: {
    
    // 打开弹窗
    openDialog() {
        this.dialogVisible = true;
    },

    //关闭弹窗
    colseDialog() {
      this.dialogVisible = false;
    },

    // 获取列表
    getDataList() {
      this.$axios.post("/api/Compensation/QueryPage", this.formData).then((res) => {
        if (res.data.isSuccess) {
          this.tableData = res.data.data;
          console.log('表格',this.tableData)
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

    // 获取利润中心
    getProfitCenter() {
       this.$axios.get("/api/Basic/GetProfitCenterTreeInfo").then((res) => {
        if (res.data.isSuccess) {
          this.profitCenter = res.data.data;
        }
      });
    },

    // 获取销采渠道
    getSellChannel(val) {
      let params = {
        capacity:val
      }
       this.$axios.get("/api/Basic/GetChannelTreeInfo",{ params:params }).then((res) => {
        if (res.data.isSuccess) {
          this.sellChannel = res.data.data;
        }
      });
    },

    // 清空模式
    channelClear() {
        this.formData.query.channelId = [];
        this.sellChannel = [];
    },
    // 筛选栏重置
    resetSearchBtn() {
      this.formData = {
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
      };
    },
  },

  created() {
    this.getDataList(); // 获取列表
    this.getOrderTyle(); // 获取订单类型
    this.getIndemnityType(); // 获取赔付类型
    this.getProfitCenter(); //获取利润中心
    this.getSellChannel(); //获取渠道信息
  },
};
</script>

<style scoped lang="less">
.index {
  .header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding:16px 25px;
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
        font-size: 14px;
      }
      .list_item {
        width: 160px;
      }
    }
  }
  .table_action {
    padding: 16px 25px;
    .el-dialog_header{
      border-bottom: 1px solid lightgray;
    }
    .dialog_div {
      .title_item {
        display: flex;
        align-items: center;
        height: 32px;
        background-color: #f1f3f5;
        .item_icon {
          width: 4px;
          height: 16px;
          background: #0070e2;
          margin-left: 10px;
        }
        .item_title {
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          text-align: center;
          padding-left: 5px;
        }
      }
      .item_div {
        display: flex;
        flex-wrap: wrap;
        .modal_item {
          display: flex;
          align-items: center;
          padding: 10px;
          .modal_title {
            font-size: 14px;
            font-weight: 400;
            color: #333333;
            min-width: 80px;
            text-align: right;
            margin-right: 8px;
          }
          .modal_div {
            min-width: 160px;
          }
        }
      }
    }
  }
}
</style>
