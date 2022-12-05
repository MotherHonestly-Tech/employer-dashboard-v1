import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

import MHButton from '../Button/MHButton';
import { formatFileSize } from '../../utils/utils';
import { ReactComponent as CheckMarkIcon } from '../../static/svg/check-mark-md.svg';

type UploadProps = {
  element: React.ReactElement;
  htmlFor?: string;
  file: File | null;
  accept: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  containerSx?: object;
  fileThumb?: React.ReactElement;
  multiple?: boolean;
  isDragActive: boolean;
  onDragEnter?: (event: React.DragEvent<HTMLLabelElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLLabelElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLLabelElement>) => void;
};

type UploadRef = {
  uploadEl: React.RefObject<HTMLInputElement>;
};

const UploadWrapper = styled('div')<{ isdragactive: number }>(({ theme, isdragactive }) => ({
  border: 2,
  borderColor: '#ADADAD',
  padding: theme.spacing(2),
  textAlign: 'center',
  borderStyle: 'dashed',
  borderRadius: theme.shape.borderRadius,
  overflowX: 'hidden',
  position: 'relative',
  '& > svg': {
    textAlign: 'center',
    display: 'inline-block',
    marginBottom: theme.spacing(1)
  },
  ...(isdragactive && {
    '&::after': {
      width: '100%',
      height: '100%',
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: '#b4ebe9',
      opacity: 0.5,
      transition: 'opacity 0.2s ease-in-out'
    }
  })
}));

const UploadThumb = ({ file }: { file: File | null }) =>
  file ? (
    <Stack direction="row" alignItems="center" spacing={2} mt={2}>
      <Stack
        direction="row"
        alignItems="center"
        flexGrow={1}
        spacing={1}
        p={1}
        bgcolor="#E5E5E5">
        {/* <img src={URL.createObjectURL(file)} alt="receipt" /> */}
        <div>
          <Typography
            variant="body1"
            color="#194049"
            fontSize=".7rem"
            gutterBottom>
            {file!.name}
          </Typography>
          <Typography variant="body1" color="#A6A6A6" fontSize="10px">
            {formatFileSize(file.size)}
          </Typography>
        </div>
      </Stack>

      <MHButton
        startIcon={<CheckMarkIcon width=".8rem" />}
        sx={{
          width: 180
        }}>
        Upload File
      </MHButton>
    </Stack>
  ) : null;

const UploadInput = styled('input')(
  ({ theme }) => `
    visibility: hidden;
  `
);

export default React.forwardRef(
  (
    {
      element,
      htmlFor,
      file,
      accept,
      fileThumb,
      onChange,
      containerSx,
      onDragEnter,
      onDragLeave,
      onDrop,
      isDragActive
    }: UploadProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const uploadInputRef = React.useRef<HTMLInputElement>(null);

    const preventDefault = (e: React.SyntheticEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDragEnter = function (e: React.DragEvent<HTMLLabelElement>) {
      preventDefault(e);
      if (e.type === 'dragenter' || e.type === 'dragover') {
        onDragEnter && onDragEnter(e);
      }
    };

    const handleDragLeave = function (e: React.DragEvent<HTMLLabelElement>) {
      preventDefault(e);
      if (e.type === 'dragleave') {
        onDragLeave && onDragLeave(e);
      }
    };

    const handleDrop = function (e: React.DragEvent<HTMLLabelElement>) {
      preventDefault(e);
      onDrop && onDrop(e);
    };

    React.useImperativeHandle(
      ref,
      () =>
        ({
          uploadEl: uploadInputRef.current
        } as any)
    );

    return (
      <Box sx={{ ...containerSx }}>
        <Box
          component="label"
          htmlFor={htmlFor || 'file-upload'}
          sx={{
            cursor: 'pointer'
          }}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
          <UploadWrapper isdragactive={isDragActive ? 1 : 0}>
            {element}
          </UploadWrapper>
          <UploadInput
            hidden
            type="file"
            id={htmlFor || 'file-upload'}
            accept={accept}
            onChange={onChange}
            ref={uploadInputRef}
          />
        </Box>

        {file && <UploadThumb file={file} />}
      </Box>
    );
  }
);
