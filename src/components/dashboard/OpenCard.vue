<template>
    <div id="opencard">
        <v-container>
            <v-row >
                <v-col cols="12">
                    <slot name="openWays"></slot>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <slot name="openRecents"></slot>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "OpenCard"
    }
</script>

<style scoped>

</style>