<template>
    <div class="container">
        <div>
            <el-button @click="pause" type="primary">暂缓</el-button>
            <el-button @click="failLoss" type="danger">挽回失败</el-button>
            <el-button @click="successLoss" type="success">成功挽回</el-button>
        </div>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top: 5px;"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="clOrderTime" label="上次下单时间" width="220" show-overflow-tooltip></el-table-column>
            <el-table-column prop="clPause" label="暂缓流失措施" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="clLossReason" label="确认流失原因" show-overflow-tooltip></el-table-column>
            <el-table-column prop="clLossTime" label="确认流失时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="状态" show-overflow-tooltip>
                <template mplate slot-scope="scope">{{ scope.row.clStatus|statusFilter }}</template>

            </el-table-column>

        </el-table>
        <div class="page">
            <el-pagination
                    @current-change="getLossHistory"
                    :page-size="pageSize"
                    background
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>

        <el-dialog
                title="暂缓措施"
                style="height: 100%;"
                :visible.sync="dialogPauseVisible"
                width="30%"
                :before-close="handleClose">
            <el-form>
                <el-form-item label="暂缓措施" label-width="80px">
                    <el-input class="line-with"
                              type="textarea"
                              style="height: 200px"
                              v-model="customerLoss.clPause" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogPauseVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitPause">提 交</el-button>
  </span>
        </el-dialog>

        <el-dialog
                title="流失原因"
                style="height: 100%;"
                :visible.sync="dialogReasonVisible"
                width="30%"
                :before-close="handleClose">
            <div class="line-box">
                <div class="line">
                    <span class="line-title">流失原因:</span>
                    <el-input class="line-with"
                              type="textarea"
                              v-model="customerLoss.clLossReason" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogPauseVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitReason">提 交</el-button>
  </span>
        </el-dialog>


    </div>
</template>

<script>
import {failLoss, getLossHistory, successLoss, pause} from "@/api";

export default {
    name: "LossHistory.vue",
    data() {
        return {
            cusId: 1,
            pageSize: 10,
            count: 1,
            currentPage: 1,
            tableData: [],
            multipleSelection: [],
            selected: [],
            dialogPauseVisible: false,
            dialogReasonVisible: false,
            title: "",
            customerLoss: {},
            action: '',
            reason: ''
        }
    },

    methods: {
        getLossHistory(page = 1) {
            this.currentPage = page
            getLossHistory(JSON.stringify({
                "page": this.currentPage,
                "pageSize": this.pageSize
            }), this.cusId).then((data => {
                this.tableData = data.data.data
                this.count = data.data.count
            }))
        },
        pause() {
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning('请选择一条数据');
            } else {
                this.dialogPauseVisible = true
                this.customerLoss = JSON.parse(JSON.stringify(this.$refs.multipleTable.selection[0]))
            }
        },
        submitPause() {
            pause(this.customerLoss).then(data => {
                this.$message.success(data.data.message)
                this.getLossHistory(this.currentPage)
                this.dialogPauseVisible = false
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        failLoss() {
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning('请选择一条数据');
            } else {
                this.dialogReasonVisible = true
                this.customerLoss = JSON.parse(JSON.stringify(this.$refs.multipleTable.selection[0]))
            }
        },
        submitReason() {
            failLoss(this.customerLoss).then(data => {
                this.$message.success(data.data.message)
                this.getLossHistory(this.currentPage)
                this.dialogReasonVisible = false
            })
        },
        successLoss() {
            if (this.$refs.multipleTable.selection.length === 0) {
                this.$message.warning('请选择一条数据');
            }
            let s = []
            this.$refs.multipleTable.selection.forEach(function (el) {
                s.push(el.clId)
                console.log(el)
            })
            successLoss(s).then(data => {
                this.$message.success(data.data.message)
                this.getLossHistory(this.currentPage)
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {
                });
        },

    },

    mounted() {
        this.getLossHistory()
    },
    beforeMount() {
        if (this.$route.query.cusId !== undefined) {
            this.cusId = this.$route.query.cusId
        }
    },
    filters: {
        statusFilter(val) {
            switch (val) {
                case 1:
                    return "预警"
                case 2:
                    return "暂缓"
                case 3:
                    return "流失"
                case 4:
                    return "挽回"
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