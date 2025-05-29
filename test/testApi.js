const request = require('supertest');
const app = require('../app');
require('dotenv').config();

let token;
let testArticleUrl;

const userData = {
  email: `testuser${Date.now()}@example.com`,
  password: 'Password123!',
};

describe('Personalized News Aggregator API Tests', () => {
  jest.setTimeout(30000); // in case external API is slow

  // Register User
  test('POST /api/auth/register - should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(userData);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  // Login User
  test('POST /api/auth/login - should login and return JWT token', async () => {
    const res = await request(app).post('/api/auth/login').send(userData);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  // Get User Preferences
  test('GET /api/user/preferences - should return default preferences', async () => {
    const res = await request(app)
      .get('/api/user/preferences')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.preferences).toHaveProperty('category');
    expect(res.body.preferences).toHaveProperty('language');
  });

  // Update User Preferences
  test('PUT /api/user/preferences - should update preferences', async () => {
    const res = await request(app)
      .put('/api/user/preferences')
      .send({ category: 'technology', language: 'en' })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.preferences.category).toBe('technology');
    expect(res.body.preferences.language).toBe('en');
  });

  // Fetch news articles based on preferences
  test('GET /api/news - should fetch news articles', async () => {
    const res = await request(app)
      .get('/api/news')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      testArticleUrl = encodeURIComponent(res.body[0].url);
    }
  });

  // Search news by keyword
  test('GET /api/news/search/:keyword - should return search results', async () => {
    const res = await request(app)
      .get('/api/news/search/bitcoin')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Mark article as read (if we have article URL)
  test('POST /api/news/:id/read - should mark article as read', async () => {
    if (!testArticleUrl) return;
    const res = await request(app)
      .post(`/api/news/${testArticleUrl}/read`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/marked as read/i);
  });

  // Get all read articles
  test('GET /api/news/read - should return read articles', async () => {
    const res = await request(app)
      .get('/api/news/read')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Mark article as favorite (if we have article URL)
  test('POST /api/news/:id/favorite - should mark article as favorite', async () => {
    if (!testArticleUrl) return;
    const res = await request(app)
      .post(`/api/news/${testArticleUrl}/favorite`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/marked as favorite/i);
  });

  // Get all favorite articles
  test('GET /api/news/favorites - should return favorite articles', async () => {
    const res = await request(app)
      .get('/api/news/favorites')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});