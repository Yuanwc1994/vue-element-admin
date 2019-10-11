<template>
    <div class="inside_warpper">
        <div class="thePicker">
            <el-dropdown trigger="hover" @command="handleCommand">
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
                start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" value-format='yyyy-MM-dd'
                size="small">
            </el-date-picker>
            <span class="query_btn">查询</span>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane label="数据总览" name="first">
                <div>数据总览</div>
            </el-tab-pane>
            <el-tab-pane label="留资派单" name="second">
                留资派单
            </el-tab-pane>
            <el-tab-pane label="跟进数据" name="third">
                跟进数据
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: 'inside',
    data() {
        return {
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime());
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
            dateValue: [],
            activeName: 'first',
            orderType: '全部',
            orderTypeNum: '',
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab.label);
        },
        handleCommand(command, tab) {
            console.log(command, tab.$attrs.value);
            this.orderType = command;
            this.orderTypeNum = tab.$attrs.value;
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
            border: 1px solid #778ae9;
            margin-left: 15px;
            border-radius: 4px;
            background-color: #778ae9;
            color: #fff;
            cursor: pointer;
            user-select: none;
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
}
</style>
