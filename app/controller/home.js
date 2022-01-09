'use strict';
// import { getMe } from '../../api/index.js'
const Controller = require('egg').Controller;


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
    console.log(ctx.request.body);
    ctx.body = `<xml>
    <ToUserName><![CDATA[oEBMD6RN7frIloYFu-O8Wo5DeG3Q]]></ToUserName>
    <FromUserName><![CDATA[oEBMD6RN7frIloYFu-O8Wo5DeG3Q]]></FromUserName>
    <CreateTime>12345678</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[你好]]></Content>
  </xml>`;
  }
}

module.exports = HomeController;
