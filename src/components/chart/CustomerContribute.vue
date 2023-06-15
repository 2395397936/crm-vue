<template>
    <div class="Echarts">
        <el-col :span="4" >
            <el-autocomplete
                class="inline-input"
                v-model="state1"
                :fetch-suggestions="querySearch"
                @select="handleSelect"
                placeholder="用户名称"
            ></el-autocomplete>
        </el-col>
            <el-button @click.native="submit">查询</el-button>

        <el-button @click.native="clear" type="warning">重置</el-button>
        <div id="main" style="width: 700px;height:500px;"></div>
    </div>
</template>

<script>
import {getCustomerAttribute, getCustomerAttributeByCusId, getCustomerName} from "@/api";

export default {
    name: "CustomerContribute",
    data(){
        return{
            xdata:[],
            sdata:[],
            customers: [],
            state: [],
            state1: '',
            cusId: '',
            amount:0
        }
    },
    methods: {
        myEcharts() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('main'));
            this.sum()
            // 指定图表的配置项和数据
            let option = {
                title: {
                    text: '客户消费总额'+this.amount+"元"
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
                    name: '总额',
                    type: 'bar',
                    data: this.sdata
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        querySearch(queryString, cb) {
            let customers = this.customers;
            let results = queryString ? customers.filter(this.createFilter(queryString)) : customers;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (customer) => {
                return (customer.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        submit(){
            getCustomerAttributeByCusId(this.cusId).then(data=>{
                if (data.data.items.length===0){
                    this.$message.info("该客户未消费")
                    return
                }
                this.xdata = data.data.items
                this.sdata = data.data.values
                this.myEcharts();
            })

        },
        handleSelect(item){
            this.cusId = item.name
        },
        clear(){
            getCustomerAttribute().then(data=>{
                this.xdata = data.data.items
                this.sdata = data.data.values
                this.myEcharts();
            })
        },
        sum(){
            let total = 0
            this.sdata.forEach(data=>{
                total += data
            })
            this.amount = total
        }
    },
    mounted() {
        getCustomerAttribute().then(data=>{
            this.xdata = data.data.items
            this.sdata = data.data.values
            this.myEcharts();
        })
        getCustomerName().then(data=>{
            this.state = data.data.data
            this.customers= this.state.map((x) => {
                return {
                    value: x.cusName,
                    name: x.cusId,
                };
            });
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