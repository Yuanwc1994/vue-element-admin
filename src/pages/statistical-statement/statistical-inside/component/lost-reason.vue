<template>
    <div class="lostReason">
        <h2 class="lostReason-title">派失原因占比</h2>
        <div class="lostReason-main">
            <div class="lostReason-item" v-for="(item,index) in reasonData" :key="index">
                <div class="item-upPart">
                    <div class="upPart-left">{{index+1}}、{{item.name}}</div>
                    <div class="upPart-right">占比 <span class="upPart-right-sign">{{item.present}}%</span></div>
                </div>
                <div class="item-downPart">
                    <div class="downPart-bigLine">
                        <div class="downPart-bigLine-num">{{totalCount}}</div>
                        <div class="downPart-samllLine" :style="{'width':item.present+'%'}">{{item.number}}</div>
                    </div>
                </div>
            </div>
            <div class="addMore" v-if="showMore" @click="addMore">
                加载全部原因
                <div class="addMore-Img">
                    <img src="https://dpmall-product.oss-cn-shenzhen.aliyuncs.com/zhuxiaobaoImg/fanhui-xia@3x.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from "@/api/permission.js"
export default {
    data() {
        return {
            totalDatas: [],
            reasonData: [],
            showMore: false,
            totalCount: 0,
        }
    },
    mounted() {
        this.$EventBus.$on("countDatasFollow", (params) => {
            console.log('派失原因占比', params);
            API.paidFailedReasons(params).then(res => {
                this.totalCount = res.totalCount
                this.totalDatas = []
                res.datas.map(item => {
                    const param = {
                        name: item.name,
                        present: item.proportion,
                        number: item.count,
                    }
                    this.totalDatas.push(param)
                })
                if (this.totalDatas.length <= 5) {
                    this.reasonData = this.totalDatas
                    this.showMore = false
                } else {
                    this.reasonData = []
                    this.showMore = true
                    let num = 0
                    while (num < 5) {
                        this.reasonData.push(this.totalDatas[num])
                        num++
                    }
                }
            }).catch(err => {
                console.log(err);
            })
        })
    },
    beforeDestroy() {
        this.$EventBus.$off("countDatasFollow")
    },
    methods: {
        addMore() {
            this.reasonData = this.totalDatas
            this.showMore = false
        }
    }
}
</script>

<style lang="scss" scoped>
.lostReason {
    font-family: 'Akrobat-Regular';
    position: relative;
    background-color: #fff;
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
    padding: 0 4px 30px;
    border: 1px solid #e4e7ed;
    border-radius: 10px;
    .lostReason-title {
        color: #606266;
        font-weight: 900;
        font-size: 20px;
        padding: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #e4e7ed;
    }
}
.lostReason-item {
    padding: 0 30px 30px;
    .item-upPart {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .upPart-left {
            font-size: 16px;
        }
        .upPart-right {
            .upPart-right-sign {
                color: $fe3a50;
                font-weight: 900;
				font-size: 16px;
                font-family: 'Akrobat-Bold';
            }
        }
    }
    .item-downPart {
        padding-top: 10px;
        .downPart-bigLine {
            position: relative;
            width: 100%;
            height: 24px;
            border-radius: 18px;
            background-color: $ee;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            &-num {
                z-index: 1;
                padding-right: 30px;
                color: $c3;
            }
        }
        .downPart-samllLine {
            position: absolute;
            top: 0;
            left: 0;
            height: 24px;
            min-width: 36px;
            background-color: $fe6a5f;
            border-radius: 18px;
            color: $ff;
            display: flex;
            justify-content: center;
            align-items: center;
			transition: all 0.3s linear;
        }
    }
}
.addMore {
	margin-right: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: $f16;
    color: $c3;
	cursor: pointer;
}
.addMore-Img {
    padding-left: 10px;
    padding-top: 4px;
    img {
        display: block;
        width: 20px;
        height: 10px;
    }
}
</style>

