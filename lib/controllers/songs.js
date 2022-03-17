const { Router } = require('express');
const res = require('express/lib/response');
const Song = require('../models/Song');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const song = await Song.insert(req.body);

    res.json(song);
  })

  .get('/:id', async (req, res) => {
    const song = await Song.getById(req.params.id);
    res.json(song);
  })

  .get('/', assync (req, res) => {
      const songs = await Song.getAll();

      res.json(songs);
  })

  .patch('/:id', async (rec, res, next) => {
    try{
        const { id } = req.params;

        const existingSong = await Song.updateById(id, req.body);

        if(!existingSong) {
            const error = new Error(`Song ${id} not found`);
            error.status = 404;
            throw error;
        }

        res.json(existingSong);
    } catch (error) {
        next(error);
    }
  })

  .delete('/:id', async (req, res) => {
      const { rows } = await pool.query(
          'DELET FROM songs WHERE id=$1 RETURNING *;', [req.params.id]
      );
      if(!rows[0]) return null;
      const song = new Song(rows[0]);

      res.json(song);
  });

