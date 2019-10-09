<template>
    <transition name="fade-transform" mode="out-in">
        <keep-alive>
            <router-view class="content"></router-view>
        </keep-alive>
    </transition>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
</style>
