<template>
    <div class="all_data">
        <h2 class="titleName">{{ titleName }}</h2>
        <div class="content">
            <div class="funnel_box">
                <div class="funnel">
                    <img src="https://dpmall-product.oss-cn-shenzhen.aliyuncs.com/zhuxiaobaoNewImg/tj_ld_6g1@2x.png" alt />
                    <div class="proportion_list">
                        <div v-for="(item, index) in funnel" :key="index" class="item">
                            <p class="number">{{ item.number }}</p>
                            <div class="percent">
                                <span class="percentage"
                                    :class="parseFloat(item.growthRate) >= 0? 'upArrow':'downArrow'">{{ Math.abs(parseFloat(item.growthRate)) }}%</span>
                                <span class="txt">
                                    环比
                                    <span :class="parseFloat(item.growthRate) >= 0? 'upArrow':'downArrow'">
                                        <i></i>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <ul class="loss_list">
                        <li v-for="(item, index) in lostRateData" :key="index" class="item">
                            <span class="loss_percent">{{ Math.abs(parseFloat(item)) }}%</span>
                            <span class="txt">流失</span>
                        </li>
                    </ul>
                    <div class="cumulative">
                        累计成交数
                        <p class="cumu">{{cumulativeDealCount}}</p>
                    </div>
                </div>
            </div>
            <div class="detailed_box">
                <div v-for="(item, index) in detailed" :key="index" class="item">
                    <p class="item_title">{{ item.title }}</p>
                    <p class="item_value">{{ item.value }}</p>
                    <template>
                        <div class="item_precent">
                            <span class="percentage"
                                :class="parseFloat(item.growthRate) >= 0? 'upArrow':'downArrow'">{{ Math.abs(parseFloat(item.growthRate)) }}%</span>
                            <span class="txt">
                                &nbsp;环比
                                <span :class="parseFloat(item.growthRate) >= 0? 'upArrow':'downArrow'">
                                    <i></i>
                                </span>
                            </span>
                        </div>
                    </template>
                    <p class="item_subTitle" v-if="item.subTitle">{{ item.subTitle }}</p>
                    <p class="item_subValue" v-if="item.subValue">{{ item.subValue }}</p>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import API from '@/api/permission'
