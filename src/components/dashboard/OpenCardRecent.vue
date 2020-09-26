<template>
    <div id="open-card-recent">
        <v-card width="500" class="mx-auto">
<!--            <v-card-title class="mx-auto">Recent</v-card-title>-->
            <v-card class=" d-flex flex-row justify-center" height="70" tile flat>
                <v-toolbar-title class="mt-4" tile flat>
                    <v-icon x-large class="mr-3 mb-4">{{icons.mdiClockTimeTen}}</v-icon>
                    <span class="text-uppercase text-h4 font-weight-bold">Recents</span>
                </v-toolbar-title>
            </v-card>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col v-for="(item, index) in shortRecentOpen" :key="item.index" cols="12">
<!--                            <v-card width="600" hover tile flat>-->
                                <open-card-recent-item :recentItem="item" :index="index" @removeRecent="removeRecent" @recentItemClicked="recentItemClicked"></open-card-recent-item>
<!--                                <v-card-text>{{item.title}}</v-card-text>-->
<!--                            </v-card>-->
                        </v-col>
                    </v-row>
<!--                    <v-row dense v-for="item in shortRecentOpen" align-self="center" :key="item.title" @click="openItem(item.title)">-->
<!--                        <v-card width="500" hover>-->
<!--                            <v-col cols="3" >-->
<!--                                {{item.time}}-->
<!--                            </v-col>-->
<!--                            <v-col cols="8">-->
<!--                                {{item.title}}-->
<!--                            </v-col>-->
<!--                        </v-card>-->
<!--                    </v-row>-->
                </v-container>
            </v-card-text>

        </v-card>
    </div>
</template>

<script>
    import OpenCardRecentItem from "./OpenCardRecentItem";
    import {
        mdiClockTimeTen
    } from '@mdi/js'

    export default {
        name: "OpenCardRecent",
        components:{
            OpenCardRecentItem,
        },
        data(){
            return{
                icons: {
                    mdiClockTimeTen,
                },
                recentOpen: [
                    {title: 'Two-line VBanner 能够存储大量数据，用于大量消息', time: '2020-6-23', id:1},
                    {title: 'Two-line VBanner 能够存储大量数据，用于大量消息', time: '2020-6-23', id:2},
                    {title: '当前基于深度学习的隐写分析模型基本都是CNN结构,很少有复杂的混合网络模型,没有将不同的神经网络的优势结合起来应用到隐写分析研究中', time: '2020-4-1', id:3},
                    {title: '当前基于深度学习的隐写分析模型基本都是CNN结构,很少有复杂的混合网络模型,没有将不同的神经网络的优势结合起来应用到隐写分析研究中', time: '2020-4-1', id:4},
                    {title: '当前基于深度学习的隐写分析模型基本都是CNN结构,很少有复杂的混合网络模型,没有将不同的神经网络的优势结合起来应用到隐写分析研究中', time: '2020-4-1', id:5},
                    {title: '深度学习近年来', time: '2020-7-1', id:6},
                    {title: '深度学习近年来', time: '2020-7-1', id:7},
                    {title: '在诸多模式识别领域里取得了巨大的成功,并逐渐应用在了图像隐写分析领域。', time: '2020-7-14', id:8},
                    {title: '在诸多模式识别领域里取得了巨大的成功,并逐渐应用在了图像隐写分析领域。', time: '2020-7-14', id:9},
                    {title: '在诸多模式识别领域里取得了巨大的成功,并逐渐应用在了图像隐写分析领域。', time: '2020-7-14', id:10},
                ],
            }
        },
        props: {
        },
        computed:{
            shortRecentOpen(){
                let tmp = this.recentOpen
                // 这里对上面的记录进行处理
                tmp.map(item => {
                    item.title =  item.title.substring(0, 28)+'...';
                });
                return tmp;
            }
        },
        methods: {
            openItem(itemLink){
                console.log("点击了 "+itemLink+"  ,即将打开。")
            },
            removeRecent(index){
                console.log("父组件收到了删除，马上执行删除："+index)
                this.recentOpen.splice(index, 1)
            },
            recentItemClicked(index){
                console.log("最近记录被点击了", this.recentOpen[index]);
            }
        }
    }
</script>

<style scoped>

</style>