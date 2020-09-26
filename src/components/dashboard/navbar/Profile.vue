<template>
    <div id="dashboard-navbar-profile">
        <v-list >
            <v-list-item>
                <v-list-item-avatar>
                    <v-avatar color="purple accent-4" class="white--text">FI</v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                    <span class="font-weight-bold mb-1">{{userNickName}}</span>
                    <span>{{userInfo.userName}}</span>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list shaped>
                <profile-item @profileItemClick="profileChangeProfileItemClick">
                    <v-icon slot="profileItemIcon">{{profileItems.changeProfile.icon}}</v-icon>
                    <span slot="profileItemTitle">{{profileItems.changeProfile.title}}</span>
                </profile-item>
                <profile-item @profileItemClick="profileSignOutItemClick">
                    <v-icon slot="profileItemIcon">{{profileItems.signOut.icon}}</v-icon>
                    <span slot="profileItemTitle">{{profileItems.signOut.title}}</span>
                </profile-item>
            </v-list>
        </v-list>
    </div>
</template>

<script>
    import ProfileItem from "./CommonListItem";
    import Cookies from 'js-cookie';
    import {signOut} from "@/utils/network/user"
    import {mdiCardAccountDetails, mdiKeyboardBackspace} from "@mdi/js";
    export default {
        name: "Profile",
        components:{
            ProfileItem,
        },
        data:()=>({
            profileItems:
                {
                    changeProfile: {title: "Change Profile", icon: mdiCardAccountDetails},
                    signOut: {title: "Sign Out", icon: mdiKeyboardBackspace}
                },
        }),
        props:{
            userNickName:{
                type:String,
                default: "so sad"
            }
        },
        computed:{
            userInfo(){
                return this.$store.getters.getUserInfo
            }
        },

        methods:{
            profileChangeProfileItemClick(){
                console.log("change profile item clicked");
                this.$router.push("/changeProfile")
            },
            profileSignOutItemClick(){
                console.log("sign out item clicked");
                this.$store.commit("SIGN_OUT")
                signOut().then(res=>{
                    this.$router.push("/")
                    console.log("登出成功");
                }).catch(err=>{
                    this.$router.push("/")
                    console.log("登出失败:",err);
                })

            }
        }
    }
</script>

<style scoped>

</style>