/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async()=>{
        return[
            {
                source: "/",
                destination: "/tutor",
                permanent: false
            }
        ]
    }
}

module.exports = nextConfig;
