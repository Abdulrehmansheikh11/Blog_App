import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const DeleteConfirmationModal = ({ open, handleClose, handleConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this blog post?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ color: 'black' }}>
                    Cancel
                </Button>
                <Button onClick={handleConfirm} style={{ color: 'black' }} autoFocus>
                    Delete
                </Button>

            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationModal;
