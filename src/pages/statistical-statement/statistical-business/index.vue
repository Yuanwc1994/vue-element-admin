<template>
    <el-container>
        <el-header>
            <el-cascader v-model="selectedOptions" placeholder="请选择区域" :options="cascaderData" @expand-change="handleItemChange"
                :props="props" ref="areaCascader" :show-all-levels="false">
            </el-cascader>
        </el-header>
        <el-main>Main</el-main>
    </el-container>
</template>
<script>
import API from '@/api/permission'
export default {
    name: 'buiness',
    data() {
        return {
            departmentOptions: [],
            cascaderData: [],
            selectedOptions: [],
            props: {
                value: 'id',
                label: 'name',
                children: 'areas'
            }
        }
    },
    mounted() {
        this.getNodes()
    },
    methods: {
        getNodes(val) {
            console.log(11111, val);
            let idArea
            let sizeArea
            if (!val) {
                idArea = 54
                sizeArea = 0
            } else if (val.length === 1) {
                idArea = val[0]
                sizeArea = val.length // 3:一级 4:二级 6:三级
            } else if (val.length === 2) {
                idArea = val[1]
                sizeArea = val.length // 3:一级 4:二级 6:三级
            } else if (val.length === 3) {
                idArea = val[2]
                sizeArea = val.length // 3:一级 4:二级 6:三级
            }
            API.orgList(idArea).then(res => {
                let Items = res
                console.log(Items);
                if (sizeArea === 0) { // 初始化 加载一级 省
                    this.cascaderData = Items.childOrgs.map((value, i) => {
                        return {
                            id: value.id,
                            name: value.orgName,
                            areas: []
                        }
                    })
                } else if (sizeArea === 1) { // 点击一级 加载二级 市
                    this.cascaderData.map((value, i) => {
                        if (value.id === val[0]) {
                            if (!value.areas.length) {
                                value.areas = Items.childOrgs.map((value, i) => {
                                    return {
                                        id: value.id,
                                        name: value.orgName,
                                        areas: []
                                    }
                                })
                            }
                        }
                    })
                } else if (sizeArea === 2) { // 点击二级 加载三级 区
                    this.cascaderData.map((value, i) => {
                        if (value.id === val[0]) {
                            value.areas.map((value, i) => {
                                if (value.id === val[1]) {
                                    if (!value.areas.length) {
                                        value.areas = Items.childOrgs.map((value, i) => {
                                            return {
                                                id: value.id,
                                                name: value.orgName,
                                                areas: []
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                } else if (sizeArea === 3) { // 点击二级 加载三级 区
                    this.cascaderData.map((value, i) => {
                        if (value.id === val[0]) {
                            value.areas.map((value, i) => {
                                if (value.id === val[1]) {
                                    value.areas.map((value, i) => {
                                        if (value.id === val[2]) {
                                            if (!value.areas.length) {
                                                value.areas = Items.childOrgs.map((value, i) => {
                                                    return {
                                                        id: value.id,
                                                        name: value.orgName
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }, error => {
                console.log(error)
            })
        },
        handleItemChange(val) {
            this.getNodes(val)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
