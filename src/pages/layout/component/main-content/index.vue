<template>
    <div class="main-container">
        <TopAside/>
        <TagsView/>
        <Content/>
    </div>
</template>

<script>
import TopAside from './top-aside'
import TagsView from './TagsView'
import Content from './content'
import { mapState } from 'vuex'

export default {
    data() {
        return {}
    },
    computed: {
        ...mapState(['isSidebarNavCollapse'])
    },
    components: {
        TopAside,
        TagsView,
        Content
    }
}
</script>
