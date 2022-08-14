import React from 'react';

import Dialog, { DialogProps, dialogClasses } from '@mui/material/Dialog';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';

import IconButtonStyled from '../Button/IconButtonStyled';
import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import { ReactComponent as CloseIcon } from '../../static/svg/close.svg';

const CustomizedDialog = styled(Dialog)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 1000,
  [`& .${dialogClasses.paper}`]: {
    borderRadius: '10px',
    overflowX: 'hidden'
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

type ModalTitleProps = {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
};

const CustomizedDialogTitle = (props: DialogTitleProps & ModalTitleProps) => {
  const { id, children, onClose, ...rest } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 1.8 }} id={id} {...rest}>
      {children}
      {onClose ? (
        <IconButtonStyled
          aria-label="close"
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 10,
            top: 12
          }}>
          <RoundedLogoIcon sx={{
            border: 3,
            borderColor: '#6C6C6C',
            backgroundColor: 'transparent',
            width: 35,
            height: 35
          }}>
            <CloseIcon />
          </RoundedLogoIcon>
        </IconButtonStyled>
      ) : null}
    </DialogTitle>
  );
};

const MHDialog = ({
  open,
  title,
  handleClose,
  children,
  actions,
  ...others
}: DialogProps & {
  title: string;
  handleClose: () => void;
  actions?: React.ReactElement;
}) => {
  return (
    <CustomizedDialog
      open={open}
      aria-labelledby="customized-dialog"
      onClose={handleClose}
      {...others}>
      <CustomizedDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </CustomizedDialogTitle>
      <DialogContent sx={{
        overflowX: 'hidden'
      }}>
        <div>{children}</div>
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </CustomizedDialog>
  );
};

export default MHDialog;
