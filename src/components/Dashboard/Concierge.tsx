import React from 'react';

import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import ConciergeDialog from './ConciergeDialog';
import MHButton from '../Button/MHButton';

const BackgroundOverlay = styled((props) => (
  <>
    <Box
      component="div"
      sx={{
        position: 'absolute',
        opacity: '0.3',
        top: -10,
        left: 0,
        right: 0,
        bottom: 0
      }}>
      <svg
        width="298"
        height="286"
        viewBox="0 0 298 286"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M222.092 87.222C220.461 107.617 219.645 128.012 218.014 148.408C215.567 185.935 222.092 220.199 240.036 253.647C262.059 295.253 285.713 336.044 295.501 382.545C301.211 410.282 293.87 433.125 273.478 452.704C249.824 475.547 240.036 477.179 209.041 462.494C146.236 432.309 90.7709 390.703 38.5688 345.833C0.232849 313.201 -36.472 278.937 -62.5731 234.883C-96.0151 178.593 -109.881 118.223 -74.8079 57.8529C-29.1311 -20.4648 76.0889 -78.3872 187.018 -18.8331C209.857 -6.59597 220.461 11.3518 221.276 35.8261C222.092 52.9581 221.276 69.2742 221.276 86.4062C221.276 87.222 221.276 87.222 222.092 87.222Z"
          fill="white"
        />
      </svg>
    </Box>
    <Box
      component="div"
      sx={{
        position: 'absolute',
        opacity: '0.3',
        top: 0,
        left: 600,
        right: 0,
        bottom: 0
      }}>
      <svg
        width="236"
        height="32"
        viewBox="0 0 236 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M120.057 -191.917C182.155 -191.917 232.735 -146.875 235.239 -89.8211C237.743 -28.2632 190.168 26.7886 130.073 31.2929C72.4821 35.7971 1.87074 -21.7571 0.368371 -74.8069C-2.63637 -138.867 51.9497 -191.917 120.057 -191.917Z"
          fill="white"
        />
      </svg>
    </Box>

    <Box
      component="div"
      sx={{
        position: 'absolute',
        opacity: '0.3',
        top: 40,
        left: 315,
        right: 0,
        bottom: 0
      }}>
      <svg
        width="544"
        height="232"
        viewBox="0 0 544 232"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M575.989 221.424C567.465 231.948 553.926 225.433 543.397 221.424C516.821 211.402 490.748 200.879 464.172 190.356C452.64 185.846 441.107 180.333 429.073 176.826C368.903 159.788 335.809 190.857 350.852 251.992C357.872 280.054 356.367 304.609 333.302 324.653C304.22 349.708 244.05 336.68 227.001 302.103C221.486 290.577 224.494 280.555 230.511 271.535C242.044 253.997 255.081 237.961 265.611 219.921C272.129 208.897 279.65 194.364 264.106 184.843C249.565 175.823 234.523 179.832 223.491 191.859C211.457 204.888 205.942 221.926 198.922 237.961C182.876 274.542 168.335 312.626 137.749 340.187C111.174 364.241 80.587 377.771 43.9834 365.744C-53.2918 314.13 43.9834 235.957 43.9834 235.957C63.5388 220.422 84.097 205.389 107.664 196.87C132.735 187.85 147.777 170.812 156.803 146.759C162.318 132.728 167.333 118.697 172.848 104.666C198.922 35.0117 252.574 3.943 323.274 0.936344C364.892 -1.06809 402.498 17.974 433.085 43.0295C484.731 85.1227 530.36 134.231 568.468 189.855C573.983 199.376 585.014 210.4 575.989 221.424Z"
          fill="white"
        />
      </svg>
    </Box>

    <img
      src="https://res.cloudinary.com/mother-honestly/image/upload/v1662201263/image_1_qvv1u8.png"
      alt="Consultant"
      className="w-64 h-auto bottom-0 right-24 overflow-visible absolute object-cover object-center"
    />
  </>
))(({ theme }) => ({}));

const Concierge = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className="relative -mt-52">
        <Box
          component="div"
          sx={{
            position: 'relative',
            top: 240,
            left: 499.4,
            right: 0,
            bottom: 0,
            width: '260px',
            height: '300px'
          }}>
          {/* <img
            src="https://res.cloudinary.com/mother-honestly/image/upload/v1658521647/image_bjlqcn.png"
            alt="Consultant"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          /> */}
        </Box>
        <Box
          bgcolor={'#F4EE46'}
          px={0}
          pt={5}
          pb={2.5}
          height={250}
          borderRadius={(theme) => theme.shape.borderRadius}
          position="relative"
          overflow={"hidden"}
          zIndex={1}
          className="overflow-visible"
        >
          <BackgroundOverlay />

          <Box position="relative" className="overflow-visible">
            <Typography
              align="center"
              variant="body1"
              sx={{
                color: '#28404A',
                fontWeight: 600,
                fontSize: '34px',
                float: 'left',
                marginLeft: '100px'
              }}>
              Let’s take some task <br /> off from your plate.
            </Typography>
            <Typography
              variant="body1"
              className="mt-[110px] -ml-[310px]"
              sx={{
                color: '#28404A',
                fontWeight: 500,
                fontSize: '14px',
                float: 'left'
              }}>
              Talk to a dedicated concierge today!
            </Typography>
          </Box>
          <Box className="mt-36 ml-24">
            <MHButton onClick={() => handleClickOpen()} sx={{ width: '300px' }}>
              Start a conversation
            </MHButton>
          </Box>
        </Box>

        {open && <ConciergeDialog open={open} onClose={handleClose} />}
      </Box>
    </>
  );
};

export default Concierge;
