const { Router } = require('express');
const server = require('../server');

const router = Router();

server.get('/countries', async (req, res) => {
    const countries = await Country.findAll();
    res.json(countries);
  });

server.get('/countries/:id', async (req, res) => {
  try {
    const country = await Country.findOne({ where: { cca3: req.params.id }, include: Activity });
    if (country) {
      res.send(country);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

server.get('/countries/name', async (req, res) => {
  const countries = await Country.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: '%' + req.query.name + '%'
      }
    }
  });
  res.json(countries);
});

server.post('/activities', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.json(activity);
});

server.get('/activities', async (req, res) => {
  const activities = await Activity.findAll();
  res.json(activities);
});

module.exports = router;