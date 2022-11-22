import React from 'react';

import Dialog, { DialogProps, dialogClasses } from '@mui/material/Dialog';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';

import IconButtonStyled from '../Button/IconButtonStyled';
import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import { ReactComponent as CloseIcon } from '../../static/svg/cancel.svg';

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
    padding: `${theme.spacing(0)} ${theme.spacing(2)} ${theme.spacing(2)}`
  },
  transition: 'all 0.3s ease-in-out'
}));

type ModalTitleProps = {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
  iconcolor?: string;
};

const CustomizedDialogTitle = (props: DialogTitleProps & ModalTitleProps) => {
  const { id, children, onClose, ...rest } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 1.8 }}
      id={id}
      fontFamily="Area-Normal-Black"
      fontSize="1.2rem"
      {...rest}>
      {children}
      {onClose ? (
        <IconButtonStyled
          aria-label="close"
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 10,
            top: 12,
            zIndex: 99999
          }}>
          <CloseIcon width="1.6em" color={rest.iconcolor || '#194049'} />
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
  actions?: React.ReactElement | null;
  closeiconcolor?: string;
}) => {
  const onDialogClose = (
    event: {},
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    // disables backdrop click close, create function prop and call handleClose to close
  };

  return (
    <CustomizedDialog
      open={open}
      aria-labelledby="customized-dialog"
      onClose={onDialogClose}
      disableEscapeKeyDown
      {...others}>
      {title && (
        <CustomizedDialogTitle
          id="customized-dialog-title"
          iconcolor={others.closeiconcolor}
          onClose={handleClose}>
          {title}
        </CustomizedDialogTitle>
      )}
      <DialogContent
        sx={{
          overflowX: 'hidden'
        }}>
        <div>{children}</div>
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </CustomizedDialog>
  );
};

export default MHDialog;
