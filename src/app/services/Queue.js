const kue = require('kue');
const jobs = require('../jobs');
const redisConfig = require('../../config/redis');

const Queue = kue.createQueue(redisConfig);

Queue.process(jobs.ActiveAccountMail.key, jobs.ActiveAccountMail.handle);

module.exports = Queue;
