
const log = require('pino')();
const schedule = require('node-schedule');
const time = require('./utils/time');

let count = 0;

/*
 get more: https://github.com/node-schedule/node-schedule
 */

schedule.scheduleJob('05 01 * * *', async () => {

  log.info('Schedule Start At ' + time.timeStamp());

  try {
    
    log.info('cron run ', ++count);

  } catch (e) {

    log.info(e);

  }

  log.info('Schedule end At ' + time.timeStamp());

});

log.info('Schedule Server Init At ' + time.timeStamp());