<template>
<el-row v-if="commoditys.length > 0">
  <el-col :span="4" v-if="commodity !== null"  v-for="(commodity,index) in commoditys" :offset="index > 0 ? 1 : 0">
    <el-card class="commodity-item" :body-style="{ padding: '0px' }">
      <router-link :to="{path:'detal',query:{commodity}}" >
        <img src="https://c.mobilegeeks.de/wp-content/uploads/2018/04/Huawei-P20-Pro-10-168x117.jpg?x74386" class="image">
        <div style="padding: 14px;">
          <span>{{commodity.title}}</span>
          <div class="bottom clearfix">
            <time class="time">{{ commodity.comment }}</time>
          </div>
        </div>
      </router-link>
    </el-card>
  </el-col>
  <el-col :span="4" :offset="1">
    <div @click="dialogTableVisible = !dialogTableVisible">
      <el-card class="commodity-item add-commodity" >
      添加商品
      <br>        
        <i class="el-icon-plus"></i>
      </el-card>
    </div>
  </el-col>
  <el-dialog title="添加商品" :visible.sync="dialogTableVisible">
    <add-commodity-form ref="commodityForm"></add-commodity-form>
    <el-button @click="cancel">取消</el-button>    
    <el-button @click="submit" type="primary">提交</el-button>
  </el-dialog>
</el-row>
</template>

<script>
import { Card, Row, Col, Dialog,Button,Loading  } from "element-ui";
import addCommodityForm from "@/components/addCommodityForm";
import NebPay from "nebpay";
const nebPay = new NebPay();    
import {query,config,payOptions} from "@/lib/common"
export default {
  components: {
    "el-card": Card,
    "el-row": Row,
    "el-col": Col,
    "el-dialog": Dialog,
    "el-button":Button,
    addCommodityForm
  },
  created(){
    // 合約查詢邏輯
    let loadingInstance = Loading.service({ fullscreen: true });
    query("getAllCommodity","",data=>{
      loadingInstance.close();
      // TODO:500檢測
      console.log("getAllCommodity")
      let commoditys = JSON.parse(data.result)
      console.log(commoditys)
      this.commoditys = commoditys

    })
  },
  data() {
    return {
      commoditys: [],
      dialogTableVisible: false
    };
  },
  methods:{
    cancel(){
      this.dialogTableVisible = false
    },
    submit(){
      //TODO:合約提交邏輯
      let commodity = this.$refs.commodityForm.commodity;
      let commodityText = `["${commodity.title}","${commodity.comment}","${commodity.img}"]`
      console.log(commodityText);
      nebPay.call(config.contractAddr,"0","addCommodity", commodityText, payOptions);//to, value, func, args, options
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.commodity-item {
  min-height: 200px;
  min-width: 150px;
}
.add-commodity {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: lightgrey;
  cursor: pointer;
}
.add-commodity:hover {
  color: darkslategrey;
}
</style>
