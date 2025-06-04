import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: 'export',
};

module.exports = {
    // Включаем логирование для отладки
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    // Настройки для статической генерации
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
    // Настройки для продакшена
    typescript: {
        // Игнорируем ошибки типов при билде (временно)
        ignoreBuildErrors: false,
    },
    eslint: {
        // Игнорируем ошибки ESLint при билде (временно)
        ignoreDuringBuilds: false,
    },
    // typescript: {
    //     // !! WARN !!
    //     // Dangerously allow production builds to successfully complete even if
    //     // your project has type errors.
    //     // !! WARN !!
    //     ignoreBuildErrors: true,
    // },
}

export default nextConfig;
