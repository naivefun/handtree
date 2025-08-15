/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'src/**/*.stories.{js,jsx,ts,tsx}',
  base: '/handtree/',
  addons: {
    width: {
      enabled: true,
      options: {
        xsmall: 414,
        small: 640,
        medium: 768,
        large: 1024
      }
    },
    theme: {
      enabled: true,
      defaultState: 'light'
    }
  }
}