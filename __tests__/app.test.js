const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Song = require('../lib/models/Song');

describe('refactory routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create an song', async () => {
    const res = await request(app)
      .post('/api/v1/songs')
      .send({ artist: 'Widget', genre: 1 });

    expect(res.body).toEqual({
      id: expect.any(String),
      product: 'Widget',
      genre: 1,
    });
  });

  it('should be able to list an song by id', async () => {
    const song = await Song.insert({ artist: 'Widget', genre: 1 });
    const res = await request(app).get(`/api/v1/songs/${song.id}`);

    expect(res.body).toEqual(song);
  });

  it('should be able to list songs', async () => {
    await Song.insert({ artist: 'Widget', genre: 'blues' });
    const res = await request(app).get('/api/v1/songs');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        artist: 'Widget',
        genre: 1,
      },
    ]);
  });

  it('should be able to update an song', async () => {
    const song = await Song.insert({ artist: 'Widget', genre: 'blues' });
    const res = await request(app)
      .patch(`/api/v1/songs/${song.id}`)
      .send({ artist: 'Thingamajig', genre: 2 });

    const expected = {
      id: expect.any(String),
      artist: 'Thingamajig',
      genre: 2,
    };

    expect(res.body).toEqual(expected);
    expect(await Song.getById(song.id)).toEqual(expected);
  });

  it('should be able to delete an order', async () => {
    const song = await Song.insert({ artist: 'Widget', genre: 1 });
    const res = await request(app).delete(`/api/v1/songs/${song.id}`);

    expect(res.body).toEqual(song);
    expect(await Song.getById(song.id)).toBeNull();
  });
});


