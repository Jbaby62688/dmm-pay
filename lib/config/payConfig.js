const {
  DobLogApi
} = require('@dob/log');
const {
  DmmBaseConfig
} = require('@dmm/base');

const logger = DobLogApi.getLogger(
  {
    category: 'DmmPayConfig'
  }
);

class PayConfig extends DmmBaseConfig {
  
}

module.exports = PayConfig;