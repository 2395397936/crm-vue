import requests from './ajax'
// Customer
export const getCustomerList = (params) => requests({url: '/customer/all', method: 'post', data:params})
export const updateCustomer = (params) => requests({url: '/customer/update', method: 'post', data:params})
export const addCustomer = (params) => requests({url: '/customer/add', method: 'post', data:params})
export const getCustomerName = (params) => requests({url: '/customer/name', method: 'get'})

export const deleteCustomer = (params) => requests({url: '/customer/delete', method: 'post', data:params})
// Contact
export const getContactPage = (params,cusId) => requests({url: '/contact/getContactPage/'+cusId, method: 'post', data:params})
export const updateContact = (params) => requests({url: '/contact/update', method: 'post', data:params})
export const addContact = (params) => requests({url: '/contact/add', method: 'post', data:params})
export const deleteContact = (params) => requests({url: '/contact/delete', method: 'post', data:params})

// BusinessRecord
export const getBusinessRecordPage = (params,cusId) => requests({url: '/businessRecord/getPage/'+cusId, method: 'post', data:params})
export const updateBusinessRecord = (params) => requests({url: '/businessRecord/update', method: 'post', data:params})
export const addBusinessRecord = (params) => requests({url: '/businessRecord/add', method: 'post', data:params})
export const deleteBusinessRecord = (params) => requests({url: '/businessRecord/delete', method: 'post', data:params})

// Service
export const getServiceList = (params) => requests({url: '/services/all/archive', method: 'post', data:params})
export const getNewServiceList = (params) => requests({url: '/services/all/new', method: 'post', data:params})
export const getAssignServiceList = (params) => requests({url: '/services/all/assign', method: 'post', data:params})
export const getHandleServiceList = (params) => requests({url: '/services/all/handle', method: 'post', data:params})
export const assignService = (params) => requests({url: '/services/assign', method: 'post', data:params})
export const handleService = (params) => requests({url: '/services/handle', method: 'post', data:params})
export const feedbackService = (params) => requests({url: '/services/feedback', method: 'post', data:params})
export const addService = (params) => requests({url: '/services/add', method: 'post', data:params})
export const deleteService = (params) => requests({url: '/services/delete', method: 'post', data:params})
export const searchService = (params) => requests({url: '/services/search', method: 'post', data:params})

// saleChance
export const addSaleChance = (params) => requests({url: '/saleChance/add', method: 'post', data:params})
export const deleteSaleChance = (params) => requests({url: '/saleChance/delete', method: 'post', data:params})
export const assignSaleChance = (params) => requests({url: '/saleChance/assign', method: 'post', data:params})
export const getSaleChance = (params) => requests({url: '/saleChance/all', method: 'post', data:params})
export const updateSaleChance = (params) => requests({url: '/saleChance/update', method: 'post', data:params})

// devPlan
export const addDevPlan = (params) => requests({url: '/devPlan/add', method: 'post', data:params})
export const deleteDevPlan = (params) => requests({url: '/devPlan/delete', method: 'post', data:params})
export const updateDevPlan = (params) => requests({url: '/devPlan/update', method: 'post', data:params})
export const executeDevPlan = (params) => requests({url: '/devPlan/execute', method: 'post', data:params})
export const resultDevPlan = (params) => requests({url: '/saleChance/result', method: 'post', data:params})
export const getAssignSaleChanceList = (params) => requests({url: '/saleChance/all/new', method: 'post', data:params})
export const getDevPlan = (saleId,params) => requests({url: '/devPlan/all/'+saleId, method: 'post', data:params})

// sysUser
export const register = (params) => requests({url: '/sysUser/register', method: 'post', data:params})
export const login = (params) => requests({url: '/sysUser/login', method: 'post', data:params})
export const getSales = () => requests({url: '/sysUser/sales', method: 'get'})
export const logout = (params) => requests({url: '/sysUser/logout', method: 'post', data:params})
export const updateUser = (params) => requests({url: '/sysUser/update', method: 'post', data:params})
export const getSysUserList = (params) => requests({url: '/sysUser/all', method: 'post', data:params})

//report
export const getCustomerCountByRegion = () => requests({url: '/report/getCustomerCountByRegion', method: 'get'})
export const getCustomerAttribute = () => requests({url: '/report/attribute', method: 'get'})
export const getCustomerAttributeByCusId = (cusId) => requests({url: '/report/attribute/'+cusId, method: 'get'})
export const getCustomerRate = () => requests({url: '/report/rate', method: 'get'})
export const getCustomerCredit = () => requests({url: '/report/credit', method: 'get'})
export const getCustomerServices = () => requests({url: '/report/services', method: 'get'})
export const getCustomerLoss = () => requests({url: '/report/loss', method: 'get'})

//orders
export const getOrders = (params) => requests({url: '/orders/all', method: 'post', data:params})

//customerLoss
export const getLossHistory = (params) => requests({url: '/customerLoss/all', method: 'post', data:params})
export const pause = (params) => requests({url: '/customerLoss/pause', method: 'post', data:params})
export const failLoss = (params) => requests({url: '/customerLoss/fail', method: 'post', data:params})
export const successLoss = (params) => requests({url: '/customerLoss/success', method: 'post', data:params})


