
const moment = require('moment');

module.exports = class time {
  static timeStamp(format) {
    if (format) return moment().utc().add(8, 'h').format(format);else return moment().utc().add(8, 'h').format('YYYY-MM-DD HH:mm:ss');
  }

  static unix(timezone) {
    let zone = timezone || 0;
    return moment().utc().add(zone, 'h').unix();
  }

  static dateUnix(date) {
    return moment(date).utc().unix();
  }

  static formatDate(date, format) {
    return moment(date || Date.now()).utc().utcOffset("+08:00").format(format || 'YYYY-MM-DD HH:mm:ss');
  }

  static formatUTCDate(date, format) {
    return moment(date || Date.now()).utc().format(format || 'YYYY-MM-DD HH:mm:ss');
  }

  static getDayEndOfMonth(date) {
    return moment(date).endOf('month').format('DD');
  }

};