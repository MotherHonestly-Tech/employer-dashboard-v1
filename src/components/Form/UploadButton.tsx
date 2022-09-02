import React from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/system';

/* eslint-disable */

type UploadProps = {
  element: React.ReactElement;
  htmlFor?: string;
  file: File | null;
  accept: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileThumb?: React.ReactElement;
  multiple?: boolean;
  onDrag?: (event: React.DragEvent<HTMLLabelElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLLabelElement>) => void;
};

type UploadRef = {
  uploadEl: React.RefObject<HTMLInputElement>;
};

const UploadInput = styled('input')(
  ({ theme }) => `
    visibility: hidden;
  `
);

export default React.forwardRef(({
  element,
  htmlFor,
  file,
  accept,
  fileThumb,
  onChange,
  onDrag,
  onDrop
}: UploadProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  const uploadInputRef = React.useRef<HTMLInputElement>(null);

  const preventDefault = (e: React.SyntheticEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrag = function (e: React.DragEvent<HTMLLabelElement>) {
    preventDefault(e);
    onDrag && onDrag(e);
  };

  const handleDrop = function (e: React.DragEvent<HTMLLabelElement>) {
    preventDefault(e);
    onDrop && onDrop(e);
  };

  React.useImperativeHandle(ref, () => ({
    uploadEl: uploadInputRef.current
  } as any));

  return (
    <React.Fragment>
      <Box
        component="label"
        htmlFor={htmlFor || 'file-upload'}
        sx={{
          cursor: 'pointer'
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}>
        {element}
        <UploadInput
          hidden
          type="file"
          id={htmlFor || 'file-upload'}
          accept={accept}
          onChange={onChange}
          ref={uploadInputRef}
        />
      </Box>

      {file && fileThumb && fileThumb}
    </React.Fragment>
  );
});
