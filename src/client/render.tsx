// We've set up this sample using CSS modules, which lets you import class
// names into JavaScript: https://github.com/css-modules/css-modules
// You can configure or change this in the webpack.config.js file.
// import * as style from './style.css';
import type { RendererContext } from 'vscode-notebook-renderer';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import ReactDOM from 'react-dom';
import React from 'react';
import Typography from '@mui/material/Typography';

interface IRenderInfo {
  container: HTMLElement;
  mime: string;
  value: any;
  context: RendererContext<unknown>;
}

function ModalElement() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [anchorPosition, setAnchorPosition] = React.useState({top: 0, left: 0});
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        const {top, left} = event.currentTarget.getBoundingClientRect();
        setAnchorPosition({
            top: top + event.currentTarget.clientHeight,
            left: left + event.currentTarget.clientWidth
        })
      };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  

    return (
        <div>
          <Button aria-describedby={id} variant="contained" onClick={handleClick}>
            Open Popover
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorReference='anchorPosition'
            anchorPosition={anchorPosition}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}            
          >
            <Typography sx={{ p: 2, height:'500px' }}>The content of the Popover.</Typography>
          </Popover>
        </div>
      );
    
}

// This function is called to render your contents.
export function render({ container, mime, value }: IRenderInfo) {
    console.log(container, mime, value);
  // Format the JSON and insert it as <pre><code>{ ... }</code></pre>
  // Replace this with your custom code!
  ReactDOM.render(<ModalElement />, container);
}

if (module.hot) {
  module.hot.addDisposeHandler(() => {
    // In development, this will be called before the renderer is reloaded. You
    // can use this to clean up or stash any state.
  });
}
