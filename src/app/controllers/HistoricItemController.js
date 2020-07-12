const HistoricItem = require('../models/HistoricItem');

class HistoricItemController {
  async index (req, res) {
    const filters = {};

    filters._user = req.userId;

    const HistoricItems = await HistoricItem.paginate(filters, {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 20,
      sort: '-createdAt',
    });

    return res.json({ HistoricItems });
  }
}

module.exports = new HistoricItemController();
