import { Button, Dialog, Grid, makeStyles, Typography } from "@material-ui/core";
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


const Predict = ({ open, setOpen, selected, reload }) => {

    const close = () => {
        setOpen(false)
    }



    const Predictit = () => {

        axios.get(`http://localhost:8080/b2b_backend/ProvideDataforPrediction?selected=${selected}`)
            .then((response) => {

                response.data.map((row) => {

                    axios.post(`http://127.0.0.1:5000/`, {
                        business_code: row.business_code,
                        cust_number: row.cust_number,
                        name_customer: row.name_customer,
                        clear_date: row.clear_date,
                        buisness_year: row.buisness_year,
                        doc_id: row.doc_id,
                        posting_date: row.posting_date,
                        due_in_date: row.due_in_date,
                        baseline_create_date: row.baseline_create_date,
                        cust_payment_terms: row.cust_payment_terms,
                        converted_usd: row.total_open_amt
                    }).then((response1) => {
                        axios.get(`http://localhost:8080/b2b_backend/SetPrediction?selected=${row.doc_id}&prediction=${response1.data[0].aging_bucket}`)
                            .then((response2) => {
                                if (response2.data === true) {
                                    setOpen(false)
                                    reload()
                                }
                            })
                    })
                })

            })
            .catch((error) => {
                console.log(error);
            })



    }

    const styles = styless()
    return (
        <Fragment>
            <Dialog open={open} maxWidth={"80vh"}>
                <MuiDialogTitle className={styles.Body} >


                    <Grid container spacing={3} width="80vh">
                        <Grid item xs={12}>
                            Predict the Seleced data?
                        </Grid>



                        <Grid item xs={6}>
                            <Button className={styles.Button} onClick={Predictit}>Predict</Button>
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

export default Predict;

