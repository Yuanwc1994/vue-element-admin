<template>
    <div class="inside_warpper">
        <div class="thePicker">
            <el-dropdown trigger="click" @command="handleCommand">
                <el-button size="small" class="order_btn">
                    {{ orderType }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="全部" value="3">全部</el-dropdown-item>
                    <el-dropdown-item command="特权订金" value="2">特权订金</el-dropdown-item>
                    <el-dropdown-item command="意向客户" value="0">意向客户</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-date-picker v-model="dateValue" type="daterange" align="center" unlink-panels range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" value-format='yyyy-MM-dd HH:mm:ss'
                size="small" 
                >
            </el-date-picker>
            <span class="query_btn" @click="query()">查询</span>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane label="数据总览" name="0">
                <allData></allData>
                <variousIndicators></variousIndicators>
            </el-tab-pane>
            <el-tab-pane label="留资派单" name="1">
                留资派单
            </el-tab-pane>
            <el-tab-pane label="跟进数据" name="2">
                <div class="follow_warp">
                    <div class="follow_left">

                        <followUpData></followUpData>
                    </div>
                    <div class="follow_right">
                        1
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { formatTime } from '@/filters/filters'
import { mapState } from 'vuex'
import allData from './component/all-data'
import variousIndicators from './component/various-indicators'
import followUpData from './component/follow-up-data'
export default {
    name: 'inside',
    components: {
        allData,
        variousIndicators,
        followUpData,
    },
    data() {
        return {
            // 日期数据
            pickerOptions: {
                shortcuts: [{
                    text: '最近一天',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            activeName: '2', // 总览/留资/跟进 默认总览
            orderType: '全部', // 订单类型 名称

            orgId: "", //组织id
            dateValue: [], // 已选日期
            statistcsOrderType: "" // 全部/特权/意向
        };
    },
    computed: {
        ...mapState(['UserInfo'])
    },
    created() {
        this.orgId = this.UserInfo.orgId
        this.dateValue[0] = formatTime(new Date())
        this.dateValue[1] = formatTime(new Date())
        this.statistcsOrderType = '3'
    },
    mounted() {
        this.computdatas()
    },
    methods: {
        // tab数据切换
        handleClick(tab, event) {
            console.log(tab.index, tab.label);
            this.computdatas()
        },
        // 全部/特权/意向 选择
        handleCommand(command, tab) {
            console.log(command, tab.$attrs.value);
            this.orderType = command;
            this.statistcsOrderType = tab.$attrs.value;
        },
        //触发countDatas事件,数据总览的是countDatasAll,留资派单的是countDatasDispatch，跟进数据的是countDatasFollow
        computdatas() {
            let orgId = this.orgId
            let startDate = this.dateValue[0]
            let endDate = this.dateValue[1]
            let statistcsOrderType = this.statistcsOrderType
            let evenName = ""
            switch (this.activeName) {
                case '0':
                    evenName = "countDatasAll"
                    break;
                case '1':
                    evenName = "countDatasDispatch"
                    break;
                case '2':
                    evenName = "countDatasFollow"
                    break;
                default:
                    evenName = "countDatasAll"
            }
            console.log(evenName, orgId, startDate, endDate, statistcsOrderType);
            this.$EventBus.$emit(evenName, { startDate, endDate, statistcsOrderType, orgId });
        },
        // 查询
        query() {
            if (this.dateValue) {
                this.computdatas()
            } else {
                this.$message({
                    message: '请选择日期',
                    type: 'warning',
                    duration: '2000'
                });
            }
        },

    }
}
</script>

<style lang="scss" scoped>
.inside_warpper {
    position: relative;
    color: #606266;
    font-size: 14px;
    .thePicker {
        position: absolute;
        top: 0;
        left: 306px;
        z-index: 1;
        display: inline-block;
        vertical-align: middle;
        .query_btn {
            display: inline-block;
            width: 100px;
            height: 32px;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
            letter-spacing: 2px;
            vertical-align: top;
            border: 1px solid rgba(119, 138, 233, 1);
            margin-left: 15px;
            border-radius: 4px;
            background-color: rgba(119, 138, 233, 1);
            color: #fff;
            cursor: pointer;
            user-select: none;
            &:hover {
                border: 1px solid rgba(119, 138, 233, 0.8);
                background-color: rgba(119, 138, 233, 0.8);
            }
        }
        .order_btn {
            display: inline-block;
            margin-right: 15px;
            font-size: 14px;
            border-radius: 4px;
            height: 33px;
            width: 105px;
        }
    }
    .follow_warp {
        display: flex;
        justify-content: space-between;
        .follow_left {
            flex: 5;
            margin-right: 20px;
        }
        .follow_right {
            flex: 4;
        }
    }
}
</style>
