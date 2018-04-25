var cron = require('cron');
const axios = require('axios');

const {sendNotification} = require('./controllers/mail.controller')

var sendEmail = new cron.CronJob({
  cronTime: '* * * * *',
  onTick: function() {
    axios.post('http://35.187.244.238/sendNotification')
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.error(err)
      })
  },
  start: false,
  timeZone: 'Asia/Jakarta'
});

sendEmail.start(); // job 1 started
 
console.log('sendEmail status', sendEmail.running); // job1 status true