export default {
    name: 'all-data',
    data() {
        return {
            // ---漏斗图数据----
            titleName: "数据总览",
            funnel: [
                {
                    number: "0",
                    growthRate: "0"
                },
                {
                    number: "0",
                    growthRate: "0"
                },
                {
                    number: "0",
                    growthRate: "0"
                },
                {
                    number: "0",
                    growthRate: "0"
                },
                {
                    number: "0",
                    growthRate: "0"
                },
                {
                    number: "0",
                    growthRate: "0"
                }
            ],
            detailed: [
                {
                    title: "累计成交金额（元）",
                    value: "0",
                    growthRate: "0",
                    ranking: "0",
                    subTitle: "当前成交金额（元）",
                    subValue: "0"
                },
                {
                    title: "累计平均客单值（元）",
                    value: "0",
                    growthRate: "0",
                    ranking: "0",
                    subTitle: "当前平均客单值（元）",
                    subValue: "0"
                },
                {
                    title: "累计接单时效（H）",
                    value: "0",
                    growthRate: "0",
                    ranking: "0",
                    subTitle: "当前接单时效（H）",
                    subValue: "0"
                },
                {
                    title: "累计成交周期（天）",
                    value: "0",
                    growthRate: "0",
                    ranking: "0",
                    subTitle: "当前成交周期（天）",
                    subValue: "0"
                },
                {
                    title: "累计邀约成功率（%）",
                    value: "0",
                    growthRate: "0",
                    ranking: "0",
                    subTitle: "当前邀约成功率（%）",
                    subValue: "0"
                },
                {
                    title: "累计到店率（%）",
                    value: "0",
                    growthRate: "0",
                    ranking: "0",
                    subTitle: "当前到店率（%）",
                    subValue: "0"
                },
                {
                    title: "累计成交率（%）",
                    value: "0",
                    growthRate: "0",
                    ranking: "0",
                    subTitle: "当前成交率（%）",
                    subValue: ""
                },
                {
                    title: "累计订单反馈率（%）",
                    value: "0",
                    growthRate: "0",
                    ranking: "0",
                    subTitle: "当前订单反馈率（%）",
                    subValue: "0"
                }
            ],
            lostRateData: [],
            cumulativeDealCount: "",
            // 请求参数
            orgId: '',
            startDate: '',
            endDate: '',
            statistcsOrderType: ''

        }
    },
    created() {
    },
    mounted() {
        this.$EventBus.$on("countDatasAll", params => {
            this.orgId = params.orgId;
            this.startDate = params.startDate;
            this.endDate = params.endDate;
            this.statistcsOrderType = params.statistcsOrderType;
            this.internalOverView();
        });
    },
    beforeDestroy() {
        this.$EventBus.$off("countDatasAll");
    },
    methods: {
        // 获取漏斗图数据
        internalOverView() {
            let params = {
                orgId: this.orgId,
                startDate: this.startDate,
                endDate: this.endDate,
                statistcsOrderType: this.statistcsOrderType
            };
            API.internalOverView(params).then(res => {
                console.log("数据总览", res);
                // 流失率
                this.lostRateData[0] = res.lostRate4InternalData.infoToOrderLostRate;
                this.lostRateData[1] = res.lostRate4InternalData.orderToPaidLostRate;
                this.lostRateData[2] = res.lostRate4InternalData.paidToInvitedLostRate;
                this.lostRateData[3] = res.lostRate4InternalData.invitedToVisitedLostRate;
                this.lostRateData[4] = res.lostRate4InternalData.visitedToSuccessLostRate;
                // console.log(JSON.stringify(this.lostRateData, null, 2));

                // 累计成交数
                this.cumulativeDealCount = res.successData.cmSuccessCount;
                // 环比增长
                this.funnel[0].number = res.infoData.infoCount || 0;
                this.funnel[0].growthRate = res.infoData.infoCountThan || 0;
                this.funnel[1].number = res.infoData.toOrderCount || 0;
                this.funnel[1].growthRate = res.infoData.toOrderCountThan || 0;
                this.funnel[2].number = res.paidData.curPaidCount || 0;
                this.funnel[2].growthRate = res.paidData.paidCountGrowthRate || 0;
                this.funnel[3].number = res.invitedData.curInvitedCount || 0;
                this.funnel[3].growthRate = res.invitedData.invitedCountGrowthRate || 0;
                this.funnel[4].number = res.visitedData.curVisitedCount || 0;
                this.funnel[4].growthRate = res.visitedData.visitedCountGrowthRate || 0;
                this.funnel[5].number = res.successData.curSuccessCount || 0;
                this.funnel[5].growthRate = res.successData.successCountGrowthRate || 0;
                // console.log(JSON.stringify(this.funnel, null, 2));
                // 各项数据全国排名
                this.detailed[0].value = res.successData.cmDealAmount || 0;
                this.detailed[0].subValue = res.successData.curDealAmount || 0;
                this.detailed[0].growthRate = res.successData.dealAmountGrowthRate || 0;
                this.detailed[0].ranking = res.successData.dealAmountRank;

                this.detailed[1].value = res.successData.cumulativeAvgDealAmount || 0;
                this.detailed[1].subValue = res.successData.curAvgDealAmount || 0;
                this.detailed[1].growthRate = res.successData.avgDealAmountGrowthRate || 0;
                this.detailed[1].ranking = res.successData.avgDealAmountRank || 0;

                this.detailed[2].value = res.acceptEfficiencyData.cumulativeAvgAcceptTime || 0;
                this.detailed[2].subValue = res.acceptEfficiencyData.curAvgAcceptTime || 0;
                this.detailed[2].growthRate = res.acceptEfficiencyData.avgAcceptTimeGrowthRate || 0;
                this.detailed[2].ranking = res.acceptEfficiencyData.avgAcceptTimeRank || 0;

                this.detailed[3].value = res.successData.cumulativeAvgDealTime || 0;
                this.detailed[3].subValue = res.successData.avgDealTime || 0;
                this.detailed[3].growthRate = res.successData.avgDealTimeGrowthRate || 0;
                this.detailed[3].ranking = res.successData.avgDealTimeRank || 0;

                this.detailed[4].value = res.invitedData.cumulativeInvitedRate || 0;
                this.detailed[4].subValue = res.invitedData.invitedRate || 0;
                this.detailed[4].growthRate = res.invitedData.invitedRateThan || 0;

                this.detailed[5].value = res.visitedData.cumulativeVisitedRate || 0;
                this.detailed[5].subValue = res.visitedData.visitedRate || 0;
                this.detailed[5].growthRate = res.visitedData.visitedRateThan || 0;

                this.detailed[6].value = res.successData.cumulativeSuccessRate || 0;
                this.detailed[6].subValue = res.successData.curSuccessRate || 0;
                this.detailed[6].growthRate = res.successData.successRateGrowthRate || 0;
                this.detailed[6].ranking = res.successData.successRateRank || 0;

                this.detailed[7].value = res.paidData.cumulativeHandleRate || 0;
                this.detailed[7].subValue = res.paidData.handleRate || 0;
                this.detailed[7].growthRate = res.paidData.handleRateGrouthRate || 0;
                this.detailed[7].ranking = res.paidData.handleRateRank || 0;
                // console.log(JSON.stringify(this.detailed, null, 2));
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.all_data {
    background-color: #fff;
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
    padding: 0 4px;
    .titleName {
        color: #606266;
        font-weight: 900;
        font-size: 18px;
        padding: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #dcdcdc;
    }
    .content {
        display: flex;
    }
    .funnel_box {
        position: relative;
        display: inline-block;
        min-width: 600px;
        height: 374px;
        margin-bottom: 50px;
        clear: both;
        .funnel {
            position: absolute;
            width: 321px;
            height: 374px;
            top: 0;
            left: 0px;
            right: 0px;
            margin: auto;
            img {
                width: 100%;
                height: 100%;
            }
            .proportion_list {
                position: absolute;
                left: -50%;
                top: 0px;
                width: 300px;
                .item {
                    width: 100%;
                    text-align: right;
                    margin-bottom: 16px;
                    line-height: 1;

                    .percent {
                        .txt {
                            margin-right: -10px;
                        }
                    }
                    .number {
                        // float: right;
                        font-family: 'Akrobat-Bold';
                        font-weight: 900;
                        line-height: 30px;
                        font-size: 20px;
                        color: #606266;
                    }
                }
                .item:nth-child(1) {
                    padding-right: 152px;
                }
                .item:nth-child(2) {
                    padding-right: 131px;
                }
                .item:nth-child(3) {
                    padding-right: 107px;
                }
                .item:nth-child(4) {
                    padding-right: 85px;
                }
                .item:nth-child(5) {
                    padding-right: 58px;
                }
                .item:nth-child(6) {
                    padding-right: 37px;
                }
            }
            .loss_list {
                position: absolute;
                left: 50%;
                top: 0;
                padding-top: 40px;
                width: 300px;
                .item {
                    margin-bottom: 25px;
                    .loss_percent {
                        font-family: 'Akrobat-Bold';
                        font-size: 20px;
                        line-height: 38px;
                        color: #8d80be;
                    }
                }
                .item:nth-child(1) {
                    padding-left: 170px;
                }
                .item:nth-child(2) {
                    padding-left: 145px;
                }
                .item:nth-child(3) {
                    padding-left: 120px;
                }
                .item:nth-child(4) {
                    padding-left: 98px;
                }
                .item:nth-child(5) {
                    padding-left: 74px;
                }
            }
            .cumulative {
                position: absolute;
                bottom: -10px;
                right: 35px;
                .cumu {
                    font-family: 'Akrobat-Bold';
                    color: #606266;
                    font-weight: 900;
                    font-size: 20px;
                }
            }
        }
    }
    .detailed_box {
        min-width: 700px;
        max-width: 950px;
        display: inline-block;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 30px;
        .item {
            width: 200px;
            background-color: rgba(247, 247, 247, 0.7);
            margin-bottom: 15px;
            // text-align: center;
            border-radius: 20px;
            box-sizing: border-box;
            padding: 14px;
            .item_value {
                font-family: 'Akrobat-Bold';
                color: #606266;
                font-weight: 900;
                font-size: 18px;
            }
            .item_precent {
                // float: left;
                // width: 50%;
                // border-right: 1px solid rgba(153, 153, 153, 0.2); /* no */
                box-sizing: border-box;
                .percentage {
                    font-size: 14px;
                }
            }
            .item_ranking {
                margin-bottom: 0px;
                .ranking {
                    font-family: 'Akrobat-Regular';
                }
                .rankName {
                    color: #999;
                }
                .crown_icon {
                    width: 20px;
                    height: 18px;
                    margin-bottom: 1px;
                    margin-left: 10px;
                }
                .topThree {
                    color: #fe3a50;
                }
            }
            & > p {
                margin-bottom: 5px;
            }
            .item_subTitle {
                margin-top: 10px;
            }
            .item_subValue {
                font-family: 'Akrobat-Bold';
                color: #606266;
                margin-bottom: 0;
                font-size: 18px;
                font-weight: bold;
            }
        }
        .item:nth-child(1),
        .item:nth-child(2) {
            .item_value {
                font-size: 24px;
            }
        }
    }
    // currency arrow
    .percentage {
        font-size: 18px;
        font-family: 'Akrobat-Regular';
    }
    .upArrow {
        vertical-align: bottom;
        color: #fe3a50;
        i {
            transform: rotate(180deg);
            display: inline-block;
            width: 0;
            height: 0;
            overflow: hidden;
            border-width: 8px;
            border-color: #fe3a50 transparent transparent transparent;
            border-style: solid dashed dashed dashed;
            margin-right: 10px;
            margin-bottom: 0px;
        }
    }
    .downArrow {
        vertical-align: bottom;
        color: #8d80be;
        i {
            display: inline-block;
            width: 0;
            height: 0;
            overflow: hidden;
            border-width: 8px;
            border-color: #8d80be transparent transparent transparent;
            border-style: solid dashed dashed dashed;
            margin-right: 10px;
            margin-bottom: -8px;
        }
    }
    .txt {
        color: #999;
    }
}
</style>