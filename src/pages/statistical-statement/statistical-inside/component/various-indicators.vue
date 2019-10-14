<template>
    <!-- 首页tabbar -->
    <div class="container">
        <h3 class="title">各项指标排名</h3>
        <div class="options_box">
            <div class="item" :class="{act:list_type==='daqu'}" @click="list_type_event('daqu')">大区</div>
            <div class="item" :class="{act:list_type==='yingxiao'}" @click="list_type_event('yingxiao')">营销部</div>
            <div class="item" :class="{act:list_type==='jingxiao'}" @click="list_type_event('jingxiao')">经销部</div>
            <div class="item" :class="{act:list_type==='mendian'}" @click="list_type_event('mendian')">门店</div>
            <div class="item" :class="{act:list_type==='daogou'}" @click="list_type_event('daogou')">导购</div>
            <div class="item" :class="{act:list_type==='chengshi'}" @click="list_type_event('chengshi')">城市</div>
        </div>
        <div v-if="res_data.length===0" class="empty_data">暂无数据</div>
        <div class="scroll_box" @touchmove.stop>
            <div class="table_1">
                <table class="table_css" border="0" cellpadding="0" cellspacing="0" v-if="res_data.length>0">
                    <tr class="first_tr">
                        <td class="p_left">
                            <div class="th_span_box">
                                <span style="opacity: 0;">序号</span>
                                <!-- <span class="paixu_img" :class="[list_arr_sort_items[index].type]"></span> -->
                            </div>
                        </td>
                        <td>
                            <div class="th_span_box">
                                <span v-html="th1_name"></span>
                            </div>
                        </td>
                    </tr>
                    <tr v-show="index<list_limit" v-for="(item,index) in res_data" :key="index">
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
                            <span class="show_dt" v-show="show_dt_index===index">{{item.orgName}}</span>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="table_2">
                <table class="table_css" border="0" cellpadding="0" cellspacing="0" v-if="res_data.length>0">
                    <tr class="first_tr">
                        <td v-for="(item,index) in list_arr_sort_items" :key="'th'+index"
                            :class="[(list_arr_sort_items.length==index+1)?'last':'']">
                            <div v-if="item.name!='null'" class="th_span_box" :class="[item.type]" @click="sort_list(index)">
                                <span v-html="item.th_name"></span>
                                <span class="paixu_img"></span>
                            </div>
                            <div v-if="item.name==='null'" class="th_span_box" :class="[item.type]">
                                <span v-html="item.th_name"></span>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(item,index) in res_data" :key="index" v-show="index<list_limit">
                        <td :class="[list_arr_sort_items[0].type,index<3?'bold':'']">{{item.paidCount?item.paidCount:'0'}}</td>
                        <td :class="[list_arr_sort_items[1].type,index<3?'bold':'']">{{item.acceptTime?item.acceptTime:'0'}}h</td>
                        <td :class="[list_arr_sort_items[2].type,index<3?'bold':'']">{{item.invitedRate}}%</td>
                        <td :class="[list_arr_sort_items[3].type,index<3?'bold':'']">{{item.visitedRate}}%</td>
                        <td class="p_right" :class="[list_arr_sort_items[4].type,index<3?'bold':'']">{{item.dealRate}}%</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="load_more" @click="load_more_event" v-if="list_limit==10&&res_data.length>10">
            加载全部数据
            <img src="https://dpmall-product.oss-cn-shenzhen.aliyuncs.com/zhuxiaobaoImg/fanhui-xia@3x.png" alt />
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
            list_limit: 10,
            list_type: 'daqu',
            seach_data: {},
            show_dt_index: 'none',
            list_arr_sort_items: [
                {
                    th_name: '派单<br />数',
                    name: 'paidCount',
                    type: 'normal',
                },
                {
                    th_name: '接单<br />时效',
                    name: 'acceptTime',
                    type: 'normal',
                }, {
                    th_name: '邀约<br />成功率',
                    name: 'invitedRate',
                    type: 'normal',
                }, {
                    th_name: '到店<br />成功率',
                    name: 'visitedRate',
                    type: 'normal',
                }, {
                    th_name: '成交<br />率',
                    name: 'dealRate',
                    type: 'normal',
                }],
            res_data: [],
        }
    },
    computed: {
        th1_name: function (params) {
            switch (this.list_type) {
                case 'daqu':
                    return '大区'
                    break;
                case 'yingxiao':
                    return '营销<br />部'
                    break;
                case 'jingxiao':
                    return '经销<br />部'
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
                    break;
            }
        },
    },
    mounted() {
        let _this = this;
        // _this.getSorted({ startDate: "2019-07-18 00:00:00", endDate: "2019-07-24 23:59:59", statistcsOrderType: "3", orgId: 1279, orgName: "" });

        /* this.$EventBus.$on("countDatasAll", function (params) {
            console.log('$on("countDatasAll"', params)
            _this.seach_data = params ? params : {}
            _this.internalSortedOverView();
        }); */
        _this.seach_data = {
            startDate: '2018-10-14 00:00:00',
            endDate: '2019-10-14 00:00:00',
            statistcsOrderType: '3',
        }
        _this.internalSortedOverView();

    },
    beforeDestroy() {
        this.$EventBus.$off("countDatasAll")
    },
    methods: {
        list_type_event(type) {
            this.list_type = type
            this.internalSortedOverView();
        },
        load_more_event() {
            this.list_limit = 99999999999999;
        },
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
        internalSortedOverView() {
            let _this = this;
            let params = {}

            _this.list_limit = 10;
            _this.show_dt_index = 'none'

            params.sortType = _this.searchArea;
            params.startDate = _this.seach_data.startDate;
            params.endDate = _this.seach_data.endDate;
            params.statistcsOrderType = _this.seach_data.statistcsOrderType;
            _this.list_arr_sort_items.forEach(element => {
                element.type = 'normal';
            });
            API.internalSortedOverView(params).then(res => {
                console.log(res);
                let list_type = _this.list_type
                _this.res_data = res ? res : []
                _this.sort_list(0)
            }).catch(function (error) {
                console.log(error);
                _this.res_data = []

            })
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    background: #fff;
    margin-top: 20px;
    padding: 50px 0px;
    color: rgb(51, 51, 51);
    .title {
        font-size: 0.453333rem;
        color: #333333;
        font-weight: 900;
        margin-bottom: 15px;
        padding: 0px 40px;
    }
    .scroll_box {
        display: flex;
        width: 100%;
        position: relative;

        .table_1 {
            width: 290px;
            position: absolute;
            z-index: 250;
            // box-shadow: 38px 0px 18px 528px #38383838;
            // box-shadow: 5px 0px 19px -5px #e2e2e2;
            table {
                background: $ff;
            }
            tr {
                box-shadow: 38px 0px 18px -28px #38383838;
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
            overflow-y: auto;
            padding-left: 290px;
            .table_css {
                width: 750px;
                border-spacing: 0;
                table-layout: fixed;
                border-collapse: collapse;
                .th_span_box {
                    text-align: center;
                }
                td {
                    padding: 0 20px;
                    box-sizing: border-box;
                    &.last {
                        padding-right: 38px;
                    }
                }
            }
        }
    }
    .options_box {
        display: flex;
        height: 60px;
        width: 630px;
        margin: 0 auto;
        margin-top: 39px;
        margin-bottom: 49px;
        border-radius: 30px;
        background: #eeeeee;
        .item {
            flex: 1;
            text-align: center;
            color: $c3;
            width: 50%;
            line-height: 60px;
            font-size: $f30;
            border-radius: 30px;

            &.act {
                position: relative;
                background: $fe3a50;
                color: $ff;
                &::before {
                    content: ' ';
                    position: absolute;
                    z-index: 0;
                    width: 24px;
                    height: 24px;
                    left: 50%;
                    bottom: 14px;
                    transform: translateY(100%) translateX(-50%) rotate(45deg);
                    background: $fe3a50;
                    border-radius: 6px;
                    // border-width: 12px;
                    // border-style: solid;
                    // border-color: $fe3a50 transparent transparent transparent;
                }
            }
        }
    }
    .empty_data {
        font-size: $f36;
        width: 100%;
        height: 250px;
        color: #ccc;
        line-height: 250px;
        text-align: center;
    }
    .table_css {
        width: 100%;
        // border-collapse: collapse;
        // border-spacing: 0;
        // table-layout: fixed;
        tr {
            height: 89px;
            &.first_tr {
                font-size: $f28;
                color: rgb(153, 153, 153);
            }
            &:nth-child(2n) {
                background: rgb(238, 238, 238);
            }
            td {
                font-size: $f30;
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
                    max-width: 25px;
                    padding-left: 40px;
                    padding-right: 10px;
                    span {
                        padding-right: 5px;
                    }
                }
                &.p_right {
                    padding-right: 20px;
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
                            width: 36px;
                            height: 36px;
                            margin-right: 10px;
                        }
                        span {
                            // max-width: 48px;

                            color: $fe5057;
                            font-size: $f24;
                        }
                    }
                    & > span {
                        width: 98px;
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
                    display: flex;
                    align-items: center;
                    span {
                        text-align: center;
                    }
                    .paixu_img {
                        display: block;
                        width: 20px;
                        height: 25px;
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
        justify-content: center;
        font-size: $f26;
        color: $c3;
        text-align: center;
        margin: 38px 0;
        margin-bottom: 10px;
        img {
            margin-left: 10px;
            width: 25px;
            height: 14px;
        }
    }
}
</style>

