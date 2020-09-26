<template>
    <div id="profile-item">
        <v-list-item @click="profileItemClick" class="d-flex justify-start">
            <v-list-item-icon class="ml-2 ">
                <slot  name="profileItemIcon"></slot>
            </v-list-item-icon>
            <v-list-item-title>
                <slot name="profileItemTitle"></slot>
            </v-list-item-title>
        </v-list-item>
    </div>

</template>

<script>
    export default {
        data: () => ({
        }),
        methods:{
            profileItemClick(){
                this.$emit("profileItemClick")
            }
        }
    }
</script>
<style scoped>

</style>