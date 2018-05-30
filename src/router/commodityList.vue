<template>
<el-row>
  <el-col :span="4" v-for="(commodity,index) in commoditys" :offset="index > 0 ? 1 : 0">
    <el-card class="commodity-item" :body-style="{ padding: '0px' }">
      <router-link :to="{path:'detal',query:{commodity}}" >
        <img src="https://c.mobilegeeks.de/wp-content/uploads/2018/04/Huawei-P20-Pro-10-168x117.jpg?x74386" class="image">
        <div style="padding: 14px;">
          <span>{{commodity.title}}</span>
          <div class="bottom clearfix">
            <time class="time">{{ commodity.createtime }}</time>
          </div>
        </div>
      </router-link>
    </el-card>
  </el-col>
  <el-col :span="4" :offset="1">
    <div @click="dialogTableVisible = !dialogTableVisible">
      <el-card class="commodity-item add-commodity" >
        <i class="el-icon-plus"></i>
      </el-card>
    </div>
  </el-col>
  <el-dialog title="添加商品" :visible.sync="dialogTableVisible">
    <add-commodity-form></add-commodity-form>
  </el-dialog>
</el-row>
</template>

<script>
import { Card, Row, Col, Dialog } from "element-ui";
import addCommodityForm from "@/components/addCommodityForm";
export default {
  components: {
    "el-card": Card,
    "el-row": Row,
    "el-col": Col,
    "el-dialog": Dialog,
    addCommodityForm
  },
  data() {
    return {
      commoditys: [
        {
          img:
            "https://c.mobilegeeks.de/wp-content/uploads/2018/04/Huawei-P20-Pro-10-168x117.jpg?x74386",
          title: "华为p20",
          comment: "描述",
          createtime: "2012-02-02",
          key:"j129IFjdfi"
        }
      ],
      dialogTableVisible: false
    };
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
