/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */


// https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
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
      'oEBMD6RN7frIloYFu-O8Wo5DeG3Q', // 乔乔乔
      'oEBMD6YpM8mYiDGzeFmbuPefHQ6U', // 乔乔乔小号
      'oEBMD6QGPkyAGVTkAup1WQRD4R-I', // 娜宝
    ],
    daily: '0DKu_kCjWZo8cfQF1pQD6sOww6IBqucksJk_uea5xGA',
  };

  // 时间
  config.time = {
    love: '2024-09-14', // 相爱日期
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
