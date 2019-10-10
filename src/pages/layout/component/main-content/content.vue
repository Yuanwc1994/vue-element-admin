<template>
    <transition name="fade-transform" mode="out-in">
        <!-- <keep-alive> -->
            <router-view class="content" v-if="isRouterAlive"></router-view>
        <!-- </keep-alive> -->
    </transition>
</template>

<script>
export default {
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive: true
        }
    },
    mounted() {
        this.$EventBus.$on('refreshTag', () => {
            this.reload()
        })

    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(function () {
                this.isRouterAlive = true
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
