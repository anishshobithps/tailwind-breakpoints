import plugin from 'tailwindcss/plugin.js';

export default plugin(function ({ addBase, theme }) {
    if (process.env.NODE_ENV !== "development") return;
    // Extract screen breakpoints from theme efficiently
    const breakpoints = Object.entries(theme('screens', {})).map(([key, value]) => ({ key, value }));

    // Define base styles with improved readability
    const baseStyles = {
        body: {
            '&::after': {
                content: "'xs'", // Default content for extra-small screens
                display: 'flex',
                position: 'fixed',
                bottom: '0.25rem',
                right: '0.25rem',
                zIndex: '50',
                padding: '0.75rem',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '9999px',
                fontFamily: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: '0.75rem',
                lineHeight: '1rem',
                color: '#ffffff',
                backgroundColor: '#1F2937',
            },
        },
    };

    // Generate media query styles concisely
    const mediaQueryStyles = breakpoints
        .map(({ key, value }) => ({
            [`@media (min-width: ${value})`]: {
                ...baseStyles,
                body: {
                    '&::after': {
                        content: `"${key}"`,
                    },
                },
            },
        }))
        // Combine into a single object for efficient styling
        .reduce((acc, styles) => ({ ...acc, ...styles }), {});

    // Apply combined styles
    addBase({ ...baseStyles, ...mediaQueryStyles });
});