import React, { useState } from 'react';
import { Button, Drawer } from '@mui/material';

const DrawerComponent = () => {
  const [state, setState] = useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Add your content here */}
      <p>This is the drawer content</p>
    </div>
  );

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer('top', true)}>Open Top Drawer</Button>
      <Drawer
        anchor='top'
        open={state['top']}
        onClose={toggleDrawer('top', false)}
      >
        {list('top')}
      </Drawer>
    </React.Fragment>
  );
};

export default DrawerComponent;
