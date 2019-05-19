module.exports = {
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    colors: {
      transparent: 'transparent',

      black: '#000',
      white: '#fff',

      grey: {
        100: '#f8fafc',
        200: '#f1f5f8',
        400: '#dae1e7',
        500: '#b8c2cc',
        600: '#8795a1',
        700: '#606f7b',
        800: '#3d4852'
      },

      red: {
        100: '#fcebea',
        300: '#f9acaa',
        400: '#ef5753',
        500: '#e3342f',
        600: '#cc1f1a',
        700: '#621b18',
        800: '#3b0d0c'
      },

      teal: {
        500: '#4dc0b5',
        600: '#38a89d',
        700: '#25a195',
        800: '#20504f'
      }
    },
    spacing: {
      px: '1px',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '32': '8rem',
      '40': '10rem',
      '48': '12rem',
      '56': '14rem',
      '64': '16rem'
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    fontFamily: {
      sans: [
        '"HK Grotesk"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ],
      serif: [
        'Athelas',
        'Constantia',
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif'
      ],
      mono: [
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace'
      ]
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem'
    },
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    },
    letterSpacing: {
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '.1em'
    },
    textColor: theme => theme('colors'),
    backgroundColor: theme => theme('colors'),
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top'
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain'
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
      '8': '8px'
    },
    borderColor: theme => {
      return global.Object.assign(
        { default: theme('colors.grey.400') },
        theme('colors')
      );
    },
    borderRadius: {
      none: '0',
      sm: '.125rem',
      default: '.25rem',
      lg: '.5rem',
      full: '9999px'
    },
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      move: 'move',
      'not-allowed': 'not-allowed'
    },
    width: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.33333%',
      '2/3': '66.66667%',
      '1/4': '25%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.66667%',
      '5/6': '83.33333%',
      full: '100%',
      screen: '100vw'
    }),
    height: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh'
    }),
    minWidth: {
      '0': '0',
      full: '100%'
    },
    minHeight: {
      '0': '0',
      full: '100%',
      screen: '100vh'
    },
    maxWidth: {
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      full: '100%'
    },
    maxHeight: {
      full: '100%',
      screen: '100vh'
    },
    padding: theme => theme('spacing'),
    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing'))
    }),
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top'
    },
    boxShadow: {
      default: '0 1px 4px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)',
      lg:
        '0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
      xl:
        '0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, .25)',
      inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      outline: '0 0 0 3px rgba(66,153,225,0.5)',
      none: 'none'
    },
    zIndex: {
      auto: 'auto',
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50
    },
    opacity: {
      '0': '0',
      '25': '.25',
      '50': '.5',
      '75': '.75',
      '100': '1'
    },
    fill: {
      current: 'currentColor'
    },
    stroke: {
      current: 'currentColor'
    },
    flex: {
      '1': '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none'
    },
    flexGrow: {
      '0': 0,
      default: 1
    },
    flexShrink: {
      '0': 0,
      default: 1
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal'
    },
    inset: {
      '0': 0,
      auto: 'auto'
    },
    container: {
      center: true,
      padding: '1rem'
    }
  },
  variants: {
    // appearance: ['responsive'],
    // backgroundAttachment: ['responsive'],
    // backgroundColor: ['responsive', 'hover', 'focus'],
    // backgroundPosition: ['responsive'],
    // backgroundRepeat: ['responsive'],
    // backgroundSize: ['responsive'],
    // borderCollapse: [],
    borderColor: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive', 'hover'],
    borderWidth: ['responsive', 'hover'],
    // cursor: ['responsive'],
    display: ['responsive'],
    flexDirection: ['responsive'],
    flexWrap: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    justifyContent: ['responsive'],
    alignContent: ['responsive'],
    flex: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    // float: ['responsive'],
    fontFamily: ['responsive'],
    fontWeight: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive'],
    // maxHeight: ['responsive'],
    // maxWidth: ['responsive'],
    // minHeight: ['responsive'],
    // minWidth: ['responsive'],
    // objectFit: ['responsive'],
    // objectPosition: ['responsive'],
    // opacity: ['responsive'],
    outline: ['focus'],
    // overflow: ['responsive'],
    padding: ['responsive'],
    // pointerEvents: ['responsive'],
    // position: ['responsive'],
    // inset: ['responsive'],
    // resize: ['responsive'],
    boxShadow: ['responsive', 'hover', 'focus'],
    // fill: [],
    // stroke: [],
    // tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover', 'focus'],
    fontSize: ['responsive'],
    fontStyle: ['responsive'],
    textTransform: ['responsive'],
    textDecoration: ['responsive', 'hover', 'focus'],
    // fontSmoothing: ['responsive'],
    // letterSpacing: ['responsive'],
    // userSelect: ['responsive'],
    // verticalAlign: ['responsive'],
    // visibility: ['responsive'],
    // whitespace: ['responsive'],
    // wordBreak: ['responsive'],
    width: ['responsive']
    // zIndex: ['responsive']
  },
  corePlugins: {},
  plugins: [
    require('tailwindcss-transforms')({
      variants: ['hover'],
      translate: {
        '1/2': '50%',
        full: '100%'
      },
      negativeTranslate: {
        '1/2': '50%',
        full: '100%'
      },
      scale: {
        '90': '0.9',
        '100': '1',
        '105': '1.05',
        '110': '1.1'
      },
      rotate: {
        '90': '90deg',
        '180': '180deg',
        '270': '270deg'
      },
      negativeRotate: {
        '90': '90deg',
        '180': '180deg',
        '270': '270deg'
      },
      skew: {
        '5': '5deg'
      },
      negativeSkew: {
        '5': '5deg'
      },
      origins: {
        t: '50% 0%',
        r: '100% 50%',
        b: '50% 100%',
        l: '0% 50%'
      }
    })
  ]
};
