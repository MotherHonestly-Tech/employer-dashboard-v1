import React from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/system';

/* eslint-disable */

type UploadProps = {
  element: React.ReactElement;
  htmlFor?: string;
  file: File | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileThumb?: React.ReactElement;
  multiple?: boolean;
  onDrag?: (event: React.DragEvent<HTMLLabelElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLLabelElement>) => void;
};

const UploadInput = styled('input')(
  ({ theme }) => `
    visibility: hidden;
  `
);

export default ({
  element,
  htmlFor,
  file,
  fileThumb,
  onChange,
  onDrag,
  onDrop
}: UploadProps) => {
  const handleDrag = function (e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    onDrag && onDrag(e);
  };

  const handleDrop = function (e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    onDrop && onDrop(e);
  };

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
          accept="image/*"
          onChange={onChange}
        />
      </Box>

      {file && fileThumb && fileThumb}
    </React.Fragment>
  );
};
