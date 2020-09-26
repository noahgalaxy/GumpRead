<template>
    <div id="dashboardnavbar">
        <v-app-bar app dark dense color="purple accent-4">
            <v-container>
                <v-row align-content="center">
                    <v-toolbar-title >
                        <v-btn text class="font-weight-bold" @click="gumpClicked">
                            <v-icon>{{icons.mdiFeather}}</v-icon>
                            Gump
                        </v-btn>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <div v-if="unLogin">
                        <v-btn tile text @click="openDialog" >
                            <v-icon class="mr-2">{{icons.mdiAccountCircle}}</v-icon>
                            sign in
                        </v-btn>
                    </div>
                    <div v-else >
                        <v-menu open-on-hover key="profilekey">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        tile
                                        dark
                                        text
                                        v-bind="attrs"
                                        v-on="on"
                                >
                                    <v-icon class="mr-2">{{icons.mdiAccountCircle}}</v-icon>
                                    {{userNickName}}
                                </v-btn>
                            </template>
                            <profile :user-nick-name="userNickName"></profile>
                        </v-menu>
                    </div>


                    <div class="text-center">
                        <v-menu open-on-hover key="infokey">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        tile
                                        dark
                                        text
                                        v-bind="attrs"
                                        v-on="on"
                                >
                                    <v-icon class="mr-2">{{icons.mdiMenu}} </v-icon>
                                    info
                                </v-btn>
                            </template>
                            <info></info>
                        </v-menu>
                    </div>
                </v-row>
            </v-container>
        </v-app-bar>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <div class="d-flex justify-space-between">
                    <v-card-title>User Sign In</v-card-title>
                    <v-btn color="purple" icon @click="closeDialog">
                        <v-icon>close</v-icon>
                    </v-btn>
                </div>
                <v-card-text>
                    <v-container>
                        <v-form ref="loginForm">

                        <v-row>
                            <v-col cols="12">
                                <v-text-field :rules="loginRules.userNameRule" color="purple" :prepend-icon="icons.mdiAccount " clearable="clearable" v-model="loginForm.userName" label="userName"></v-text-field>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field :rules="loginRules.passwordRule" color="purple" :prepend-icon="icons.mdiLock" clearable="clearable" v-model="loginForm.password" label="password"></v-text-field>
                            </v-col>
                            <v-col class="d-flex justify-end">
                                <v-btn color="grey" class="mt-5" text>
                                    <v-icon class="mr-2">{{icons.mdiShieldAlertOutline }}</v-icon>
                                    forget</v-btn>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field :rules="loginRules.codeRule" color="purple" :prepend-icon="icons.mdiRobot" clearable="clearable" v-model="loginForm.captcha" label="captcha"></v-text-field>
                            </v-col>
                            <v-col>
                                <img :src="codeUrl" alt="验证码获取失败,点击这里重试" @click="getCaptchaImg">
                            </v-col>

                        </v-row>
                        </v-form>

                    </v-container>
                    <div class="d-flex justify-end mb-4">
                        <v-btn :loading="loading" text class="purple--text" @click="submitSignInForm">
                            <v-icon class="mr-2">{{icons.mdiCheckCircleOutline}}</v-icon>
                            submit
                        </v-btn>

                        <v-btn outlined class="ml-6 green--text" icon @click="clearFormContents">
                            <v-icon>{{icons.mdiBroom }}</v-icon>
                        </v-btn>
                    </div>
                </v-card-text>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>

    import Profile from "./navbar/Profile";
    import Info from "./navbar/Info";
    import {getCaptcha} from '@/utils/network/common'
    import {getToken} from "@/utils/cookie"
    import Cookies from 'js-cookie'
    import {
        mdiAccountCircle,
        mdiMenu,
        mdiFeather,
        mdiCheckCircleOutline,
        mdiBroom,
        mdiLock,
        mdiAccountOutline,
        mdiAccount,
        mdiRobot,
        mdiCardAccountDetails,
        mdiKeyboardBackspace,
        mdiShieldAlertOutline

    } from '@mdi/js'
    import {signOut} from "../../utils/network/user";
    export default {
        name: "DashboardNavBar",
        components: {Info, Profile},
        data(){
            return{
                valid: true,
                icons:{
                    mdiAccountCircle,
                    mdiMenu,
                    mdiFeather,
                    mdiCheckCircleOutline,
                    mdiBroom,
                    mdiLock,
                    mdiAccountOutline,
                    mdiAccount,
                    mdiRobot,
                    mdiCardAccountDetails,
                    mdiKeyboardBackspace,
                    mdiShieldAlertOutline
                },
                codeUrl: '',
                loginForm:{
                    // userNickName:"sign in",
                    userName: '',
                    password: '',
                    captcha: '',
                    captchaId:'',
                },
                profileItems:[
                    {title: "change profile", icon: mdiCardAccountDetails},
                    {title: "sign out", icon: mdiKeyboardBackspace},
                ],
                items: [
                    {title: 'about'},
                    {title: 'item 2'},
                    {title: 'about author'},
                ],
                loginRules: {
                    emailRules: [
                        v => !!v || 'E-mail is required',
                        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                    ],
                    userNameRule: [
                        v => (v === undefined || !!v) || 'Account is required',
                        v => (v!= undefined && v.length >= 5) || 'Account must be more than 5 characters',
                    ],
                    passwordRule: [
                        v => (v === undefined || !!v ) || 'Password is required',
                        v => (v !=undefined && v.length >= 5) || 'Password must be more than 5 characters',
                    ],
                    codeRule:[
                        v => !!v || 'Code is required',
                    ]
                },
                dialog: false,
                loading: false
            }
        },
        computed:{
            unLogin(){
                console.log("计算属性unlogin：",this.$store.state.userInfo.userNickName.toLowerCase());
                return this.$store.state.userInfo.userNickName.toLowerCase() == "sign in"? true : false
            },
            userNickName(){
                return this.$store.state.userInfo.userNickName;
            }
        },
        created() {
            this.getCookie()
            console.log("create生命周期执行函数getCookie");
        },

        methods:{
            getCookie(){
                let userName = Cookies.get("userName");
                let password = Cookies.get("password");
                let userNickName = Cookies.get("userNickName");
                console.log("getCookie里面获取到的userName:" + userName + ", userNickName: " + userNickName+"password: "+password);
                this.loginForm.userName = userName == undefined? '' : userName;
                this.loginForm.password = password == undefined? '' : password;
                if(userName != undefined && password != undefined && userNickName != undefined){
                    this.setStoreUserInfo(userName, userNickName)
                }
            },

            getCaptchaImg(){
                getCaptcha().then(res=>{
                    console.log("取到了验证码图片")
                    this.codeUrl = "data:image/gif;base64," + res.captchaImg;
                    this.loginForm.captchaId = res.captchaId
                }).catch(err=>{
                    console.log("验证码图片没取到");
                })
            },
            gumpClicked(){
                console.log("Gump 被点击了,跳转首页");
                this.$router.push("/")
            },
            itemClick(){
                console.log("itemclick");
            },
            clearFormContents(){
                // this.loginForm.userName = this.loginForm.password = this.loginForm.captcha = ''
                this.$refs.loginForm.reset()
                this.$refs.loginForm.resetValidation()
            },
            openDialog(){
                this.getCaptchaImg()
                this.dialog = true
            },
            closeDialog(){
                this.dialog = false
                this.clearFormContents()
            },
            setStoreUserInfo(userName, userNickName){
                this.$store.commit("SET_USERINFO", {userName, userNickName})
            },
            submitSignInForm(){
                if(this.$refs.loginForm.validate()){
                    this.loading = true
                    Cookies.set("userName", this.loginForm.userName, {expires: 30});
                    Cookies.set("password", this.loginForm.password, {expires: 30});
                    // var _tmpThis = this
                    this.$store.dispatch("signIn", this.loginForm).then(res=>{
                        console.log("表单提交操作成功, 响应消息为："+res);
                        Cookies.set("userNickName", res.user.userNickName, {expires: 30})
                        // this.setStoreNickName("Fisheep")
                        // console.log("这是登录成功之后调用的getToken()方法： ", getToken());
                    }).catch(err=>{
                        console.log("表单提交操作失败, 响应消息为："+res);
                    }).finally(()=>{
                        this.dialog = false
                        this.loading = false
                        this.clearFormContents()
                    })
                }

            }
        }
    }
</script>

<style scoped>

</style>