module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        typing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blinkStop: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
      },
      animation: {
        typing: 'typing 3s steps(20) forwards',
        typingNoCursor: 'typing 3s steps(20) forwards, blinkStop 0s 3s forwards',
      },
    },
  },
  plugins: [],
}
