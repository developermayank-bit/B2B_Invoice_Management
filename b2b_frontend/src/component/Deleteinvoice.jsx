import { Button, Dialog, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";


const styless = makeStyles(() => ({
    Body: {
        backgroundColor: "#2d4250",
        color: "white",

        width: "30vw"
    },
    Search: {
        backgroundColor: "white",
        width: "13.5vw",
    },
    Button: {
        color: "white",
        width: "13.5vw",
        border: "0.15rem solid lightskyblue",
        '&:hover': {
            backgroundColor: "lightskyblue"
        },

    },
    SearchDate: {
        backgroundColor: "white",
        width: "13.2vw",
        paddingLeft: "0.4rem"
    }
}))


const Deleteinvoice = ({ open, setOpen, selected, reload }) => {

    const close = () => {
        setOpen(false)
    }

    const Deleteit = () => {

        axios.get(`http://localhost:8080/b2b_backend/DeleteInvoice?selected=${selected}`)
        setOpen(false)
        reload()
    }

    const styles = styless()
    return (
        <Fragment>
            <Dialog open={open} maxWidth={"80vh"}>
                <MuiDialogTitle className={styles.Body} >


                    <Grid container spacing={3} width="80vh">
                        <Grid item xs={12}>
                            Do you want to Delete the Seleced data?
                        </Grid>



                        <Grid item xs={6}>
                            <Button className={styles.Button} onClick={Deleteit}>Delete</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className={styles.Button} onClick={close}><Typography align="center">Cancel</Typography> </Button>
                        </Grid>

                    </Grid>
                </MuiDialogTitle>
            </Dialog>
        </Fragment >
    )
}

export default Deleteinvoice;
