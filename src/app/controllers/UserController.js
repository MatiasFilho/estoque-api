const User = require('../models/User');
const Mail = require('../services/Mail');
const Queue = require('../services/Queue');
const ActiveAccountMail = require('../jobs/ActiveAccountMail');

class UserController {
  async store (req, res) {
    const { email } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const activeCode = Math.floor(100000 + Math.random() * 900000);

    const user = await User.create({ ...req.body, activeCode });

    Queue.create(ActiveAccountMail.key, { ...user, activeCode });

    await Mail.sendMail({
      from: '"José Matias" <jose.matias@outlook.com>',
      to: user.email,
      subject: 'Estoque - Ativar Conta',
      text: `
        Olá ${user.name},\n\n
        Utilize o código: ${activeCode} para ativar sua conta.`,
      html: `
        Olá ${user.name},<br><br>
        Utilize o código: <b>${activeCode}</b> para ativar sua conta.`
    });

    return res.json({ user });
  }

  async show (req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    return res.json(user);
  }

  async update (req, res) {
    const { active } = req.body;

    const user = await User.findById(req.userId);

    if (user.activeCode === active) {
      await User.findByIdAndUpdate(req.userId, { $set: { active: true } });
      return res.json(user);
    }

    return res.status(400).json({});
  }
}

module.exports = new UserController();
