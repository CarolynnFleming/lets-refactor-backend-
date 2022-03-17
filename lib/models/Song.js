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

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT
      *
      FROM 
      songs
      WHERE
      id=$1`,
      [id]
    );
    if(!rows[0]) return null;
    return new Song(rows[0]);
  }
  static async updateById(id, { artist, genre }) {
    const existingSong = await Song.getById(id);
    if(!existingSong) return null;

    const newArtist = artist ?? existingSong.artist;
    const newGenre = genre ?? existingSong.genre;

    const { rows } = await pool.query(
      'UPDATE songs SET artist=$2, genre=$3 where id=$1 returning *;', [id, newArtist, newGenre]
    );
    return new Song(rows[0]);
  }


  static async deleteById(id) {
    const { rows } = await pool.query(
      `DELETE
    FROM
    songs
    WHERE
    id=$1
    RETURNING *;`, [id]
    );

    if(!rows[0]) return null;
    return new Song(rows[0]);
  }
};

