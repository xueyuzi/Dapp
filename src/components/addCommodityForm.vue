<template>    
<el-form >
    <el-form-item label="评测标题" >
      <el-input placeholder="请填写标题内容" v-model="commodity.title"/>
    </el-form-item>
    <el-form-item label="评测内容" >
        <el-input 
            type="textarea" 
            placeholder="请填写评测内容" 
            :autosize="{ minRows: 10, maxRows: 10}"
            v-model="commodity.comment"
            />
    </el-form-item>
    <el-form-item label="商品图片" >
        <upload-commodity-form/>
    </el-form-item>
</el-form>
</template>
<script>
import { Input, Form, FormItem,Button } from "element-ui";
import uploadCommodityForm from "@/components/uploadCommodityForm"
export default {
  components: {
    "el-input": Input,
    "el-form": Form,
    "el-form-item": FormItem,
    "el-button":Button,
    uploadCommodityForm
  },
  data(){
    return{
      commodity:{
        title:"",
        comment:""
      }
    }
  }
};
</script>
