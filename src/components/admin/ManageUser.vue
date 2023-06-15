<template>
    <div class="container">
        <div>
            <el-button @click="updateUser" type="primary">修改用户</el-button>
        </div>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top: 5px;"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="suName" label="用户名"></el-table-column>
            <el-table-column prop="suRole" label="用户角色" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                    @current-change="getSysUserList"
                    :page-size="pageSize"
                    background
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>

        <el-dialog
                title="更改权限"
                style="height: 100%;"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">

            <div class="line-box">
                <el-select v-model="sysUser.suRole">
                    <el-option-group>
                        <el-option value="SALES">SALES</el-option>
                        <el-option value="MANAGER">MANAGER</el-option>
                        <el-option value="ADMIN">ADMIN</el-option>
                    </el-option-group>
                </el-select>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
import {getSysUserList, updateUser} from "@/api";

export default {
    name: "ManageUser.vue",
    data() {
        return {
            pageSize: 10,
            count: 1,
            currentPage: 1,
            tableData: [],
            multipleSelection: [],
            selected: [],
            dialogVisible: false,
            sysUser: {},
        }
    },

    methods: {
        getSysUserList(page = 1) {
            // this.NProgress.start()
            this.currentPage = page
            getSysUserList(JSON.stringify({"page": this.currentPage, "pageSize": this.pageSize})).then((data => {
                this.tableData = data.data.data
                this.count = data.data.count
                // this.NProgress.done()
            }))
        },
        updateUser() {
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning('请选择一条数据');
            } else {
                this.dialogVisible = true
                this.sysUser = JSON.parse(JSON.stringify(this.$refs.multipleTable.selection[0]))
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
                suRole
            } = this.sysUser
            if (!suRole) {
                this.$message.warning("请输入完整信息")
                return
            }
            updateUser(this.sysUser).then((data)=>{
                this.dialogVisible = false
                this.$message.success(data.data.message)
                this.getSysUserList(this.currentPage)
            })
        }
    },

    mounted() {
        this.getSysUserList()
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