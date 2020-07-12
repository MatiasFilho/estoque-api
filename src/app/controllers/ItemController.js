const Item = require('../models/Item');

class ItemController {
  async index (req, res) {
    const filters = {};

    filters._user = req.userId;

    if (req.query.code) {
      filters.code = req.query.code;
    }

    if (req.query.description) {
      filters.description = new RegExp(req.query.description, 'i');
    }

    const Items = await Item.paginate(filters, {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 20,
      sort: '-createdAt',
    });

    return res.json({ Items });
  }

  async show (req, res) {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(400).json({ error: 'Item not found' });
    }

    return res.json(item);
  }

  async store (req, res) {
    const item = await Item.create({ ...req.body, _user: req.userId });

    return res.json(item);
  }

  async update (req, res) {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.json(item);
  }

  async destroy (req, res) {
    await Item.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new ItemController();
