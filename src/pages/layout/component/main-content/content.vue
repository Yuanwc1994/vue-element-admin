<template>
    <transition name="fade-transform" mode="out-in">
        <router-view class="content"></router-view>
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
