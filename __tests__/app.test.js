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

  it('should be able to create a song', async () => {
    const res = await request(app)
      .post('/api/v1/songs')
      .send({ artist: 'Beyonce', genre: 'alternative' });

    expect(res.body).toEqual({
      id: expect.any(String),
      artist: 'Beyonce',
      genre: 'alternative',
    });
  });
});
