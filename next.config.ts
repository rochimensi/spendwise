import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
    serverExternalPackages: ['@sequelize/core', 'pg'],
}
 
export default nextConfig