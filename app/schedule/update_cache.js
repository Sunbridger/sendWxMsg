'use strict';
const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 30 1 * * *', // 每天的9点30分0秒执行
      type: 'worker',
      immediate: ture,
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { ctx } = this;
    const result = await ctx.service.sendmsg.send();
    // const result = cndate.solar2lunar(2021, 9, 22);
    ctx.logger.info('定时任务执行消息提醒 结果: %j', result);
  }
}

module.exports = UpdateCache;
