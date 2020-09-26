<template>
    <div id="left-side-draw-item">
        <v-navigation-drawer
                color="black"
                :mini-variant="true"
                :right="false"
                :permanent="true"
                :fixed="true"
                clipped="clipped"
                dark>
            <div style="height: 100px"></div>
<!--            <v-item-group>-->
<!--                <v-divider class="white"></v-divider>-->
<!--                <v-item>-->
<!--                    <left-side-drawer-item :single-object="firstLeftSideDrawerItem"></left-side-drawer-item>-->
<!--                </v-item>-->
<!--                <v-divider class="white"></v-divider>-->
<!--                <v-item>-->
<!--                    <left-side-drawer-item :single-object="secondLeftSideDrawerItem"></left-side-drawer-item>-->
<!--                </v-item>-->
<!--                <v-divider class="white"></v-divider>-->
<!--            </v-item-group>-->

<!--            <div class="d-flex flex-column">-->
<!--                <v-card-->
<!--                        v-for="n in 3"-->
<!--                        :key="n"-->
<!--                        class="pa-2"-->
<!--                        outlined-->
<!--                        @click=""-->
<!--                >-->
            <div class="d-flex flex-column justify-center">
                <left-side-drawer-item v-for="(item, index) in sideDrawerItems" :key="index"
                                       :single-object="item.drawerItem"
                                       :index="index"
                                       :global-current-index="currentItemIndex"
                                       @itemSelfClicked="itemSelfClicked"
                >
                </left-side-drawer-item>
            </div>


        </v-navigation-drawer>
    </div>

</template>

<script>
    import LeftSideDrawerItem from "./leftSideDrawerItem/LeftSideDrawerItem";
    import {
        mdiCursorDefaultOutline,
        mdiCursorPointer,
        mdiFormatText,
        mdiFormatColorHighlight

    } from '@mdi/js';
    export default {
        name: "LeftSideDrawer",
        components:{
            LeftSideDrawerItem,
        },
        data () {
            return {
                currentItemIndex: 0,
                isActivate: true,
                sideBarDrawer:{
                    fixed: true,
                    drawer: true,
                    color: 'black',
                    right: false,
                    permanent: true,
                    miniVariant: true,
                    expandOnHover: false,
                    background: false,
                },
                icons:{
                    mdiCursorDefaultOutline,
                    mdiCursorPointer,
                    mdiFormatText
                },
                sideDrawerItems:[
                    {
                        drawerItem:{
                            mainIcon: mdiCursorDefaultOutline,
                            subIcon:[
                                {
                                    id:1,
                                    icon:mdiCursorDefaultOutline,
                                    toolTip: "select",
                                },
                                {
                                    id:2,
                                    icon:mdiCursorPointer,
                                    toolTip: "Hand tool",
                                },
                            ]
                        }
                    },
                    {
                        drawerItem:{
                            mainIcon: mdiFormatText,
                            subIcon:[
                                {
                                    id:3,
                                    icon:mdiFormatText,
                                    toolTip: "Text tool",
                                },
                            ]
                        }
                    },
                    {
                        drawerItem:{
                            mainIcon: mdiFormatColorHighlight,
                            subIcon:[
                                {
                                    id:4,
                                    icon:mdiFormatColorHighlight,
                                    toolTip: "Brush"
                                }
                            ]
                        }
                    }
                ],
            }
        },
        methods:{
            itemSelfClicked(index){
                console.log("父组件收到了,并且修改了全局index: ",index);
                this.currentItemIndex = index;
            }
        }
    }
</script>

<style scoped>

    .activate{
        background: red;
    }

</style>