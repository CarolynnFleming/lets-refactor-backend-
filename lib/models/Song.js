const pool = require('../utils/pool');
module.exports = class Song {
  id;
  artist;
  genre;


  constructor(row) {
    this.id = row.id;
    this.artist = row.artist;
    this.genre = row.genre;
  }

  static async insert({ artist, genre }) {
    const { rows } = await pool.query(
      `   INSERT
        INTO
        songs
        (artist, genre)
        VALUES
        ($1, $2)
        RETURNING
        *;`, [artist, genre]
    );
    return new Song(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      songs
      `
    );

    return rows.map((item) => new Song(item));
  }
};

