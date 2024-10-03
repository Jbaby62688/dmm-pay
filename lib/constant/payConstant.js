const {
  DobUtilConstant
} = require('@dob/util');

class PayConstant {
  static MODULE_NAME = 'pay';

  static PROP_CHANNEL_ID_VALUE_TRON = 1;
  static PROP_CHANNEL_ID_TYPE = DobUtilConstant.VALUE_TYPE_NUMBER;
  static PROP_CHANNEL_ID_RULE = {
    list: [
      this.PROP_CHANNEL_ID_VALUE_TRON
    ]
  }

  static PROP_AMOUNT_TYPE = DobUtilConstant.VALUE_TYPE_NUMBER;
  static PROP_AMOUNT_RULE = {
    ...DobUtilConstant.VALUE_RULE_UNSIGNED_BIGINT
  }

  static PROP_STATUS_VALUE_WAIT = 1;
  static PROP_STATUS_VALUE_SUCCESS = 2;
  static PROP_STATUS_VALUE_FAIL = 3;
  static PROP_STATUS_VALUE_CANCEL = 4;
  static PROP_STATUS_TYPE = DobUtilConstant.VALUE_TYPE_NUMBER;
  static PROP_STATUS_RULE = {
    list: [
      this.PROP_STATUS_VALUE_WAIT,
      this.PROP_STATUS_VALUE_SUCCESS,
      this.PROP_STATUS_VALUE_FAIL,
      this.PROP_STATUS_VALUE_CANCEL
    ]
  }

  static PROP_OUT_ORDER_ID_TYPE = DobUtilConstant.VALUE_TYPE_STRING;
  static PROP_OUT_ORDER_ID_RULE = {
    ...DobUtilConstant.VALUE_RULE_NONEMPTY_STRING
  }
}

module.exports = PayConstant;