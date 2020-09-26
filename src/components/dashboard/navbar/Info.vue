<template>
    <div id="dashboard-navbar-info">
        <v-list shaped>
            <common-list-item @profileItemClick = "aboutGumpReadItemClicked">
                <v-icon slot="profileItemIcon">{{infoItems.aboutGumpRead.icon}}</v-icon>
                <span slot="profileItemTitle">{{infoItems.aboutGumpRead.title}}</span>
            </common-list-item>
            <common-list-item @profileItemClick = "aboutAuthorItemClicked">
                <v-icon slot="profileItemIcon">{{infoItems.aboutAuthor.icon}}</v-icon>
                <span slot="profileItemTitle">{{infoItems.aboutAuthor.title}}</span>
            </common-list-item>
        </v-list>
    </div>

</template>

<script>
    import {
        mdiFish,
        mdiFeather,

    } from '@mdi/js';
    import CommonListItem from "./CommonListItem";
    export default {
        name: "Info",
        components:{
            CommonListItem,
        },
        data:()=>({
            infoItems:{
                aboutGumpRead:{title:"About Gump", icon:mdiFeather },
                aboutAuthor:{title:"About Athour", icon:mdiFish},
            }
        }),
        methods:{
            aboutGumpReadItemClicked(){
                console.log("aboutGumpReadItemClicked 被点击了");
                this.$router.push("/about/gump")
            },
            aboutAuthorItemClicked(){
                console.log("aboutAuthorItemClicked 被点击了");
                this.$router.push('/about/author')
            }
        }
    }
</script>

<style scoped>

</style>