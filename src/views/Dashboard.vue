<template>
    <div id="dashboard">
        <dashboard-nav-bar></dashboard-nav-bar>
        <open-card>
            <div slot="openWays">
                <open-ways>
                    <v-container>
                        <v-row>
                            <open-ways-item @openFile="openFileFromLocal">
                                <v-icon large slot="item-icon">{{icons.mdiLaptopMac}}</v-icon>
                                <span slot="item-text" class="text-uppercase">
                                    <h2>
                                        Open From Local
                                    </h2>
                                    </span>
                            </open-ways-item>
                        </v-row>

                        <v-row>
                            <open-ways-item @openFile="openFileFromCloud">
                                <v-icon large slot="item-icon">{{icons.mdiCloudOutline}}</v-icon>
                                <span slot="item-text" class="font-weight-bold text-uppercase">
                                    <h2>Open From Cloud</h2>
                                </span>
                            </open-ways-item>
                        </v-row>
                    </v-container>
                </open-ways>
            </div>
        <open-card-recent slot="openRecents"></open-card-recent>
        </open-card>

        <v-dialog width="30%" eager disabled>
            <v-card>
                <v-file-input v-model="pdfFromLocal" id="open-from-local-file-input" label="open pdf from local"><</v-file-input>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import OpenCard from "../components/dashboard/OpenCard";
    import OpenCardRecent from "../components/dashboard/OpenCardRecent";
    import OpenWays from "../components/dashboard/OpenWays";
    import OpenWaysItem from "../components/dashboard/OpenWaysItem";
    import DashboardNavBar from "../components/dashboard/DashboardNavBar";
    import {
        mdiCloudOutline,
        mdiLaptopMac,
        mdiAccountCircle,
        mdiMenu,
        mdiFeather

    } from '@mdi/js'
    export default {
        name: "Dashboard",
        components: {OpenWaysItem, OpenWays, OpenCardRecent, OpenCard, DashboardNavBar},
        data(){
            return{
                icons:{
                    mdiCloudOutline,
                    mdiLaptopMac,
                    mdiAccountCircle,
                    mdiMenu,
                    mdiFeather
                },
                pdfFromLocal:undefined,
            }
        },
        watch:{
            pdfFromLocal:function(){
                console.log("路由进入 /pdfView");
                this.$router.push("/pdfView")
            }
        },
        computed:{
            isOpenFromLocal(){
                return this.pdfFromLocal != undefined;
            }
        },
        methods:{
            openFileFromLocal(){
                console.log("从本地打开文件");
                document.getElementById("open-from-local-file-input").click()
                console.log("计算属性 isOpenFromLocal", this.pdfFromLocal != undefined)
                // if(this.pdfFromLocal != undefined){
                //     console.log("路由进入 /pdfView");
                //     this.$router.push("/pdfView")
                // }
            },
            openFileFromCloud(){
                console.log("从云端打开文件");
            }
        }
    }
</script>

<style scoped>
</style>