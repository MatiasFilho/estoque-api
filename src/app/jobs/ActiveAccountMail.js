const Mail = require('../services/Mail');

class ActiveAccountMail {
  get key () {
    return 'ActiveAccountMail';
  }

  async handle (job, done) {
    const { user, activeCode } = job.data;

    console.log(job.data);

    await Mail.sendMail({
      from: '"José Matias" <jose.matias@outlook.com>',
      to: user.email,
      subject: 'Ativar Conta',
      text: `
        Utilize o código: <b>${activeCode}</b> para ativar sua conta.
      `
    });

    return done();
  }
};

module.exports = new ActiveAccountMail();
