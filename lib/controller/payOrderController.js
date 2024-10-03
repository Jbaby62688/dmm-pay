const {
  DobLogApi
} = require('@dob/log');
const {
  DobUtilConstant,
  DobUtilApi
} = require('@dob/util');
const {
  DmmBaseConstant,
  DmmBaseController
} = require('@dmm/base');
const PayConstant = require('../constant/payConstant');
const PayError = require('../error/payError');
const PayConfig = require('../config/payConfig');
const PayOrderModel = require('../model/payOrderModel');

class PayOrderController extends DmmBaseController {
  /**
   * @description 模型getter
   * 
   * @static
   * 
   * @returns {PayOrderModel}
   */
  static get Model() {
    return PayOrderModel;
  }


  /**
   * @description 检查模型
   * 
   * @static
   * 
   * @param {Object} param1
   * @param {MatchModel} param1.model 模型
   * @param {Object} param2
   * @param {Boolean} [param2.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param2.ctx 上下文
   * 
   * @returns {Boolean}
   */
  static checkModel(
    {
      model
    },
    {
      throwErrorFlag = true,
      ctx
    } = {}
  ) {
    const identifier = 'DmmPayOrderController::checkModel';

    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );

    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);

    try {
      super.checkModel(
        {
          model
        },
        {
          ctx
        }
      );

      //返回
      return true;
    }
    catch (error) {
      //抛出错误
      if (throwErrorFlag === true) {
        throw new PayError(PayError.ORDER_NOT_EXIST);
      }
      //返回
      else {
        return false;
      }
    }
    finally {
      //结束执行
      logger.debug(`=====结束执行${identifier}=====`);
    }
  }


  /**
   * @description 创建
   * 
   * @static
   * 
   * @async
   * 
   * @param {Object} param1
   * @param {Number} param1.userId 用户ID
   * @param {Number} param1.channelId 渠道ID
   * @param {Number} param1.amount 金额
   * @param {Object} param2
   * @param {Boolean} [param2.useCacheFlag] 使用缓存标志
   * @param {Boolean} [param2.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param2.ctx 上下文
   * 
   * @returns {Promise<PayOrderModel>}
   */
  static async create(
    {
      userId,
      channelId,
      amount
    },
    {
      useCacheFlag,
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmPayOrderController::create';

    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );

    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);

    try {
      //获取事务
      const transaction = ctx.state?.transaction;

      //处理参数
      if (useCacheFlag === undefined) {
        useCacheFlag = ctx.state?.useCacheFlag !== undefined ? ctx.state.useCacheFlag : true;
      }

      //检查参数
      logger.debug('userId:', userId);
      DobUtilApi.checkValue(
        {
          value: userId
        },
        {
          type: DmmBaseConstant.PROP_ID_TYPE,
          rule: {
            ...DmmBaseConstant.PROP_ID_RULE
          }
        }
      );

      logger.debug('channelId:', channelId);
      DobUtilApi.checkValue(
        {
          value: channelId
        },
        {
          type: PayConstant.PROP_CHANNEL_ID_TYPE,
          rule: {
            ...PayConstant.PROP_CHANNEL_ID_RULE
          }
        }
      );

      logger.debug('amount:', amount);
      DobUtilApi.checkValue(
        {
          value: amount
        },
        {
          type: PayConstant.PROP_AMOUNT_TYPE,
          rule: {
            ...PayConstant.PROP_AMOUNT_RULE
          }
        }
      );

      logger.debug('useCacheFlag:', useCacheFlag);
      DobUtilApi.checkValue(
        {
          value: useCacheFlag
        },
        {
          type: DobUtilConstant.VALUE_TYPE_BOOLEAN,
        }
      );

      logger.debug('throwErrorFlag:', throwErrorFlag);
      DobUtilApi.checkValue(
        {
          value: throwErrorFlag
        },
        {
          type: DobUtilConstant.VALUE_TYPE_BOOLEAN,
        }
      );

      //创建
      let payOrder = await PayOrderModel.create(
        {
          userId,
          channelId,
          amount
        },
        {
          transaction
        }
      );

      //添加到缓存
      if (useCacheFlag === true) {
        this.addModelToCache(
          {
            model: payOrder
          },
          {
            ctx
          }
        );
      }

      //返回
      return payOrder;
    }
    catch (error) {
      //抛出错误
      if (throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return null;
      }
    }
    finally {
      //结束执行
      logger.debug(`=====结束执行${identifier}=====`);
    }
  }


  /**
   * @description 更新
   * 
   * @static
   * 
   * @async
   * 
   * @param {Object} param1
   * @param {PayOrderModel} param1.payOrder 支付订单
   * @param {Object} param2
   * @param {Number} [param2.status] 状态
   * @param {String} [param2.outOrderId] 外部订单ID
   * @param {Date} [param2.payTimestamp] 支付时间戳
   * @param {Object} param3
   * @param {Boolean} [param3.autoSaveFlag] 自动保存标志
   * @param {Boolean} [param3.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param3.ctx 上下文
   * 
   * @returns {Promise<Boolean>}
   */
  static async update(
    {
      payOrder
    },
    {
      status,
      outOrderId,
      payTimestamp
    },
    {
      autoSaveFlag,
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmPayOrderController::update';

    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );

    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);

    try {
      //获取事务
      const transaction = ctx.state?.transaction;

      //处理参数
      if (autoSaveFlag === undefined) {
        autoSaveFlag = ctx.state?.autoSaveFlag !== undefined ? ctx.state.autoSaveFlag : true;
      }

      //检查参数
      this.checkModel(
        {
          model: payOrder
        },
        {
          ctx
        }
      );

      logger.debug('status:', status);
      DobUtilApi.checkValue(
        {
          value: status
        },
        {
          type: PayConstant.PROP_STATUS_TYPE,
          rule: {
            ...PayConstant.PROP_STATUS_RULE,
            allowUndefined: true
          }
        }
      );

      logger.debug('outOrderId:', outOrderId);
      DobUtilApi.checkValue(
        {
          value: outOrderId
        },
        {
          type: PayConstant.PROP_OUT_ORDER_ID_TYPE,
          rule: {
            ...PayConstant.PROP_OUT_ORDER_ID_RULE,
            allowUndefined: true
          }
        }
      );

      logger.debug('payTimestamp:', payTimestamp);
      DobUtilApi.checkValue(
        {
          value: payTimestamp
        },
        {
          type: DmmBaseConstant.PROP_TIMESTAMP_TYPE,
          rule: {
            ...DmmBaseConstant.PROP_TIMESTAMP_RULE,
            allowUndefined: true
          }
        }
      );

      //更新
      if (status !== undefined) {
        payOrder.status = status;
      }

      if (outOrderId !== undefined) {
        payOrder.outOrderId = outOrderId;
      }

      if (payTimestamp !== undefined) {
        payOrder.payTimestamp = payTimestamp;
      }

      //保存
      if (autoSaveFlag === true) {
        await payOrder.save(
          {
            transaction
          }
        );
      }

      //返回
      return true;
    }
    catch (error) {
      //抛出错误
      if (throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return false;
      }
    }
    finally {
      //结束执行
      logger.debug(`=====结束执行${identifier}=====`);
    }
  }


  /**
   * @description 删除
   * 
   * @static
   * 
   * @async
   * 
   * @param {Object} param1
   * @param {PayOrderModel} param1.payOrder 支付订单
   * @param {Object} param2
   * @param {Boolean} [param2.useCacheFlag] 使用缓存标志
   * @param {Boolean} [param2.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param2.ctx 上下文
   * 
   * @returns {Promise<Boolean>}
   */
  static async delete(
    {
      payOrder
    },
    {
      useCacheFlag,
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmPayOrderController::delete';

    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );

    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);

    try {
      //获取事务
      const transaction = ctx.state?.transaction;

      //处理参数
      if (useCacheFlag === undefined) {
        useCacheFlag = ctx.state?.useCacheFlag !== undefined ? ctx.state.useCacheFlag : true;
      }

      //检查参数
      this.checkModel(
        {
          model: payOrder
        },
        {
          ctx
        }
      );

      logger.debug('useCacheFlag:', useCacheFlag);
      DobUtilApi.checkValue(
        {
          value: useCacheFlag
        },
        {
          type: DobUtilConstant.VALUE_TYPE_BOOLEAN,
        }
      );

      logger.debug('throwErrorFlag:', throwErrorFlag);
      DobUtilApi.checkValue(
        {
          value: throwErrorFlag
        },
        {
          type: DobUtilConstant.VALUE_TYPE_BOOLEAN,
        }
      );

      //从缓存中删除
      if (useCacheFlag === true) {
        this.deleteModelFromCache(
          {
            model: payOrder
          },
          {
            ctx
          }
        );
      }

      //删除
      await payOrder.destroy(
        {
          transaction
        }
      );

      //返回
      return true;
    }
    catch (error) {
      //抛出错误
      if (throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return false;
      }
    }
    finally {
      //结束执行
      logger.debug(`=====结束执行${identifier}=====`)
    }
  }
}

module.exports = PayOrderController;