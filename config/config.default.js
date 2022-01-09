/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {

  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1632111171422_6113';

  // add your middleware config here
  config.middleware = [];

  // 测试 微信公众号
  config.weChat = {
    appld: 'wxb32ccffb0a927d2e',
    secret: '8bbe96431cd2706da47af3be6d48b05f',
    // 用户的openid
    users: [
      'oEBMD6RN7frIloYFu-O8Wo5DeG3Q',
      'oEBMD6fhGyjo7hVmhrMGsS1pZcdw',
    ],
    daily: 'k1BS3_yowDGRq6IOyltq8jjx7WJJ1dLwzOekccaeExE' // 普通模板
  };

  // 时间
  config.time = {
    love: '2021-10-15', // 相爱日期
  };

  config.cluster = {
    listen: {
      path: '',
      port: 7003,
      hostname: '0.0.0.0',
    }
  };


  return {
    ...config,
  };
};
