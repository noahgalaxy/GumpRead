<template>
    <div id="change-profile" class="bgk">
        <dashboard-nav-bar></dashboard-nav-bar>
        <v-container fluid>
            <v-row justify="center" class="mt-10">
                <v-col cols="6">
                    <v-container fluid >
                        <v-row class="justify-center mb-3">
                            <v-col cols="6">
                                <v-text-field v-model="userInfo.userName" color="purple asscent-4" :prepend-icon="icons.mdiEmailOutline " hint="Email即为登陆用户名" label="Email" clearable :clear-icon="icons.mdiClose "></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="justify-center">
                            <v-col cols="6">
                                <v-text-field v-model="userInfo.nickName" color="purple asscent-4" :prepend-icon="icons.mdiEmoticonLolOutline " label="NickName" clearable :clear-icon="icons.mdiClose "></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" offset="3">
                                <v-text-field :type="passwordType" v-model="userInfo.password" color="purple asscent-4" :prepend-icon="passwordIcon" label="Password" clearable :clear-icon="icons.mdiClose "></v-text-field>
                            </v-col>
                            <v-col cols="2">
<!--                                <v-checkbox v-model="hiddenPasswords" class="mx-2" label="Disabled"></v-checkbox>-->
                                <v-switch v-model="hiddenPasswords" class="mx-2" label="Hidden" color="purple lighten-2"></v-switch>
                            </v-col>
                        </v-row>

                        <v-row class="justify-center">
                            <v-col cols="6">
                                <v-btn block outlined rounded color="deep-purple darken-4">Confirm and Submit</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>

        </v-container>



    </div>
</template>

<script>
    import DashboardNavBar from "../../components/dashboard/DashboardNavBar";
    import {
        mdiEmailOutline ,
        mdiEmoticonLolOutline ,
        mdiClose,
        mdiLockOpenVariantOutline,
        mdiLockOutline,
    } from '@mdi/js';
    export default {
        name: "ChangeProfile",
        components:{
            DashboardNavBar,

        },
        data(){
            return{
                hiddenPasswords: false,
                icons:{
                    mdiEmailOutline ,
                    mdiEmoticonLolOutline,
                    mdiClose,
                    mdiLockOpenVariantOutline
                },
                userInfo:{
                    userName:'noahyu@126.com',
                    nickName:"Fisheep"

                }
            }
        },
        computed:{
            passwordType(){
                return this.hiddenPasswords ? "password":"text";
            },
            passwordIcon(){
                return this.hiddenPasswords ? mdiLockOutline: mdiLockOpenVariantOutline;
            }
        },
        methods:{
        }
    }
</script>

<style scoped>
    .bgk{
        background-color: #F5F5F5;
        width: 100%;
        height: 100%;
        position: absolute;
    }

</style>