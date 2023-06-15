<template>
    <div class="container">
        <div>
            <el-button @click="updateCustomer" type="primary">修改</el-button>
            <el-button @click="deleteCustomer" type="danger">删除</el-button>
            <el-button @click="addCustomer" type="success">新增</el-button>
            <el-button @click="contact" type="info">查看联系人</el-button>
            <el-button @click="record">维护客户</el-button>
        </div>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top: 5px;"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="cusName" label="名称" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cusRegion" label="客户地区" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cusIndustry" label="客户行业" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cusLevel" label="客户等级" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cusRate" label="客户满意度" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cusCredit" label="客户信用度" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cusAddr" label="客户地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cusPostcode" label="客户邮编" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cusPhone" label="客户电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cusUrl" label="客户网址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cusFax"label="客户传真" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                    @current-change="getCustomerList"
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
                    <span class="line-title">客户名称:</span>
                    <el-input class="line-with" v-model="customer.cusName" placeholder="请输入内容"></el-input>
                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">客户地区:</span>
                    <el-select v-model="customer.cusRegion" placeholder="请选择" class="line-with">
                        <el-option value="东北">东北</el-option>
                        <el-option value="西北">西北</el-option>
                        <el-option value="华北">华北</el-option>
                        <el-option value="华中">华中</el-option>
                        <el-option value="华南">华南</el-option>
                        <el-option value="西南">西南</el-option>
                        <el-option value="华东">华东</el-option>
                    </el-select>
                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">客户行业:</span>
                    <el-select v-model="customer.cusIndustry" placeholder="请选择" class="line-with">
                        <el-option value="教育">教育</el-option>
                        <el-option value="医疗">医疗</el-option>
                        <el-option value="金融">金融</el-option>
                        <el-option value="制造">制造</el-option>
                        <el-option value="服务">服务</el-option>
                    </el-select>
                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">客户等级:</span>
                    <el-select v-model="customer.cusLevel" placeholder="请选择" class="line-with">
                        <el-option value="VIP客户">VIP客户</el-option>
                        <el-option value="大客户">大客户</el-option>
                        <el-option value="普通客户">普通客户</el-option>
                    </el-select>
                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">客户满意度:</span>
                    <el-select v-model="customer.cusRate" placeholder="请选择" class="line-with">
                        <el-option value="1">一星</el-option>
                        <el-option value="2">二星</el-option>
                        <el-option value="3">三星</el-option>
                        <el-option value="4">四星</el-option>
                        <el-option value="5">五星</el-option>
                    </el-select>
                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">客户评价:</span>
                    <el-select v-model="customer.cusCredit" placeholder="请选择" class="line-with">
                        <el-option value="1">一星</el-option>
                        <el-option value="2">二星</el-option>
                        <el-option value="3">三星</el-option>
                        <el-option value="4">四星</el-option>
                        <el-option value="5">五星</el-option>
                    </el-select>
                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">客户地址:</span>
                    <el-input class="line-with" v-model="customer.cusAddr" placeholder="请输入内容"></el-input>
                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">客户邮编:</span>
                    <el-input class="line-with" v-model="customer.cusPostcode" placeholder="请输入内容"></el-input>
                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">客户电话:</span>
                    <el-input class="line-with" v-model="customer.cusPhone" placeholder="请输入内容"></el-input>
                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">客户网址:</span>
                    <el-input class="line-with" v-model="customer.cusUrl" placeholder="请输入内容"></el-input>
                </div>
            </div>

            <div class="line-box">
                <div class="line">
                    <span class="line-title">客户传真:</span>
                    <el-input class="line-with" v-model="customer.cusFax" placeholder="请输入内容"></el-input>
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
import {addCustomer, deleteCustomer, getCustomerList, updateCustomer} from "@/api";

export default {
    name: "CustomerInfo",
    data() {
        return {
            pageSize: 10,
            count: 1,
            currentPage: 1,
            tableData: [],
            multipleSelection: [],
            selected: [],
            dialogVisible: false,
            title: "",
            customer: {},
            gridData:[]
        }
    },

    methods: {
        getCustomerList(page = 1) {
            // this.NProgress.start()
            this.currentPage = page
            getCustomerList(JSON.stringify({"page": this.currentPage, "pageSize": this.pageSize})).then((data => {
                this.tableData = data.data.data
                this.count = data.data.count
                // this.NProgress.done()
            }))
        },
        updateCustomer() {
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning('请选择一条数据');
            } else {
                this.title = "修改"
                this.dialogVisible = true
                this.customer = JSON.parse(JSON.stringify(this.$refs.multipleTable.selection[0]))
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        deleteCustomer() {
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
                    s.push(el.cusId)
                    console.log(el)
                })
                deleteCustomer(JSON.stringify(s)).then((data => {
                    this.$message.success(data.data.message)
                    this.getCustomerList(this.currentPage)
                }))
            }).catch(()=>{

            })

        },
        addCustomer() {
            this.title = "增加"
            this.dialogVisible = true
            this.customer = {}

        },
        contact(){
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning('请选择一条数据');
            } else {
                this.$router.push({path:'/home/contactInfo/'+this.$refs.multipleTable.selection[0].cusId})
            }
        },
        record(){
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning('请选择一条数据');
            } else {
                this.$router.push({path:'/home/businessRecord',query:{cusId:this.$refs.multipleTable.selection[0].cusId}})
            }
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
                cusName,
                cusRegion,
                cusIndustry,
                cusLevel,
                cusRate,
                cusCredit,
                cusAddr,
                cusPostcode,
                cusPhone,
                cusUrl,
                cusFax
            } = this.customer
            if ((cusName && cusRegion && cusIndustry && cusLevel && cusRate && cusCredit && cusAddr && cusPostcode && cusPhone && cusUrl && cusFax)===undefined) {
                this.$message.warning("请输入完整信息")
                return
            }

            switch (this.title) {
                case "增加":
                    addCustomer(JSON.stringify(this.customer)).then(data => {
                        this.$message.success(data.data.message)
                        this.getCustomerList(this.currentPage)
                        this.dialogVisible = false
                    })
                    break;
                case "修改":
                    updateCustomer(JSON.stringify(this.customer)).then(data => {
                        this.$message.success(data.data.message)
                        this.getCustomerList(this.currentPage)
                        this.dialogVisible = false
                    })
                    break;
            }
        }
    },

    mounted() {
        this.getCustomerList()
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