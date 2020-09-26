<template>
    <div id="ahoutgumpreader">
        <v-card>
            <v-card-title >这里是用户个人信息</v-card-title>
            <v-card-text>
                {{userId}},
                {{userNickName}},
                {{userName}},
                {{userPhoneNumber}}
            </v-card-text>
            <v-card-actions>
                <v-btn @click="getUserInfo">获取用户个人信息</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import request from "@/utils/request"
    export default {
        name: "AboutGumpReader",
        data(){
            return{
                userId: '',
                userName: '',
                userPhoneNumber:'',
                userNickName:'',
            }
        },
        created() {
          this.getUserInfo();
        },
        methods:{
            getUserInfo(){
                let param = new URLSearchParams()
                param.append("name", "fisheep")
                request({
                    method: 'get',
                    url: '/test',
                    params: {
                        name: "fisheep",
                        age:18
                    }
                }).then(res=>{
                    console.log(res)
                    let user = res.data;
                    this.userId = user.id;
                    this.userNickName = user.userNickName;
                    this.userPhoneNumber = user.phoneNumber;
                }).catch(err=>{
                    console.log("获取user信息出错: ", err)
                })
            }
        }
    }
</script>

<style scoped>

</style>