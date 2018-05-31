<template>
    <div>
        <img :src="commodity.img">
        <p>
            {{commodity.comment}}
        </p>
        <router-link to="/">
            <el-button>返回列表</el-button>
        </router-link>

        <commentBox :comments="comments"/>
        
    </div>
</template>

<script>
import { Button } from "element-ui";
import commentBox from "@/components/commentBox"
export default {

  components: {
    "el-button": Button,
    commentBox
  },
  props: ["commodity"],
  created() {},
  data() {
    return {
      comments: [
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
