import React, { useRef, useState } from 'react'
import { Box, ClickAwayListener, Grow, IconButton, Paper, Popper } from '@mui/material'

// eslint-disable-next-line react/prop-types
const IconPopover = ({ icon, children }) => {
  const [emojiOpen, setEmojiOpen] = useState(false)
  const emojiAnchorRef = useRef(null)

  const handleClose = e => {
    if (emojiAnchorRef.current && emojiAnchorRef.current.contains(e.target)) {
      return
    }

    setEmojiOpen(false)
  }

  return (
    <>
      <IconButton
        ref={emojiAnchorRef}
        aria-controls={emojiOpen ? 'emoji-popover' : undefined}
        aria-expanded={emojiOpen ? 'true' : undefined}
        aria-haspopup="true"
        onClick={() => setEmojiOpen(!emojiOpen)}
      >
        {icon}
      </IconButton>
      <Popper
        open={emojiOpen}
        anchorEl={emojiAnchorRef.current}
        placement="top-end"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'bottom right'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Box>{children}</Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default React.memo(IconPopover)
