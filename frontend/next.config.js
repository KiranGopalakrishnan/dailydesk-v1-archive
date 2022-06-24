module.exports = {
  async rewrites() {
    return [
      {
        source: '/rest/projector/:path*',
        destination: 'http://localhost:8080/rest/projector/:path*', // Proxy to Backend
      },
      {
        source: '/bifrost/:path*',
        destination: 'http://localhost:8000/:path*', // Proxy to auth
      },
    ];
  },
};
