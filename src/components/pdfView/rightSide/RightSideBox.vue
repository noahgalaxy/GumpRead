<template>
    <div>
        <div>
            <div class="d-flex justify-start">
                <v-card :loading="translateBtnLoading" width="100px" tile flat>
                    <v-btn  @click="getSelectionText" text large >
                        <v-icon>{{icons.mdiIdeogramCjkVariant}}</v-icon>
                        <span>翻译</span>
                    </v-btn>
                </v-card>
                <v-card width="100px" tile flat>
                    <v-btn @click="selectedText = ''" text large>
                        <v-icon class="mr-2">{{icons.mdiBroom}}</v-icon>
                        <span>清空</span>
                    </v-btn>
                </v-card>
                <v-card tile flat>
                    <v-menu offset-y open-on-hover >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="automaticChangeEngin" text v-bind="attrs" v-on="on" large>
                                <v-icon class="mr-2">{{currentEngine.icon}}</v-icon>
                                <span>{{currentEngine.name}}</span>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(item, index) in translateEngine.choosenEngin" :key="index" @click="choseTranslateEngin(index)">
                                <v-icon class="mr-2">{{item.icon}}</v-icon>
                                <span>{{item.name}}</span>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card>
            </div>
        </div>
        <v-divider class="mb-5"></v-divider>
        <p>{{selectedText}}</p>
    </div>

</template>

<script>

    import {transToEng} from "@/utils/translate"
    import {
        mdiAlphaBCircleOutline,
        mdiAlphaGCircleOutline,
        mdiBroom,
        mdiIdeogramCjkVariant,
        mdiLinkVariant
    } from "@mdi/js";

    export default {
        name: "RightSideBox",
        data:()=>({
            selectedText:"未选中文本哦",
            icons:{
                mdiIdeogramCjkVariant,
                mdiBroom,
                mdiLinkVariant,
                mdiAlphaGCircleOutline
            },
            translateBtnLoading: false,
            translateEngine:{
                currentChoosedEnginIndex:0,
                choosenEngin:[
                    {
                        name:'谷歌翻译',
                        icon: mdiAlphaGCircleOutline ,
                    },
                    {
                        name:'百度翻译',
                        icon: mdiAlphaBCircleOutline ,
                    }
                ],
            }
        }),
        computed:{
            currentEngine(){
                let engins = this.translateEngine;
                return engins.choosenEngin[engins.currentChoosedEnginIndex] || {name:"引擎获取出错"};
            }
        },
        methods:{
            automaticChangeEngin(){
                let engins = this.translateEngine;
                this.translateEngine.currentChoosedEnginIndex = (engins.currentChoosedEnginIndex + 1) % engins.choosenEngin.length ;
            },

            choseTranslateEngin(translateEnginIndex){
                console.log("当前选择的翻译引擎："+translateEnginIndex);
                this.translateEngine.currentChoosedEnginIndex = translateEnginIndex;
            },
            getSelectionText(){
                // let selection = document.getElementById("pdf").contentWindow.getSelection().toString()
                let selection = window.getSelection().toString();
                let text = selection;
                if(selection != null || selection.trim() != '') {
                    this.translateBtnLoading = "purple";
                    console.log(text);
                    console.log("selection的类型是：",typeof text)
                    let _this = this;
                    transToEng(text).then((res)=>{
                        _this.selectedText = res.data.trans_result[0].dst;
                        _this.translateBtnLoading = false;
                    }).catch((err)=>{
                        _this.selectedText = "错误"
                        _this.translateBtnLoading = false;
                    })

                    // this.selectedText = selection
                    // let _this = this;
                    // setTimeout(()=>{
                    //     _this.translateBtnLoading = false;
                    // }, 1000)

                }
            },
        }
    }
</script>

<style scoped>

</style>