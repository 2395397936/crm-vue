<template>
    <div class="container">


        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top: 5px;">
            <el-table-column prop="odrTime" label="订单日期" width="300" show-overflow-tooltip></el-table-column>
            <el-table-column prop="odrAmount" label="订单金额" width="120" show-overflow-tooltip>
                <template mplate slot-scope="scope">{{ scope.row.odrAmount}}元</template>

            </el-table-column>
            <el-table-column prop="odrShipto" label="送货地址" show-overflow-tooltip></el-table-column>
            <el-table-column label="订单状态" show-overflow-tooltip>
                <template mplate slot-scope="scope">{{ scope.row.odrStatus|statusFilter}}</template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                    @current-change="getOrders"
                    :page-size="pageSize"
                    background
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>


    </div>
</template>

<script>
import {getOrders} from "@/api";

export default {
    name: "OrdersHistory.vue",
    data() {
        return {
            pageSize: 10,
            count: 1,
            currentPage: 1,
            tableData: [],
        }
    },

    methods: {
        getOrders(page = 1) {
            // this.NProgress.start()
            this.currentPage = page
            getOrders(JSON.stringify({"page": this.currentPage, "pageSize": this.pageSize})).then((data => {
                this.tableData = data.data.data
                this.count = data.data.count
                // this.NProgress.done()
            }))
        },

    },

    mounted() {
        this.getOrders()
    },
    filters:{
        statusFilter(val){
            switch (val) {
                case 1:
                    return "未付款"
                case 2:
                    return "已付款"
                case 3:
                    return "已发货"
                case 4:
                    return "已收货"
                case 5:
                    return "已退货"

            }
        }
    }
}
</script>

<style scoped>
.container {

}

.page {
    position: fixed;
    bottom: 50px;
    margin-left: 100px;
}

.line-box {
    height: 30px;
    margin-bottom: 20px;
}

.line {
    position: relative;
}

.line-title {
    top: 10px;
    left: 20px;
    position: absolute;
}

.line-with {
    right: 20px;
    width: 300px;
    position: absolute;
}
</style>