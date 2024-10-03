const {
  DmmBaseError
} = require('@dmm/base');
const PayConstant = require('../constant/payConstant');

class PayError extends DmmBaseError {
  static ORDER_NOT_EXIST = {code: 10001, msg: '订单不存在'};
  
  constructor(
    {
      code,
      msg
    }
  ) {
    super(
      {
        code,
        msg
      }
    );
    this.module = PayConstant.MODULE_NAME;
  }
}

module.exports = PayError;