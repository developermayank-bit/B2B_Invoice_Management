import { Button, Dialog, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";



const styless = makeStyles(() => ({
    Body: {
        backgroundColor: "#2d4250",
        color: "white",

        width: "80vw"
    },
    Search: {
        backgroundColor: "white",
        width: "13.5vw",
    },
    Button: {
        color: "white",
        width: "65vh",
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



const AddInvoice = ({ open, setOpen, reload }) => {

    const styles = styless()
    const handleClose = () => {
        setOpen(false)

    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;



    const [bsnesCode, setbsnesCode] = React.useState('')
    const [custno, setcustno] = React.useState('')
    const [clrdate, setclrdate] = React.useState(today)
    const [bsnsyear, setbsnsyear] = React.useState('')
    const [docid, setdocid] = React.useState('')
    const [pstingdate, setpstingdate] = React.useState(today)
    const [doccreatedate, setdoccreatedate] = React.useState(today)
    const [invccur, setinvccur] = React.useState('')
    const [doctype, setdoctype] = React.useState('')
    const [pstingid, setpstingid] = React.useState('')
    const [totalOpenamt, settotalOpenamt] = React.useState('')
    const [bslinedate, setbslinedate] = React.useState(today)
    const [custterms, setcustterms] = React.useState('')
    const [invid, setinvid] = React.useState('')
    const [duedate, setduedate] = React.useState(today)


    const handleBuisnessCode = (event) => {
        setbsnesCode(event.target.value)
    }
    const handleCustomerNum = (event) => {
        setcustno(event.target.value)
    }
    const handleClearDate = (event) => {
        setclrdate(event.target.value)
    }
    const handleBuisnessYear = (event) => {
        setbsnsyear(event.target.value)
    }
    const handleDocID = (event) => {
        setdocid(event.target.value)
    }
    const handlePostingDate = (event) => {
        setpstingdate(event.target.value)
    }
    const handleDocCreateDate = (event) => {
        setdoccreatedate(event.target.value)
    }
    const handleDueDate = (event) => {
        setduedate(event.target.value)
    }
    const handleInvoiceCurrency = (event) => {
        setinvccur(event.target.value)
    }
    const handleDocType = (event) => {
        setdoctype(event.target.value)
    }
    const handlePostingID = (event) => {
        setpstingid(event.target.value)
    }
    const handleTotalOpenAmt = (event) => {
        settotalOpenamt(event.target.value)
    }
    const handleBaseLineCreateDate = (event) => {
        setbslinedate(event.target.value)
    }
    const handleCustomerPaymentTerms = (event) => {
        setcustterms(event.target.value)
    }
    const handleInvoiceID = (event) => {
        setinvid(event.target.value)
    }

    const Addit = () => {
        if (bsnesCode !== '' & custno !== '' & clrdate !== '' & bsnsyear !== '' & docid !== '' & pstingdate !== '' & doccreatedate !== '' & duedate !== '' & invccur !== '' & doctype !== '' & pstingdate !== '' & totalOpenamt !== '' & bslinedate !== '' & custterms !== '' & invid !== '') {
            axios.get(`http://localhost:8080/b2b_backend/AddInvoice?buisnessCode=${bsnesCode}&CustomerNum=${custno}&ClearDate=${clrdate}&BuisnessYear=${bsnsyear.slice(0, 4)}&DocID=${docid}&PostingDate=${pstingdate}&DocumentCreateDate=${doccreatedate}&DueDate=${duedate}&InvoiceCur=${invccur}&DocumentType=${doctype}&PostingID=${pstingid}&TotalOpenAmt=${totalOpenamt}&BaseLineDate=${bslinedate}&CustomerPayTerms=${custterms}&invoiceID=${invid}`)
            setOpen(false)
            reload()
        } else {
            alert("Enter Data in all the fields")
        }
    }



    return (

        <Fragment>
            <Dialog open={open} maxWidth={"80vh"} onClose={handleClose} >
                <MuiDialogTitle className={styles.Body} >


                    <Grid container spacing={3} width="80vh">
                        <Grid item xs={12}>
                            ADD
                        </Grid>
                        <Grid item xs={3}>
                            <TextField size="small" id="filled-basic" className={styles.Search} onChange={(event) => handleBuisnessCode(event)}
                                label="Buisness Code" variant="filled" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField size="small" id="filled-basic" onChange={(event) => handleCustomerNum(event)} className={styles.Search}
                                label="Customer Number" variant="filled" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="date"
                                label="Clear Date"
                                type="date"
                                onChange={(event) => handleClearDate(event)}
                                defaultValue={today}
                                className={styles.SearchDate}

                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Buisness Year"
                                id="filled-basic"
                                size="small"
                                variant="filled"
                                onChange={(event) => handleBuisnessYear(event)}
                                className={styles.Search} />
                        </Grid>
                        <Grid item xs={3}>

                            <TextField size="small" id="filled-basic" onChange={(event) => handleDocID(event)} className={styles.Search}
                                label="Document ID" variant="filled" />

                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="date"
                                label="Posting Date"
                                type="date"
                                defaultValue={today}
                                onChange={(event) => handlePostingDate(event)}
                                className={styles.SearchDate}

                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="date"
                                label="Document Create Date"
                                type="date"
                                defaultValue={today}
                                onChange={(event) => handleDocCreateDate(event)}
                                className={styles.SearchDate}

                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="date"
                                label="Due Date"
                                type="date"
                                defaultValue={today}
                                onChange={(event) => handleDueDate(event)}
                                className={styles.SearchDate}

                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField size="small" id="filled-basic" onChange={(event) => handleInvoiceCurrency(event)} className={styles.Search}
                                label="Invoice Currencey" variant="filled" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField size="small" id="filled-basic" onChange={(event) => handleDocType(event)} className={styles.Search}
                                label="Document Type" variant="filled" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField size="small" id="filled-basic" className={styles.Search} onChange={(event) => handlePostingID(event)}
                                label="Posting ID" variant="filled" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField size="small" id="filled-basic" className={styles.Search} onChange={(event) => handleTotalOpenAmt(event)}
                                label="Total Open Amount" variant="filled" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="date"
                                label="BaseLine Create Date"
                                type="date"
                                defaultValue={today}
                                onChange={(event) => handleBaseLineCreateDate(event)}
                                className={styles.SearchDate}

                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField size="small" id="filled-basic" className={styles.Search}
                                label="Customer Payment Terms" variant="filled" onChange={(event) => handleCustomerPaymentTerms(event)} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField size="small" id="filled-basic" className={styles.Search}
                                label="Invoice ID" variant="filled" onChange={(event) => handleInvoiceID(event)} />
                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                        <Grid item xs={6}>
                            <Button className={styles.Button} onClick={Addit}>Add</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className={styles.Button} onClick={handleClose}><Typography align="center">Cancel</Typography> </Button>
                        </Grid>
                    </Grid>
                </MuiDialogTitle>
            </Dialog>
        </Fragment >


    );
};

export default AddInvoice;
