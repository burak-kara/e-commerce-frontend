import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const MuiCustomAlert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const Alert = (props) => {
    const { open, duration, handleClose, severity, message } = props;

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={duration || 3000}
            onClose={handleClose}
        >
            <MuiCustomAlert onClose={handleClose} severity={severity}>
                {message}
            </MuiCustomAlert>
        </Snackbar>
    );
};

export default Alert;
