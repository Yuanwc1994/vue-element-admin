<template>
    <div class="follow_up_data">
        <div class="titleName">跟进数据情况</div>
        <div class="data_box">
            <div class="item">
                <div class="value red">{{res.fllowingTitle?res.fllowingTitle:0}}</div>
                <div class="name">跟进总数</div>
                <div class="unit">(单)</div>
            </div>
            <div class="dividing"></div>
            <div class="item">
                <div class="value">{{res.fllowingNew?res.fllowingNew:0}}</div>
                <div class="name">新跟进数</div>
                <div class="unit">(单)</div>
            </div>
            <div class="dividing"></div>
            <div class="item">
                <div class="value">{{res.fllowingUsed?res.fllowingUsed:0}}</div>
                <div class="name">旧跟进数</div>
                <div class="unit">(单)</div>
            </div>
        </div>
    </div>
</template>
<script>
import API from "@/api/permission.js";
export default {
    name: 'follow-up-data',
    data() {
        return {
            res: {},
        }
    },
    mounted() {
        this.$EventBus.$on("countDatasFollow", params => {
            console.log("跟进数据情况", params);
            let something = {}
            something.orgId = params.orgId;
            something.orderType = params.statistcsOrderType;
            something.searchTimeStr = params.startDate;
            something.searchTimeEnd = params.endDate;
            this.getFllowingData(something);
        });
    },
    beforeDestroy() {
        this.$EventBus.$off("countDatasFollow")
    },
    methods: {
        getFllowingData(params) {
            API.getFllowingData(params).then(res => {
                this.res = res ? res : []
            }).catch(err => {
                console.log(err);

            })
        },
    }
}
</script>
<style lang="scss">
.follow_up_data {
    background-color: #fff;
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
    padding: 0 4px;
    border: 1px solid #e4e7ed;
    border-radius: 10px;
    overflow: auto;
    .titleName {
        color: #606266;
        font-weight: 900;
        font-size: 20px;
        padding: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #e4e7ed;
    }
    .data_box {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 10px 30px 30px;
        text-align: center;
        .item {
            color: $c6;
            font-size: $f20;
            padding: 0 20px;
            min-width: 130px;
            
            .value {
                font-family: 'Akrobat-Regular';
                color: $c3;
                font-size: $f40;
                margin-bottom: 20px;
                font-weight: bold;
                &.red {
                    color: $fe3a50;
                }
            }
            .name {
                margin-bottom: 6px;
            }
        }
        .dividing {
            height: 100px;
            width: 1px;
            background-color: #dcdcdc;
        }
    }
}
</style>
