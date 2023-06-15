<template>
    <div class="Echarts">
        <div id="main" style="width: 700px;height:500px;"></div>
    </div>
</template>

<script>
import {getCustomerServices} from "@/api";

export default {
    name: "CustomerRateAndCredit.vue",
    data() {
        return {
            xdata: [],
            sdata: [],
            customers: [],
            state: [],
            state1: '',
            cusId: '',
            amount: 0
        }
    },
    methods: {
        myEcharts() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('main'));
            // 指定图表的配置项和数据
            let option = {
                title: {
                    text: this.title
                },
                tooltip: {},
                legend: {
                    // data:['销量']
                },
                xAxis: {
                    data: this.xdata
                },
                yAxis: {},
                series: [{
                    name: '数量',
                    type: 'bar',
                    data: this.sdata
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },


    },

    mounted() {
        getCustomerServices().then(data=>{
            this.title = "服务类型"
            this.xdata = data.data.items
            this.sdata = data.data.values
            this.myEcharts();
        })
    }
}
</script>

<style scoped>
#main{
    position: relative;
    left: 200px;
    top: 50px;
}

.el-col{
    margin-left: 400px;
}
</style>