import { createTheme } from '@mui/material/styles';
import { red, common } from '@mui/material/colors';
import { buttonClasses } from '@mui/material/Button';

const primaryColor = '#194049';

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      light: common.white
    },
    secondary: {
      main: '#F4EE46',
      light: '#B6B6B6'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#F5F5F5',
      paper: '#F8F8F8'
      // paper: common.white
    },
    grey: {
      600: '#F1F1F1',
      700: '#A9A9A9',
      800: '#77633B',
      900: '#ADADAD'
    }
    // action: {
    //   active: primaryColor,
    //   hover: primaryColor,
    //   selected: primaryColor,
    //   disabled: '#F5F5F5',
    //   disabledBackground: '#F5F5F5',
    //   focus: primaryColor,
    // }
  },
  typography: {
    fontFamily: 'Area-Normal-Semibold, sans-serif',
    // fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: 'Columbia-Sans'
    },
    subtitle1: {
      fontFamily: 'Area-Normal-Black'
    },
    subtitle2: {
      fontFamily: 'Area-Normal-Bold'
    },
    body1: {
      fontFamily: 'Area-Normal-Semibold'
    }
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontSize: '0.8rem',
          fontFamily: 'Area-Normal-Semibold',
          borderRadius: 0,
          boxShadow: 'none',
          textTransform: 'none',
          padding: '6px 12px',
          letterSpacing: '0.05em',
          borderStyle: 'solid',
          ':hover': {
            backgroundColor: '#F2EC2C',
            color: primaryColor
          },
          ':active': {
            backgroundColor: '#F2EC2C',
            color: primaryColor
          },
          transition: '0.32s ease-out',
          ...{
            [`&.${buttonClasses.outlined}:hover`]: {
              backgroundColor: '#F1F1F1',
              borderColor: '#F1F1F1'
            }
          },
          ...{
            [`&.${buttonClasses.outlined}:active`]: {
              backgroundColor: '#F1F1F1',
              borderColor: '#F1F1F1'
            }
          },
          ...{
            [`&.${buttonClasses.containedSecondary}`]: {
              backgroundColor: '#F2EC2C',
              borderColor: '#F2EC2C',
              color: primaryColor,
              borderWidth: 1
            }
          },
          ...{
            [`&.${buttonClasses.containedSecondary}:hover`]: {
              backgroundColor: 'transparent',
              color: primaryColor,
              borderColor: '#F2EC2C'
            }
          },
          ...{
            [`&.${buttonClasses.containedSecondary}:active`]: {
              backgroundColor: 'transparent',
              color: primaryColor,
              borderColor: '#F2EC2C'
            }
          },
          ...{
            [`&.${buttonClasses.containedError}`]: {
              // borderColor: ,
              // color: primaryColor,
              borderWidth: 1
            }
          },
          ...{
            [`&.${buttonClasses.containedError}:hover`]: {
              backgroundColor: 'transparent',
              color: '#ff1744',
              borderColor: '#ff1744'
            }
          },
          ...{
            [`&.${buttonClasses.containedError}:active`]: {
              backgroundColor: 'transparent',
              color: '#ff1744',
              borderColor: '#ff1744'
            }
          }
        }
      },
      defaultProps: {
        // disableRipple: true
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 5px 26px rgba(197, 216, 222, 0.25)'
        }
      },
      defaultProps: {
        square: true
      }
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '1.8rem',
          fontFamily: 'Columbia-Sans',
          color: primaryColor
        },
        h2: {
          fontSize: '1.4rem',
          fontFamily: 'Columbia-Sans',
          color: primaryColor
        },
        h3: {
          fontSize: '1.2rem',
          fontFamily: 'Columbia-Sans',
          color: primaryColor
        },
        h4: {
          fontSize: '1rem',
          fontFamily: 'Columbia-Sans',
          color: primaryColor
        },
        subtitle1: {
          fontSize: '1rem',
          fontFamily: 'Area-Normal-Black',
          color: primaryColor,
          fontWeight: 300
        },
        subtitle2: {
          fontSize: '1rem',
          fontFamily: 'Area-Normal-Bold',
          color: primaryColor,
          fontWeight: 300
        },
        body1: {
          fontSize: '0.8rem',
          fontFamily: 'Area-Normal-Semibold',
          color: primaryColor
        },
        body2: {
          fontSize: '0.8rem',
          fontFamily: 'Area-Normal-Semibold',
          color: primaryColor,
          fontWeight: 300
        }
      },
      defaultProps: {}
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: common.white,
          boxShadow: '0px 4px 15px rgba(221, 221, 221, 0.25)',
          paddingBlock: 7
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: common.white,
          opacity: 1
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          fontSize: '0.8rem',
          lineHeight: 1.5
        }
      }
    }

    // MuiTable: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: common.white,
    //       boxShadow: '0px 4px 15px rgba(221, 221, 221, 0.25)',
    //       paddingBlock: 7,
    //       borderRadius: 0,
    //       border: 'none',
    //       '&:hover': {
    //         backgroundColor: common.white,
    //         boxShadow: '0px 4px 15px rgba(221, 221, 221, 0.25)',
    //         paddingBlock: 7,
    //         borderRadius: 0,
    //         border: 'none',
    //         display: 'table',
    //         width: '100%',
    //         height: '100%',
    //         cursor: 'pointer'
    //       }
    //     }
    //   }
    // },
    // MuiTableCell: {
    //   styleOverrides: {
    //     root: {
    //       padding: '0px',
    //       border: 'none',
    //       borderRadius: 0,
    //       backgroundColor: common.white,
    //       boxShadow: '0px 4px 15px rgba(221, 221, 221, 0.25)',
    //       '&:hover': {
    //         backgroundColor: common.white,
    //         boxShadow: '0px 4px 15px rgba(221, 221, 221, 0.25)',
    //         paddingBlock: 7,
    //         borderRadius: 0,
    //         border: 'none',
    //         display: 'table',
    //         width: '100%',
    //         height: '100%',
    //         cursor: 'pointer',
    //         '& $content': {
    //           color: primaryColor,
    //           fontWeight: 'bold',
    //           fontSize: '0.85rem',
    //           fontFamily: 'Avenir-Book',
    //           textTransform: 'uppercase',
    //           padding: '0px',
    //           border: 'none',
    //           borderRadius: 0,
    //           backgroundColor: common.white,
    //           boxShadow: '0px 4px 15px rgba(221, 221, 221, 0.25)'
    //         }
    //       }
    //     }
    //   }
    // }
  }
});
