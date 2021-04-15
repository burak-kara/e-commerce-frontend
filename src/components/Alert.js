import React from 'react';
import { connect } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { closeAlert } from '../_redux/actions';

const MuiCustomAlert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const Alert = (props) => {
    const { open, duration, severity, message } = props;

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={duration || 3000}
            onClose={() => props.closeAlert()}
        >
            <MuiCustomAlert onClose={() => props.closeAlert()} severity={severity}>
                {message}
            </MuiCustomAlert>
        </Snackbar>
    );
};

const mapStateToProps = (props) => props.alert;

export default connect(mapStateToProps, { closeAlert })(Alert);
