module.exports = {
  get: jest.fn(() => Promise.resolve({ status: 'success' })),
  post: jest.fn(() => Promise.resolve({ status: 'success' })),
  put: jest.fn(() => Promise.resolve({ status: 'success' })),
  delete: jest.fn(() => Promise.resolve({ status: 'success' }))
}