const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        tailwindcss('./tailwind.js'),
        // require('postcss-import'),
        // require('postcss-preset-env')({
        //     stage: 1,
        // }),
        // require('postcss-nested'),
        require('autoprefixer'),
    ],
};
