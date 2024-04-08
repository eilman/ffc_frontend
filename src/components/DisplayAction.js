

import React from 'react';
import { IconButton } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';

const DisplayAction = (props) => {
  const { rowData, onClick } = props;

  return (
    <IconButton onClick={(event) => onClick(event, rowData)}>
      <Visibility />
    </IconButton>
  );
};

export default DisplayAction;