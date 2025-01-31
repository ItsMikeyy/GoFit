module.exports = {
    reactStrictMode: false,
    env: {
      dbURL: process.env.TURSO_CONNECTION_URL,
      dbAuth: process.env.TURSO_AUTH_TOKEN
    }
  }