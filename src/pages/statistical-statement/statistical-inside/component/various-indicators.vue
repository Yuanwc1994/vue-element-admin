<template>
    <div class="various_indicators">
        <h3 class="titleName">各项指标排名</h3>
        <div class="options_box">
            <div class="item" :class="{act:list_type==='daqu'}" @click="list_type_event('daqu')">大区</div>
            <div class="item" :class="{act:list_type==='yingxiao'}" @click="list_type_event('yingxiao')">营销部</div>
            <div class="item" :class="{act:list_type==='jingxiao'}" @click="list_type_event('jingxiao')">经销部</div>
            <div class="item" :class="{act:list_type==='mendian'}" @click="list_type_event('mendian')">门店</div>
            <div class="item" :class="{act:list_type==='daogou'}" @click="list_type_event('daogou')">导购</div>
            <div class="item" :class="{act:list_type==='chengshi'}" @click="list_type_event('chengshi')">城市</div>
        </div>
        <!-- <template>
            <el-table :data="res_data" stripe max-height="650" :default-sort="{prop: 'paidCount', order: 'descending'}"
                :cell-class-name="addColumnClass" @header-click='headerClick' header-row-class-name='rowClass'
                :row-class-name="addRowClass" class="elTable">
                <el-table-column type="index" :index='1'></el-table-column>
                <el-table-column prop="orgName" :label="th1_name">
                    <template slot-scope="scope">
                        <span>{{ scope.row.orgName }}</span>
                        <span class="icon" v-if="list_type==='chengshi' && scope.row.isModel">
                            <img class
                                src="https://dpmall-product.oss-cn-shenzhen.aliyuncs.com/zhuxiaobaoNewImg/tj_icon_ybcs@2x.png"
                                alt />
                            <span>样板</span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="paidCount" label="派单数" sortable :sort-orders="sortOrders"
                    :sort-method="(a,b) => sortMethod(a ,b , 'paidCount')" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.paidCount }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="acceptTime" label="接单时效" sortable :sort-orders="sortOrders"
                    :sort-method="(a,b) => sortMethod(a ,b , 'acceptTime')" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.acceptTime }}h</span>
                    </template>
                </el-table-column>
                <el-table-column prop="invitedRate" label="邀约成功率" sortable :sort-orders="sortOrders"
                    :sort-method="(a,b) => sortMethod(a ,b , 'invitedRate')" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.invitedRate }}%</span>
                    </template>
                </el-table-column>
                <el-table-column prop="visitedRate" label="到店成功率" sortable :sort-orders="sortOrders"
                    :sort-method="(a,b) => sortMethod(a ,b , 'visitedRate')" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.visitedRate }}%</span>
                    </template>
                </el-table-column>
                <el-table-column prop="dealRate" label="成交率" sortable :sort-orders="sortOrders"
                    :sort-method="(a,b) => sortMethod(a ,b , 'dealRate')" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.dealRate }}%</span>
                    </template>
                </el-table-column>
            </el-table>
        </template> -->
        <div v-if="res_data.length===0" class="empty_data">暂无数据</div>
        <div class="scroll_box" v-if="res_data.length>0">
            <div class="table_1">
                <table class="table_css" border="0" cellpadding="0" cellspacing="0">
                    <tr class="first_tr">
                        <td class="p_left">
                            <div class="th_span_box">
                                <span style="opacity: 0;">序号</span>
                            </div>
                        </td>
                        <td>
                            <div class="th_span_box">
                                <span v-html="th1_name"></span>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(item,index) in res_data" :key="index" v-show="index<list_limit">
                        <td class="p_left" :class="{bold:index<3}">
                            <span>{{index+1}}</span>
                        </td>
                        <td :class="{bold:index<3}">
                            <span class="little_dt" @click="show_dt_index=index">
                                <span>{{item.orgName}}</span>
                                <div class="icon" v-if="list_type==='chengshi' && item.isModel">
                                    <img class
                                        src="https://dpmall-product.oss-cn-shenzhen.aliyuncs.com/zhuxiaobaoNewImg/tj_icon_ybcs@2x.png"
                                        alt />
                                    <span>样板</span>
                                </div>
                            </span>
                            <!-- <span class="show_dt" v-show="show_dt_index===index">{{item.orgName}}</span> -->
                        </td>
                    </tr>
                </table>
            </div>

            <div class="table_2">
                <table class="table_css" border="0" cellpadding="0" cellspacing="0">
                    <tr class="first_tr">
                        <td v-for="(item,index) in list_arr_sort_items" :key="'th'+index">
                            <div v-if="item.name!='null'" class="th_span_box" :class="[item.type]" @click="sort_list(index)">
                                <span>{{item.th_name}}<i class="paixu_img"></i></span>
                            </div>
                            <div v-if="item.name==='null'" class="th_span_box" :class="[item.type]">
                                <span>{{item.th_name}}</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(item,index) in res_data" :key="index" v-show="index<list_limit">
                        <td :class="[list_arr_sort_items[0].type,index<3?'bold':'']">{{item.paidCount?item.paidCount:'0'}}</td>
                        <td :class="[list_arr_sort_items[1].type,index<3?'bold':'']">{{item.acceptTime?item.acceptTime:'0'}}h</td>
                        <td :class="[list_arr_sort_items[2].type,index<3?'bold':'']">{{item.invitedRate}}%</td>
                        <td :class="[list_arr_sort_items[3].type,index<3?'bold':'']">{{item.visitedRate}}%</td>
                        <td :class="[list_arr_sort_items[4].type,index<3?'bold':'']">{{item.dealRate}}%</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="load_more" v-if="list_limit==10 && res_data.length>10">
            <span @click="load_more_event">
                加载全部数据
                <img src="https://dpmall-product.oss-cn-shenzhen.aliyuncs.com/zhuxiaobaoImg/fanhui-xia@3x.png" alt />
            </span>
        </div>
    </div>
