/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'brand_primary': '#293CF5',
                'brand_secondary': '#73B4F3',
                'brand_tertiary': '#D0E7FD',
                'typography_light': '#060A2E',
                'typography_dark': '#F4F6FB',
            },
        }
    },
    plugins: [require('@tailwindcss/forms'), ],
}
