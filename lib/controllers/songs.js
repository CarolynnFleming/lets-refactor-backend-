const { Router } = require('express');
const Song = require('../models/Song');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const song = await Song.insert(req.body);

    res.json(song);
  });

