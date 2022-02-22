/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    API_KEY:`31f9a46c06864027738d9c20f2022201`
  },
  images:{
    domains: ["image.tmdb.org"]
  }
}

module.exports = nextConfig
