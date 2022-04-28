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


const AdvanceSearch = ({ open, setOpen, setisAdvance, setadvanceresult, setPage }) => {

    const [invoice_id, setinvoiceid] = React.useState('')
    const [doc_id, setdocid] = React.useState('')
    const [cust_number, setCustNumber] = React.useState('')
    const [business_year, setBusinessyear] = React.useState('')

    const handleInvoiceId = (event) => {
        setinvoiceid(event.target.value)
    }
    const handledocID = (event) => {
        setdocid(event.target.value)
    }
    const handlecustNum = (event) => {
        setCustNumber(event.target.value)
    }
    const handlebusinessYear = (event) => {
        setBusinessyear(event.target.value)
    }


    const cancel = () => {
        setOpen(false)
    }
    const Search = () => {

        axios.get(`http://localhost:8080/b2b_backend/AdvanceSearch?doc_id=${doc_id}&invoice_id=${invoice_id}&cust_number=${cust_number}&business_year=${business_year}`)
            .then((response) => {
                setPage(0)
                setadvanceresult(response.data)
                setisAdvance(true)
            })
            .catch((error) => {
                console.log(error)
            })

        setOpen(false)



    }


    const styles = styless()
    return (

        <Fragment>
            <Dialog open={open} maxWidth={"80vh"}>
                <MuiDialogTitle className={styles.Body} >


                    <Grid container spacing={3} width="80vh">
                        <Grid item xs={12}>
                            Advance Search
                        </Grid>
                        <Grid item xs={6}>
                            <TextField size="small" onChange={(event) => handledocID(event)} id="filled-basic" className={styles.Search}
                                label="Document ID" variant="filled" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField size="small" id="filled-basic" onChange={(event) => handleInvoiceId(event)} className={styles.Search}
                                label="Invoice ID" variant="filled" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField size="small" onChange={(event) => handlecustNum(event)} id="filled-basic" className={styles.Search}
                                label="Customer Number" variant="filled" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField size="small" id="filled-basic" onChange={(event) => handlebusinessYear(event)} className={styles.Search}
                                label="Business Year" variant="filled" />
                        </Grid>

                        <Grid item xs={6}>
                            <Button className={styles.Button} onClick={Search}>Search</Button>
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

export default AdvanceSearch;
