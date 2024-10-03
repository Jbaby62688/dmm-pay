const DmmPayConstant = require('./lib/constant/payConstant');
const DmmPayError = require('./lib/error/payError');
const DmmPayConfig = require('./lib/config/payConfig');
const DmmPayOrderModel = require('./lib/model/payOrderModel');
const DmmPayOrderController = require('./lib/controller/payOrderController');
const DmmPayApi = require('./lib/api/payApi');

function config(options) {
  DmmPayConfig.dbClient = options.dbClient;
}

function init() {
  DmmPayOrderModel.init();
} 

function afterInit() {
}

module.exports = {
  config,
  init,
  afterInit,
  DmmPayConstant,
  DmmPayError,
  DmmPayConfig,
  DmmPayOrderModel,
  DmmPayOrderController,
  DmmPayApi
};