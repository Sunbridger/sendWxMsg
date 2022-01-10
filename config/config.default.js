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
    daily: 'k1BS3_yowDGRq6IOyltq8jjx7WJJ1dLwzOekccaeExE', // 普通模板
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
    },
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // 覆盖egg自带的配置 使支持接收xml参数
  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '100kb',
    jsonLimit: '100kb',
    strict: true,
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
    enableTypes: [ 'json', 'form', 'text' ],
    extendTypes: {
      text: [ 'text/xml', 'application/xml' ],
    },
  };


  return {
    ...config,
  };
};
