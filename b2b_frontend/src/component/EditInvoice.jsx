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


const EditInvoice = ({ open, setOpen, selected, reload }) => {

    const [invoice, setinvoice] = React.useState('')
    const [terms, setpaymentterms] = React.useState('')

    const handleInvoiceCur = (event) => {
        setinvoice(event.target.value)
    }
    const handleCustPaymentTerms = (event) => {
        setpaymentterms(event.target.value)
    }

    const cancel = () => {
        setOpen(false)
    }
    const Editit = () => {

        axios.get(`http://localhost:8080/b2b_backend/EditInvoice?InvoiceCurrencey=${invoice}&CustomerPaymentTerms=${terms}&selected=${selected[0]}`)

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
                            Edit
                        </Grid>
                        <Grid item xs={6}>
                            <TextField size="small" onChange={(event) => handleInvoiceCur(event)} id="filled-basic" className={styles.Search}
                                label="Invoice Currencey" variant="filled" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField size="small" id="filled-basic" onChange={(event) => handleCustPaymentTerms(event)} className={styles.Search}
                                label="Customer Payment Terms" variant="filled" />
                        </Grid>


                        <Grid item xs={6}>
                            <Button className={styles.Button} onClick={Editit}>Edit</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className={styles.Button} onClick={cancel}><Typography align="center">Cancel</Typography> </Button>
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                </MuiDialogTitle>
            </Dialog>
        </Fragment >


    );
};

export default EditInvoice;
