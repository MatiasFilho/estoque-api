const User = require('../models/User');

class SessionController {
  async store (req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!await user.compareHash(password)) {
      return res.status(400).json({ error: 'User or password invalid' });
    }

    return res.json({ user, token: User.generateToken(user) });
  }

  async show (req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    return res.json(user);
  }
}

module.exports = new SessionController();
