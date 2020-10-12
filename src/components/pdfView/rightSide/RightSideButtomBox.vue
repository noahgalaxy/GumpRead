<template>
    <div id="rightside-buttom-box">
        <div>
            <v-btn large fab outlined :loading="translateBtnLoading" color="purple" @click="getSelectionText">
                <span style="font-family: Georgia;font-size:17px">翻译</span>
            </v-btn>
        </div>

        <div v-show="showTranslateResult" >
            <v-card max-width="20%" style="position: fixed; right: 0px">
                <v-card-text>
                    {{selectedText}}
                </v-card-text>
            </v-card>
<!--            <p style="background-color: white;max-width: 20% ;right: 0px ;position: fixed; border-radius: 10px">{{selectedText}}</p>-->
        </div>
    </div>
</template>



<script>
    import {transToEng} from "@/utils/translate"
    import {
        mdiIdeogramCjkVariant,

    } from '@mdi/js';

    export default {
        name: "RightSideButtomBox",
        data:()=>({
            selectedText:"未选中文本哦",
            showTranslateResult: false,
            translateBtnLoading: false,
            icons:{
                mdiIdeogramCjkVariant,
            }
        }),
        methods:{
            getSelectionText(){
                // let selection = document.getElementById("pdf").contentWindow.getSelection().toString()
                let selection = window.getSelection().toString();
                let text = selection;
                if(selection != null || selection.trim() != '') {
                    this.translateBtnLoading = "white";
                    console.log(text);
                    console.log("selection的类型是：",typeof text)
                    let _this = this;
                    transToEng(text).then((res)=>{
                        _this.selectedText = res.data.trans_result[0].dst;
                        _this.translateBtnLoading = false;
                        _this.showTranslateResult = true;
                    }).catch((err)=>{
                        _this.selectedText = "错误"
                        _this.translateBtnLoading = false;
                        _this.showTranslateResult = true;
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