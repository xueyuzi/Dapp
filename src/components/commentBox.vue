<template>
    <div>
        <el-card class="box-card" style="margin:10px 0" v-for="comment in comments">
            <div class="avatar">
            <img class="avatar-img" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=322489505,710464833&fm=27&gp=0.jpg" alt="">                
            {{comment.author}}
            </div>
            <div class="comment">
                {{comment.comment}}
            </div>
            <time>{{comment.createtime}}</time>
        </el-card>
    </div>
</template>

<script>
import { Card } from "element-ui";
export default {
    props:["comments"],
    components:{
        "el-card":Card
    }
}
</script>

