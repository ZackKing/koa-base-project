'use strict';

const log = require('pino')();
const schedule = require('node-schedule');
const dateUtil = require('./utils/dateUtil.js');

let count = 0;

/*
 get more: https://github.com/node-schedule/node-schedule
 */

schedule.scheduleJob('05 01 * * *', async () => {

  log.info('Schedule Start At ' + dateUtil.timeStamp());

  try {
    
    log.info('cron run ', ++count);

  } catch (e) {

    log.info(e);

  }

  log.info('Schedule end At ' + dateUtil.timeStamp());

});

log.info('Schedule Server Init At ' + dateUtil.timeStamp());