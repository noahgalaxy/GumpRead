<template>
    <div id="open-card-item" >
        <v-card width="500" outlined shaped  hover class="mt-9">
            <v-container  @click="openFile">
                    <v-row>
                        <v-col cols="4" >
                            <v-card tile flat class="pl-8 mt-1" >
                                <slot name="item-icon"/>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card tile flat class="mt-1">
                                <slot name="item-text"/>
                            </v-card>
                        </v-col>
                    </v-row>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "OpenWaysItem",
        methods:{
            openFile(){
                console.log("openFileFromLocal,向父组件发射事件");
                this.$emit("openFile")
            }
        }
    }
</script>

<style scoped>

</style>