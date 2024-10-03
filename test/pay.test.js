const {
  DmmPayConstant,
  DmmPayError,
  DmmPayConfig,
  DmmPayOrderModel,
  DmmPayOrderController,
  DmmPayApi
} = require('../index');

describe(
  'pay module',
  () => {
    test(
      'should have constant',
      () => {
        expect(DmmPayConstant).toBeDefined();
      }
    );

    test(
      'should have error',
      () => {
        expect(DmmPayError).toBeDefined();
      }
    );

    test(
      'should have config',
      () => {
        expect(DmmPayConfig).toBeDefined();
      }
    );

    test(
      'should have order model',
      () => {
        expect(DmmPayOrderModel).toBeDefined();
      }
    );

    test(
      'should have order controller',
      () => {
        expect(DmmPayOrderController).toBeDefined();
      }
    );

    test(
      'should have api',
      () => {
        expect(DmmPayApi).toBeDefined();
      }
    );
  }
);