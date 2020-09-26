<template>
    <div id="left-side-drawer-item">
        <v-menu offset-x :close-on-click="true" :close-on-content-click="false" >
            <template v-slot:activator="{ on, attrs }">
                <v-card v-bind="attrs" v-on="on" height="40px" class="d-flex justify-center" :class="{activate: isActivate}" @click="itemSelfClicked(index)">
                    <v-icon color="white" class="pt-3">{{singleObject.mainIcon}}</v-icon>
                </v-card>
            </template>
            <v-tooltip right v-for="(item, index) in singleObject.subIcon" :key="index">
                <template v-slot:activator="{ on, attrs }">
                    <v-card v-bind="attrs" v-on="on" @click="subItemClicked(index)" height="40px" class="d-flex justify-center" :class="{activate:index == currentSubItemIndex}">
                        <v-icon class="mt-2">{{item.icon}}</v-icon>
                    </v-card>
                </template>
                <span>{{item.toolTip}}</span>
            </v-tooltip>
        </v-menu>
    </div>
</template>

<script>

    export default {
        name: "LeftSideDrawerItem",
        data:()=>({
            currentSubItemIndex:0,

        }),
        props:{
            globalCurrentIndex:'',
            index:'',
            singleObject:{
                type: Object,
                default:()=>({
                    mainIcon:undefined,
                    subIcon:[
                        {
                        id:'',
                        icon:undefined,
                        toolTip:''
                        },
                    ]
                })
            }
        },
        computed:{
            // 控制leftSideDrawer上面的主按钮被点击时后所应用的样式
            isActivate(){
                return this.globalCurrentIndex == this.index;
            },
        },

        methods:{
            // 子按钮被选中，改变
            subItemClicked(index){
                this.currentSubItemIndex = index;
            },

            /*
            主按钮被点击的时候，发出事件给父组件，父组件修改全局被点击按钮的index，然后因为子组件有props绑定了父组件的globalIndex，
            给子组件绑定了这个属性；
             */
            itemSelfClicked(index){
                console.log("itemSelfClicked");
                this.$emit("itemSelfClicked", index);
            },

            titleClicked(){
                console.log("title clicked");
            }
        },
    }
</script>

<style scoped>

    .activate{
        background-color: purple;
        color: white;

    }

</style>