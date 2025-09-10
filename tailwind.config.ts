// import type { Config } from "tailwindcss";
// import plugin from "tailwindcss/plugin";
//
// const browserVariants = plugin(({ addVariant }) => {
//     addVariant("chrome", ".is-chrome &");
//     addVariant("chromium", ".is-chromium &");
//     addVariant("yandex", ".is-yandex &");
//     addVariant("edge", ".is-edge &");
//     addVariant("opera", ".is-opera &");
//     addVariant("firefox", ".is-firefox &");
//     addVariant("arc", ".is-arc &");
//     addVariant("safari", ".is-safari &");
//     addVariant("unknown-browser", ".is-unknown &");
// });
//
// const config: Config = {
//     content: [
//         "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//         "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//         "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     ],
//     theme: {
//         extend: {
//             fontFamily: {
//                 rubik: ["var(--font-rubik)", "sans-serif"],
//                 square: ["var(--font-simple-square)", "sans-serif"],
//             },
//         },
//     },
//     plugins: [browserVariants],
// };
//
// export default config;

import type {Config} from "tailwindcss";
import plugin from "tailwindcss/plugin";

const browserVariants = plugin(({addVariant}) => {
    // Основные браузеры
    addVariant("chrome", ".is-chrome &");
    addVariant("chromium", ".is-chromium &");
    addVariant("yandex", ".is-yandex &");
    addVariant("edge", ".is-edge &");
    addVariant("opera", ".is-opera &");
    addVariant("firefox", ".is-firefox &");
    addVariant("arc", ".is-arc &");
    addVariant("safari", ".is-safari &");
    addVariant("unknown-browser", ".is-unknown &");

    // Добавляем логирование для отладки
    console.log("Browser variants plugin loaded");
});

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                rubik: ["var(--font-rubik)", "sans-serif"],
                square: ["var(--font-simple-square)", "sans-serif"],
            },
        },
    },
    plugins: [browserVariants],
};

export default config;