</template>

<script>
import API from '@/api/permission.js'
import { mapState, mapMutations } from 'vuex'

export default {
    name: "various-indicators",
    data() {
        return {
            sortOrders: ['ascending', 'descending'], //el-table表格点击 升降循序
            property: 'paidCount', //el-table表格 某列的样式 的条件 

            list_limit: 10, //显示条数
            list_type: 'daqu', //大区名称
            show_dt_index: 'none', // 大区点击显示全称 
            list_arr_sort_items: [
                {
                    th_name: '派单数',
                    name: 'paidCount', // 值为null时 不显示排序按钮
                    type: 'normal',
                },
                {
                    th_name: '接单时效',
                    name: 'acceptTime',
                    type: 'normal',
                }, {
                    th_name: '邀约成功率',
                    name: 'invitedRate',
                    type: 'normal',
                }, {
                    th_name: '到店成功率',
                    name: 'visitedRate',
                    type: 'normal',
                }, {
                    th_name: '成交率',
                    name: 'dealRate',
                    type: 'normal',
                }],
            res_data: [],

            // 请求参数
            orgId: '',
            startDate: '',
            endDate: '',
            statistcsOrderType: ''
        }
    },
    computed: {
        th1_name: function (params) {
            switch (this.list_type) {
                case 'daqu':
                    return '大区'
                    break;
                case 'yingxiao':
                    return '营销部'
                    break;
                case 'jingxiao':
                    return '经销部'
                    break;
                case 'mendian':
                    return '门店'
                    break;
                case 'daogou':
                    return '导购'
                    break;
                case 'chengshi':
                    return '城市'
                    break;
                default:
                    return '大区'
                    break;
            }
        },
        searchArea: function () {
            switch (this.list_type) {
                case 'daqu':
                    return '1'
                    break;
                case 'yingxiao':
                    return '2'
                    break;
                case 'jingxiao':
                    return '3'
                    break;
                case 'mendian':
                    return '4'
                    break;
                case 'daogou':
                    return '5'
                    break;
                case 'chengshi':
                    return '6'
                    break;
                default:
                    return '1'
                    break;
            }
        },
    },
    mounted() {
        this.$EventBus.$on("countDatasAll", params => {
            console.log('各项指标', params);
            this.orgId = params.orgId;
            this.startDate = params.startDate;
            this.endDate = params.endDate;
            this.statistcsOrderType = params.statistcsOrderType;
            this.internalSortedOverView();
        });
    },
    beforeDestroy() {
        this.$EventBus.$off("countDatasAll")
    },
    methods: {
        // 表格自定义排序
        sortMethod(a, b, column) {
            var at = Number(a[column])
            var bt = Number(b[column])
            return at - bt
        },
        // 表格某列添加样式
        addColumnClass({ row, column, rowIndex, columnIndex }) {
            if (column.property == this.property && columnIndex != 0 && columnIndex != 1) {
                return 'redClass'
            }
        },
        // 表格行添加样式
        addRowClass({ row, rowIndex }) {
            if (rowIndex < 3) {
                return 'rowClass fwbold'
            } else {
                return 'rowClass'
            }
        },
        // 表格点击表头 列添加样式的判断条件
        headerClick(column, event) {
            this.property = column.property
        },

        // 切换大区/门店/城市等
        list_type_event(type) {
            if (this.list_type != type) {
                this.list_type = type
                this.internalSortedOverView();
            }
        },
        // 加载更多
        load_more_event() {
            this.list_limit = 99999999;
        },
        // 排序
        sort_list(index) {
            let res_data = this.res_data
            let type = this.list_arr_sort_items[index].type === 'down' ? 'up' : 'down'
            let name = this.list_arr_sort_items[index].name

            this.list_arr_sort_items.forEach(element => {
                element.type = 'normal';
            });
            this.list_arr_sort_items[index].type = type
            this.show_dt_index = 'none'
            res_data.sort(function (a, b) {
                var a = Number(a[name]);
                var b = Number(b[name])
                if (type === 'up') {
                    return a - b;
                } else if (type === 'down') {
                    return b - a;
                }
            })
        },
        // 请求表格数据
        internalSortedOverView() {
            let params = {
                sortType: this.searchArea,
                startDate: this.startDate,
                endDate: this.endDate,
                statistcsOrderType: this.statistcsOrderType
            }
            // 重置表格参数
            this.list_limit = 10; //表格最大行数
            this.show_dt_index = 'none'  //大区hover标题隐藏
            // this.property = '' // 列的颜色
            this.list_arr_sort_items.forEach(element => {
                element.type = 'normal';
            });
            // 请求数据
            API.internalSortedOverView(params).then(res => {
                this.res_data = res ? res : []
                this.sort_list(0)
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.various_indicators {
    position: relative;
    background-color: #fff;
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
    padding: 0 4px 30px;
    border: 1px solid #E4E7ED;
    border-radius: 10px;
    .titleName {
        color: #606266;
        font-weight: 900;
        font-size: 20px;
        padding: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #E4E7ED;
    }
    .options_box {
        position: absolute;
        top: 24px;
        right: 0;
        .item {
            display: inline-block;
            font-size: 18px;
            margin-right: 30px;
            cursor: pointer;
            user-select: none;
            &.act {
                position: relative;
                color: $fe6a5f;
                &::before {
                    content: ' ';
                    position: absolute;
                    z-index: 0;
                    width: 100%;
                    height: 2px;
                    left: 0;
                    bottom: -4px;
                    background: $fe6a5f;
                }
            }
        }
    }
    .empty_data {
        font-size: $f30;
        width: 100%;
        height: 250px;
        color: #ccc;
        line-height: 250px;
        text-align: center;
    }
    .scroll_box {
        display: flex;
        position: relative;
        right: 0;
        left: 0;
        margin: auto;
        width: 95%;

        .table_1 {
            table {
                background: $ff;
            }
            .th_span_box {
                padding-right: 10px;
                box-sizing: border-box;
            }
            .little_dt {
                padding-right: 10px;
                box-sizing: border-box;
                span {
                    padding-right: 5px;
                }
            }
        }
        .table_2 {
            .table_css {
                border-spacing: 0;
                table-layout: fixed;
                border-collapse: collapse;
                .th_span_box {
                    text-align: center;
                    cursor: pointer;
                    user-select: none;
                }
                td {
                    text-align: center;
                }
            }
        }
    }

    .table_css {
        width: 100%;
        // border-collapse: collapse;
        // border-spacing: 0;
        // table-layout: fixed;
        tr {
            height: 60px;
            &.first_tr {
                font-size: $f28;
                color: rgb(153, 153, 153);
            }
            &:nth-child(2n) {
                background: rgb(238, 238, 238);
            }
            td {
                font-size: $f18;
                position: relative;
                text-align: left;
                white-space: nowrap;
                font-family: 'Akrobat-Regular';
                &.up {
                    color: $fe3a50;
                }
                &.down {
                    color: $fe3a50;
                }
                &.bold {
                    font-weight: bold;
                }
                &.p_left {
                    padding-left: 40px;
                    padding-right: 10px;
                    span {
                        padding-right: 5px;
                    }
                }
                .little_dt {
                    display: flex;
                    padding-right: 0 !important;
                    .icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        // margin-right: 12px;
                        min-width: 96px;
                        img {
                            width: 25px;
                            height: 25px;
                            margin-right: 10px;
                        }
                        span {
                            // max-width: 48px;

                            color: $fe5057;
                            font-size: $f18;
                        }
                    }
                    & > span {
                        // width: 98px;
                        display: inline-block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    // padding: 0 10px;
                }
                .show_dt {
                    position: absolute;
                    left: 0px;
                    bottom: -20px;
                    background: #ffad71;
                    padding: 5px 20px !important;
                    border-radius: 10px;
                    &::before {
                        content: '';
                        position: absolute;
                        transform: rotate(180deg);
                        display: inline-block;
                        width: 0;
                        height: 0;
                        overflow: hidden;
                        left: 0;
                        top: -25px;
                        border-width: 16px;
                        border-style: solid dashed dashed dashed;
                        margin-right: 10px;
                        margin-bottom: 3px;
                        border-color: #ffad71 transparent transparent
                            transparent;
                    }
                }
                .th_span_box {
                    // display: flex;
                    // align-items: center;
                    span {
                        text-align: center;
                        vertical-align: middle;
                    }
                    .paixu_img {
                        display: inline-block;
                        vertical-align: middle;
                        width: 16px;
                        height: 20px;
                        margin-left: 5px;
                        background-position: 50% 50%;
                        background-repeat: no-repeat;
                        background-size: contain;
                        background-image: url('https://dpmall-product.oss-cn-shenzhen.aliyuncs.com/zhuxiaobaoNewImg/tj_updown-hui@2x.png');
                    }
                    &.up {
                        color: #333;
                        .paixu_img {
                            background-image: url('https://dpmall-product.oss-cn-shenzhen.aliyuncs.com/zhuxiaobaoNewImg/tj_updown-shengxu@2x.png');
                        }
                    }
                    &.down {
                        color: #333;
                        .paixu_img {
                            background-image: url('https://dpmall-product.oss-cn-shenzhen.aliyuncs.com/zhuxiaobaoNewImg/tj_updown-jiangxu@2x.png');
                        }
                    }
                }
            }
        }
    }
    .load_more {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: $f18;
        color: $c6;
        margin: 10px 0 10px;
        span {
            cursor: pointer;
            margin-right: 30px;
        }
        img {
            margin-left: 10px;
            width: 20px;
            height: 10px;
        }
    }
}
.elTable {
    width: 95%;
    margin: auto;
}
.cell {
    vertical-align: middle;
    .icon {
        img {
            width: 20px;
            height: 20px;
            margin-left: 10px;
            margin-right: 2px;
            vertical-align: middle;
        }
        span {
            color: $fe5057;
            font-size: $f14;
            vertical-align: middle;
        }
    }
}
</style>
<style lang="scss">
.redClass {
    color: $fe5057;
}
.rowClass {
    font-size: 16px;
}
.fwbold {
    .cell {
        font-weight: bold;
    }
}
.el-table {
    .ascending {
        .sort-caret.ascending {
            border-bottom-color: $fe3a50;
        }
    }
    .descending {
        .sort-caret.descending {
            border-top-color: #8d80be;
        }
    }
}
</style>

