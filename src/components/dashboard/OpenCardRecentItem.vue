<template>
    <div id="open-card-recent-item">
        <v-card outlined shaped hover>
            <div class="d-flex flex-nowrap justify-space-between">
                <v-card-subtitle @click="recentItemClicked(index)">{{recentItem.time}}</v-card-subtitle>
                <v-card-actions>
                    <v-btn icon @click="removeRecent(index)">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-card-actions>
            </div>
            <div @click="recentItemClicked(index)" >
                <v-card-text >{{recentItem.title}}</v-card-text>
            </div>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "OpenCardRecentItem",
        props:{
            recentItem:{
                type: Object,
                default: undefined
            },
            index: {
                type: Number,
                default: -1
            },
        },
        methods:{
            removeRecent(index){
                if(index != -1){
                    console.log("子组件点击删除"+index);
                    this.$emit("removeRecent", index)
                }
            },
            recentItemClicked(index){
                if(index != -1){
                    // console.log("子组件点击打开最近："+index);
                    this.$emit("recentItemClicked", index)
                }

            }
        }
    }
</script>

<style scoped>

</style>