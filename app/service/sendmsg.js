'use strict';
const Service = require('egg').Service;
const moment = require('moment');
class sendmsg extends Service {
  // 发送模板消息给媳妇儿
  async send() {
    const { ctx, app } = this;
    const token = await this.getToken();
    const data = await this.getTemplateData();
    ctx.logger.info('获取token 结果: %j', token);
    // 模板消息接口文档
    const users = app.config.weChat.users;
    const promise = users.map(id => {
      ctx.logger.info(
        '--------------开始发送每日提醒-----------------------------------------------: %j',
        id
      );
      data.touser = id;
      return this.toWechart(token, data);
    });
    const results = await Promise.all(promise);
    ctx.logger.info(
      '--------------结束发送每日提醒->结果-----------------------------------------------: %j',
      results
    );
    return results;
  }
  // 通知微信接口
  async toWechart(token, data) {
    // 模板消息接口文档
    const url =
      'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' +
      token;
    const result = await this.ctx.curl(url, {
      method: 'POST',
      data,
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result;
  }
  // 获取token
  async getToken() {
    const { app } = this;
    const url =
      'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
      app.config.weChat.appld +
      '&secret=' +
      app.config.weChat.secret;
    const result = await this.ctx.curl(url, {
      method: 'get',
      dataType: 'json',
    });
    if (result.status === 200) {
      return result.data.access_token;
    }
  }
  // 组装模板消息数据
  async getTemplateData() {
    const { app } = this;

    const message = await this.getOneSentence();

    // const weatherData = await this.getWeather();

    const love = this.getLoveDay();

    const todayTime = this.getDatetime();

    const data = {
      topcolor: '#2db96c',
      data: {
        dateTime: {
          value: todayTime,
          color: '#cc33cc',
        },
        love: {
          value: love,
          color: '#ff3399',
        },
        city: {
          value: '南昌' || weatherData.city,
          color: '#1A01CC',
        },
        wea: {
          value: 'todo' || weatherData.data.type,
          color: '#33ff33',
        },
        tem1: {
          value: 'todo' || weatherData.data.high,
          color: '#ff0000',
        },
        tem2: {
          value: 'todo' || weatherData.data.low,
          color: '#b9a82d',
        },
        message: {
          value: message,
          color: '#8C8C8C',
        },
      },
    };

    // if ([ 1000, 1314, 2000, 3000, 4000 ].includes(love)) {
    //   // 正常模板
    //   data.template_id = app.config.weChat.anniversary;
    //   data.url = `https://www.sunbridger.site/${love}.html`;
    // } else {
    // 正常模板
    data.template_id = app.config.weChat.daily;
    // }


    return data;
  }

  getDatetime() {
    const week = {
      1: '星期一',
      2: '星期二',
      3: '星期三',
      4: '星期四',
      5: '星期五',
      6: '星期六',
      0: '星期日',
    };
    return moment().format('YYYY年MM月DD日 ') + week[moment().weekday()];
  }
  getLoveDay() {
    const { app } = this;
    const loveDay = app.config.time.love;
    return moment(moment().format('YYYY-MM-DD')).diff(loveDay, 'day');
  }
  async getOneSentence() {
    const url = 'https://api.vvhan.com/api/text/love?type=json';
    try {
      const { data } = await this.ctx.curl(url, {
        method: 'get',
        dataType: 'json',
      });
      return data.data.content || '每天爱我的臭宝多一点～～';
    } catch (error) {
      return '每天爱我的臭宝多一点～～';
    }
  }

  async getWeather(city = '南昌') {
    const url = `https://api.vvhan.com/api/weather?city=${city}`;
    const { data } = await this.ctx.curl(url, {
      method: 'get',
      dataType: 'json',
    });

    return data;
  }
}
module.exports = sendmsg;
