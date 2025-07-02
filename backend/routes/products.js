const router   = require('express').Router();
const Product  = require('../models/Product');

router.get('/', async (req, res) => {
  const { sku, name, qmin, qmax } = req.query;
  const filter = {};
  if (sku)  filter.sku  = { $regex: sku, $options: 'i' };
  if (name) filter.name = { $regex: name, $options: 'i' };
  if (qmin || qmax) filter.quantity = {};
  if (qmin) filter.quantity.$gte = Number(qmin);
  if (qmax) filter.quantity.$lte = Number(qmax);
  const list = await Product.find(filter).sort({ created: -1 });
  res.json(list);
});

router.post('/', async (req, res) => {
  const { sku, name, quantity } = req.body;
  if (!sku || !name || quantity == null) return res.status(400).json({ msg: 'Hiányzó mező' });
  const exists = await Product.findOne({ sku });
  if (exists) return res.status(409).json({ msg: 'Cikkszám már létezik' });
  if (!Number.isInteger(quantity) || quantity < 0) return res.status(400).json({ msg: 'Darabszám nem egész ≥0' });
  const p = await Product.create({ sku, name, quantity });
  res.status(201).json(p);
});

module.exports = router;
