const {
  DataTypes
} = require('@dob/db');
const {
  DmmBaseModel
} = require('@dmm/base');
const payConstant = require('../constant/payConstant');
const PayConfig = require('../config/payConfig');

class PayOrderModel extends DmmBaseModel {
  static init() {
    super.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        userId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          field: 'user_id'
        },
        channelId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          field: 'channel_id'
        },
        amount: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          defaultValue: 0
        },
        status: {
          type: DataTypes.TINYINT.UNSIGNED,
          allowNull: false,
          defaultValue: payConstant.PROP_STATUS_VALUE_WAIT
        },
        outOrderId: {
          type: DataTypes.STRING(64),
          allowNull: true,
          defaultValue: null,
          field: 'out_order_id'
        },
        createTimestamp: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW(),
          field: 'create_timestamp',
          get() {
            return this.timestampTypeGetHandler(
              {
                columnName: 'createTimestamp'
              }
            )
          },
          set(value) {
            this.timestampTypeSetHandler(
              {
                columnName: 'createTimestamp',
                value
              }
            )
          }
        },
        payTimestamp: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
          field: 'pay_timestamp',
          get() {
            return this.timestampTypeGetHandler(
              {
                columnName: 'payTimestamp'
              }
            )
          },
          set(value) {
            this.timestampTypeSetHandler(
              {
                columnName: 'payTimestamp',
                value
              }
            )
          }
        }
      },
      {
        sequelize: PayConfig.dbClient,
        modelName: 'payOrder',
        tableName: 't_pay_order',
        timestamps: false
      }
    )
  }
}

module.exports = PayOrderModel;