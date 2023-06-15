<template>
    <div class="container">
        <div>
            <el-button @click="search" type="primary">搜索归档文件</el-button>
            <el-button @click="clear" type="primary">重置条件</el-button>
            <el-button @click="detail" type="primary">查看明细</el-button>
        </div>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top: 5px;"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="servicesType" label="服务类型" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="servicesOutline" label="概要" width="50" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cusId" label="客户编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="servicesCreator" label="创建人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="servicesCtime" label="创建时间" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="servicesPerson" label="处理人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="servicesMethod" label="处理方法" show-overflow-tooltip></el-table-column>
            <el-table-column prop="servicesFeedback" label="客户反馈" show-overflow-tooltip></el-table-column>
            <el-table-column prop="servicesSatisfaction" label="满意度" show-overflow-tooltip></el-table-column>

        </el-table>
        <div class="page">
            <el-pagination
                    @current-change="getServiceList"
                    :page-size="pageSize"
                    background
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>

        <el-dialog
                title="查询归档文件"
                style="height: 100%;"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form :model="condition" label-width="100px" class="demo-ruleForm">
                <el-form-item label="客户满意度">
                    <el-select v-model="condition.servicesSatisfaction" placeholder="客户满意度">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="处理人">
                    <el-select
                            v-model="condition.servicesPerson" placeholder="处理人">
                        <el-option v-for="item in sales"
                                   :value="item.suName"
                                   :label="item.suName"
                                   :key="item.suId"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="日期范围">
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择开始日期" v-model="condition.date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择结束日期" v-model="condition.date2"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="clear">重置</el-button>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>
  </span>
        </el-dialog>

        <el-dialog title="详情" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="服务类型"><span>{{ props.row.servicesType }}</span></el-form-item>
                            <el-form-item label="概要" with="300"><span>{{ props.row.servicesOutline }}</span></el-form-item>
                            <el-form-item label="详细要求"><span>{{ props.row.servicesRequirement }}</span></el-form-item>
                            <el-form-item label="创建人"><span>{{ props.row.servicesCreator }}</span></el-form-item>
                            <el-form-item label="创建时间"><span>{{ props.row.servicesCtime }}</span></el-form-item>
                            <el-form-item label="状态"><span>{{ props.row.servicesState }}</span></el-form-item>
                            <el-form-item label="分配时间"><span>{{ props.row.servicesAtime }}</span></el-form-item>
                            <el-form-item label="处理人"><span>{{ props.row.servicesPerson }}</span></el-form-item>
                            <el-form-item label="处理方法"><span>{{ props.row.servicesMethod }}</span></el-form-item>
                            <el-form-item label="处理时间"><span>{{ props.row.servicesPtime }}</span></el-form-item>
                            <el-form-item label="客户反馈"><span>{{ props.row.servicesFeedback }}</span></el-form-item>
                            <el-form-item label="满意度"><span>{{ props.row.servicesSatisfaction }}</span></el-form-item>
                            <el-form-item label="反馈时间"><span>{{ props.row.servicesFtime }}</span></el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="servicesType" label="服务类型" width="80" show-overflow-tooltip></el-table-column>
                <el-table-column prop="servicesOutline" label="概要" width="50" show-overflow-tooltip></el-table-column>
                <el-table-column prop="cusId" label="客户编号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="servicesCreator" label="创建人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="servicesCtime" label="创建时间" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="servicesPerson" label="处理人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="servicesMethod" label="处理方法" show-overflow-tooltip></el-table-column>
                <el-table-column prop="servicesFeedback" label="客户反馈" show-overflow-tooltip></el-table-column>
                <el-table-column prop="servicesSatisfaction" label="满意度" show-overflow-tooltip></el-table-column>

            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import {getSales, getServiceList, searchService} from "@/api";

export default {
    name: "ServiceInfo",
    data() {
        return {
            pageSize: 10,
            count: 1,
            dialogTableVisible: false,
            gridData: [],
            currentPage: 1,
            tableData: [],
            multipleSelection: [],
            selected: [],
            dialogVisible: false,
            customer: {},
            condition: {
                status: 0,
                cPage: 1,
                date1: '',
                date2: '',
                servicesPerson: null,
                servicesSatisfaction: ''
            },
            sales:[]
        }
    },

    methods: {
        getServiceList(page = 1) {
            if (this.condition.status === 1) {
                this.condition.cPage = page
                this.searchService()
            } else {
                this.currentPage = page
                getServiceList(JSON.stringify({"page": this.currentPage, "pageSize": this.pageSize})).then((data => {
                    this.tableData = data.data.data
                    this.count = data.data.count
                }))
            }
        },
        detail() {
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning('请选择一条数据');
            } else {
                this.dialogTableVisible = true
                this.gridData = this.$refs.multipleTable.selection
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        search() {
            this.dialogVisible = true
            this.customer = {}
        },
        handleClose(done) {
            console.log(this.customer)
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {
                });
        },
        clear() {
            this.dialogVisible = false
            this.currentPage = 1
            this.condition = {
                status: 0,
                    cPage: 1,
                    date1: '',
                    date2: '',
                    servicesPerson: null,
                    servicesSatisfaction: ''
            }
            this.getServiceList(1)
        },
        submit() {
            this.condition.status = 1
            this.searchService()
            this.currentPage = 1
            this.dialogVisible = false
        },
        searchService() {
            this.currentPage = 1
            searchService(JSON.stringify({
                    "date1": this.condition.date1,
                    "date2": this.condition.date2,
                    "servicesPerson": this.condition.servicesPerson,
                    "servicesSatisfaction": this.condition.servicesSatisfaction,
                    "page": this.condition.cPage,
                    "pageSize": this.pageSize
                })
            ).then(data => {
                this.tableData = data.data.data
                this.count = data.data.count
            })
        }
    },

    mounted() {
        this.getServiceList()
        getSales().then(data=>{
            this.sales = data.data.data
        })
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

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>