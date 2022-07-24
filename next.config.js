
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["d2mj1no4zi8uvs.cloudfront.net"],
  },
  
  async redirects() {
    return [
      {
        source: "/",
        destination: "/lend",
        permanent: false,
      },
    ];
  },
}
