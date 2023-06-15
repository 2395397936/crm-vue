<template>
    <div class="container">
        <div>
            <el-button @click="updateBusinessRecord" type="primary">修改</el-button>
            <el-button @click="deleteBusinessRecord" type="danger">删除</el-button>
            <el-button @click="addBusinessRecord" type="success">新增</el-button>
        </div>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top: 5px;"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="brDate" label="日期" width="320" show-overflow-tooltip></el-table-column>
            <el-table-column prop="brAddr" label="地点" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="brDesc" label="概要" show-overflow-tooltip></el-table-column>
            <el-table-column prop="brInfo" label="详细信息" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cusId" label="客户编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="brSale" label="销售员" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                    @current-change="getBusinessRecordPage"
                    :page-size="pageSize"
                    background
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>

        <el-dialog
                :title="title"
                style="height: 100%;"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <div class="line-box">
                <div class="line">
                    <span class="line-title">地点:</span>
                    <el-input class="line-with" v-model="businessRecord.brAddr" placeholder="请输入内容"></el-input>
                </div>
            </div>


            <div class="line-box">
                <div class="line">
                    <span class="line-title">概要:</span>
                    <el-input class="line-with" v-model="businessRecord.brDesc" placeholder="请输入内容"></el-input>

                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">详细信息:</span>
                    <el-input class="line-with" v-model="businessRecord.brInfo" placeholder="请输入内容"></el-input>

                </div>
            </div>



            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
import {addBusinessRecord, deleteBusinessRecord, getBusinessRecordPage, updateBusinessRecord} from "@/api";

export default {
    name: "BusinessRecord",
    data() {
        return {
            cusId: 1,
            pageSize: 10,
            count: 1,
            currentPage: 1,
            tableData: [],
            multipleSelection: [],
            selected: [],
            dialogVisible: false,
            title: "",
            businessRecord: {},
        }
    },

    methods: {
        getBusinessRecordPage(page = 1) {

            // this.NProgress.start()
            this.currentPage = page
            getBusinessRecordPage(JSON.stringify({"page": this.currentPage, "pageSize": this.pageSize}),this.cusId).then((data => {
                this.tableData = data.data.data
                this.count = data.data.count
                // this.NProgress.done()
            }))
        },
        updateBusinessRecord() {
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning('请选择一条数据');
            } else {
                this.title = "修改"
                this.dialogVisible = true
                this.businessRecord = JSON.parse(JSON.stringify(this.$refs.multipleTable.selection[0]))
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        deleteBusinessRecord() {
            let s = []
            if (this.$refs.multipleTable.selection.length===0){
                this.$message.warning("请选择数据")
                return
            }
            this.$refs.multipleTable.selection.forEach(function (el) {
                s.push(el.brId)
            })
            deleteBusinessRecord(JSON.stringify(s)).then((data => {
                this.$message.success(data.data.message)
                this.getBusinessRecordPage(this.currentPage)
            }))
        },
        addBusinessRecord() {
            this.title = "增加"
            this.dialogVisible = true
            this.businessRecord = {}

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
                brAddr,
                brDesc,
                brInfo,
            } = this.businessRecord
            if ((brAddr && brDesc && brInfo )===undefined) {
                this.$message.warning("请输入完整信息")
                return
            }
            this.businessRecord.cusId = this.cusId
            switch (this.title) {
                case "增加":
                    addBusinessRecord(JSON.stringify(this.businessRecord)).then(data => {
                        this.$message.success(data.data.message)
                        this.getBusinessRecordPage(this.currentPage)
                        this.dialogVisible = false
                    })
                    break;
                case "修改":
                    updateBusinessRecord(JSON.stringify(this.businessRecord)).then(data => {
                        this.$message.success(data.data.message)
                        this.getBusinessRecordPage(this.currentPage)
                        this.dialogVisible = false
                    })
                    break;
            }
        }
    },

    mounted() {
        this.getBusinessRecordPage()
    },
    beforeMount() {
        if (this.$route.query.cusId!==undefined){
            this.cusId = this.$route.query.cusId
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