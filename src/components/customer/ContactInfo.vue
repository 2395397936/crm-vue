<template>
    <div class="container">
        <div>
            <el-button @click="updateContact" type="primary">修改</el-button>
            <el-button @click="deleteContact" type="danger">删除</el-button>
            <el-button @click="addContact" type="success">新增</el-button>
        </div>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top: 5px;"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="conName" label="姓名" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="conSex" label="性别" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="conJob" label="职位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="conTel" label="办公电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="conPhone" label="手机号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="conDesc" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cusId" label="客户编号" show-overflow-tooltip></el-table-column>

        </el-table>
        <div class="page">
            <el-pagination
                    @current-change="getContactPage"
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
                    <span class="line-title">姓名:</span>
                    <el-input class="line-with" v-model="contact.conName" placeholder="请输入内容"></el-input>
                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">性别:</span>
                    <el-select v-model="contact.conSex" placeholder="请选择" class="line-with">
                        <el-option value="男">男</el-option>
                        <el-option value="女">女</el-option>
                    </el-select>
                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">职位:</span>
                    <el-input class="line-with" v-model="contact.conJob" placeholder="请输入内容"></el-input>

                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">办公电话:</span>
                    <el-input class="line-with" v-model="contact.conTel" placeholder="请输入内容"></el-input>

                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">手机号:</span>
                    <el-input class="line-with" v-model="contact.conPhone" placeholder="请输入内容"></el-input>

                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">备注:</span>
                    <el-input class="line-with" v-model="contact.conDesc" placeholder="请输入内容"></el-input>

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
import {addContact, deleteContact, getContactPage, updateContact} from "@/api";

export default {
    name: "ContactInfo",
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
            contact: {},
        }
    },

    methods: {
        getContactPage(page = 1) {

            // this.NProgress.start()
            this.currentPage = page
            getContactPage(JSON.stringify({"page": this.currentPage, "pageSize": this.pageSize}),this.cusId).then((data => {
                this.tableData = data.data.data
                this.count = data.data.count
                // this.NProgress.done()
            }))
        },
        updateContact() {
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning('请选择一条数据');
            } else {
                this.title = "修改"
                this.dialogVisible = true
                this.contact = JSON.parse(JSON.stringify(this.$refs.multipleTable.selection[0]))
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        deleteContact() {
            let s = []
            if (this.$refs.multipleTable.selection.length === 0) {
                this.$message.warning("请选择数据")
                return
            }
            this.$confirm('确定删除', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.$refs.multipleTable.selection.forEach(function (el) {
                    s.push(el.conId)
                    console.log(el)
                })
                deleteContact(JSON.stringify(s)).then((data => {
                    this.$message.success(data.data.message)
                    this.getContactPage(this.currentPage)
                }))
            }).catch(()=>{

            })


        },
        addContact() {
            this.title = "增加"
            this.dialogVisible = true
            this.contact = {}

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
                conName,
                conSex,
                conJob,
                conTel,
                conPhone,
                conDesc,
            } = this.contact
            if ((conName && conSex && conJob && conTel && conPhone && conDesc )===undefined) {
                this.$message.warning("请输入完整信息")
                return
            }

            switch (this.title) {
                case "增加":
                    this.contact.cusId = this.cusId
                    addContact(JSON.stringify(this.contact)).then(data => {
                        this.$message.success(data.data.message)
                        this.getContactPage(this.currentPage)
                        this.dialogVisible = false
                    })
                    break;
                case "修改":
                    updateContact(JSON.stringify(this.contact)).then(data => {
                        this.$message.success(data.data.message)
                        this.getContactPage(this.currentPage)
                        this.dialogVisible = false
                    })
                    break;
            }
        }
    },

    mounted() {
        this.getContactPage()
    },
    beforeMount() {
        if (this.$route.query.cusId!==undefined){
            this.cusId = this.$route.params.cusId
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