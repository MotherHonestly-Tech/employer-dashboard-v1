import React from 'react';

const MHPopper = () => {
  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleHover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  // <Popper open={open} anchorEl={anchorEl} placement={'right-start'} sx={{
  //     position: 'static',
  //     zIndex: theme => theme.zIndex.modal + 9999
  //   }} transition>
  //     {({ TransitionProps }) => (
  //       <Fade {...TransitionProps} timeout={350}>
  //         <Paper>
  //           <Typography sx={{ p: 2 }}>{props.value}</Typography>
  //         </Paper>
  //       </Fade>
  //     )}
  //   </Popper>
  return (
    <div onMouseOver={handleHover} onMouseLeave={handleMouseLeave}>
      MHPopper
    </div>
  );
};

export default MHPopper;
