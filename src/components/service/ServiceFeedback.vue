<template>
    <div class="container">
        <div>
            <el-button @click="updateService" type="primary">反馈</el-button>
        </div>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top: 5px;"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                    prop="servicesType"
                    label="服务类型"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="servicesOutline"
                    label="概要"
                    width="200"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="servicesRequirement"
                    label="详细要求"
                    width="200"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="cusId"
                    label="客户编号"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="servicesCreator"
                    label="创建人"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="servicesCtime"
                    label="创建时间"
                    width="200"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="servicesMethod"
                    label="处理方法"
                    width="200"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                    @current-change="getHandleServiceList"
                    :page-size="pageSize"
                    background
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>

        <el-dialog
                title="分配人员"
                style="height: 100%;"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">

            <div class="line-box">
                <el-form :model="services"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="客户满意度" prop="desc">
                        <el-select v-model="services.servicesSatisfaction" placeholder="请选择" class="line-with">
                            <el-option value="1">1</el-option>
                            <el-option value="2">2</el-option>
                            <el-option value="3">3</el-option>
                            <el-option value="4">4</el-option>
                            <el-option value="5">5</el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="客户反馈" prop="desc">
                        <el-input type="textarea" class="line" v-model="services.servicesFeedback"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
import {feedbackService, getHandleServiceList} from "@/api";

export default {
    name: "ServiceFeedback",
    data() {
        return {
            pageSize: 10,
            count: 1,
            currentPage: 1,
            tableData: [],
            multipleSelection: [],
            selected: [],
            dialogVisible: false,
            services: {},
        }
    },

    methods: {
        getHandleServiceList(page = 1) {
            // this.NProgress.start()
            this.currentPage = page
            getHandleServiceList(JSON.stringify({"page": this.currentPage, "pageSize": this.pageSize})).then((data => {
                this.tableData = data.data.data
                this.count = data.data.count
                // this.NProgress.done()
            }))
        },
        updateService() {
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning('请选择一条数据');
            } else {
                this.dialogVisible = true
                this.services = JSON.parse(JSON.stringify(this.$refs.multipleTable.selection[0]))
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {
                });
        },
        submit() {
            const {
                servicesPerson
            } = this.services
            if (servicesPerson ===undefined) {
                this.$message.warning("请输入完整信息")
                return
            }
            feedbackService(this.services).then(data=>{
                this.dialogVisible = false
                this.$message.success(data.data.message)
                this.getHandleServiceList(this.currentPage)
            })
        }
    },

    mounted() {
        this.getHandleServiceList()
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
    /*height: 200px;*/
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