<template>
    <div>
        <img :src="commodity.img">
        <p>
            {{commodity.comment}}
        </p>
        <router-link to="/">
            <el-button>返回列表</el-button>
        </router-link>

        <el-card class="box-card" style="margin:10px 0">
            <div class="avatar">
            <img class="avatar-img" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=322489505,710464833&fm=27&gp=0.jpg" alt="">                
            0xkldsjalfksjdf
            </div>
            <div class="comment">
                呵呵 
            </div>
            <time>2017-02-03 11:11:11</time>
        </el-card>
        
    </div>
</template>

<script>
import { Button,Card } from "element-ui";
export default {

  components: {
    "el-button": Button,
    "el-card":Card
  },
  props: ["commodity"],
  created() {},
  data() {
    return {
      comment: [
        {
          author: "lings",
          createtime: "2018-05-30",
          comment: "great"
        }
      ]
    };
  },
};
</script>


<style>
.avatar{
    text-align: left
}
.comment{
    text-align: left
}
.avatar-img{
    width:50px;
    height:50px;
    border-radius:50%;
}
.box-card time{
    color: #687a86;
    float: right;
}
</style>
