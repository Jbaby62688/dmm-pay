const {
  DobLogApi
} = require('@dob/log');
const {
  DmmBaseApi
} = require('@dmm/base');
const DmmPayOrderController = require('../controller/payOrderController');
const { DobUtilApi } = require('@dob/util');

class PayApi extends DmmBaseApi {
  static async createOrder(
    {
      userId,
      channelId,
      amount
    },
    {
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmPayApi::createOrder';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger?.debug(`=====开始执行${identifier}=====`);
    
    try {
      amount = amount * Math.pow(10, 6);
      let randomAmount = DobUtilApi.generateRandomNumber(
        {
          min: 1,
          max: 999999
        }
      );
      amount = amount + randomAmount;
      let payOrder = await DmmPayOrderController.create(
        {
          userId,
          channelId,
          amount
        },
        {
          ctx
        }
      );

      return payOrder;
    }
    catch(error) {
      //抛出错误
      if(throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return null;
      }
    }
    finally {
      //结束执行
      logger?.debug(`=====结束执行${identifier}=====`);
    }
  }
}

module.exports = PayApi;