'use strict';

// 将 xml 转化后的格式变成 json 格式
module.exports = result => {
  let message = {};
  if (typeof result === 'object') {
    for (const key in result) {
      if (result[key].length === 1) {
        const val = result[key][0];
        if (typeof val === 'object') {
          message[key] = this.formatMessage(val);
        } else {
          message[key] = (val || '').trim();
        }
      } else {
        message = result[key].map(this.formatMessage);
      }
    }
  }
  return message;
};
