import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Card } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import LoginCard from './loginCard'
const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    button: {
        '&:hover': {
            backgroundColor: theme.palette.info.main,
        }
    }
}));

export default function AnimatedModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

            {/* <Button variant="contained" color="secondary" onClick={handleOpen}>
                Open Animated Modal
            </Button> */}
    return (
        <>
            <Button variant={ props.button.variant } color={ props.button.color } onClick={handleOpen} className={classes.button}>
                { props.button.text }
            </Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                {React.cloneElement(props.popupCard, { close: handleClose })}
                </Fade>
            </Modal>
        </>
    );
}