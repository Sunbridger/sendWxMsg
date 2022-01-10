'use strict';
// import { getMe } from '../../api/index.js'
const Controller = require('egg').Controller;
const { parseString } = require('xml2js');

class HomeController extends Controller {
  async send() {
    const { ctx, app } = this;
    ctx.body = app.config;
    const result = await ctx.service.sendmsg.send();
    ctx.logger.info('主动触发，发送模板消息 结果: %j', result);
    ctx.body = result;
    ctx.set('Content-Type', 'application/json');
  }
  async getMsg() {
    const { ctx } = this;
    parseString(ctx.request.body, (err, bodyJson) => {
      if (err) {
        ctx.set('Content-Type', 'text/xml');
        ctx.body = `<xml>
          <ToUserName><![CDATA[oEBMD6RN7frIloYFu-O8Wo5DeG3Q]]></ToUserName>
          <FromUserName><![CDATA[gh_42b55b986faa]]></FromUserName>
          <CreateTime>12345678</CreateTime>
          <MsgType><![CDATA[text]]></MsgType>
          <Content><![CDATA[系统繁忙，请稍后再试吧～]]></Content>
        </xml>`;

      } else {
        ctx.set('Content-Type', 'text/xml');
        ctx.body = `<xml>
          <ToUserName><![CDATA${bodyJson.FromUserName}]></ToUserName>
          <FromUserName><![CDATA${bodyJson.ToUserName}></FromUserName>
          <CreateTime>${new Date()}</CreateTime>
          <MsgType><![CDATA[text]]></MsgType>
          <Content><![CDATA${bodyJson.Content}]></Content>
        </xml>`;
      }
    });
  }
}

module.exports = HomeController;
