import { Button, Dialog, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { PieChart, Pie, Tooltip, BarChart, Cell, XAxis, YAxis, CartesianGrid, Bar, ResponsiveContainer, Legend } from "recharts";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios, { Axios } from "axios";


const styless = makeStyles(() => ({
    Body: {
        backgroundColor: "#2d4250",
        color: "white",
        width: "33vw",
        height: "80vh"
    },
    Body2: {
        backgroundColor: "#2d4250",
        color: "white",
        width: "70vw",
    },
    SearchDate: {
        backgroundColor: "white",
        width: "13.2vw",
        padding: "0.4rem",
        borderRadius: "0.5rem"
    },
    Dropdown: {
        backgroundColor: "white",
        width: "13.2vw", padding: "0.4rem"
    },
    Button: {
        color: "white",
        width: "13.5vw",
        border: "0.15rem solid lightskyblue",
        '&:hover': {
            backgroundColor: "lightskyblue"
        },

    }, Search: {
        backgroundColor: "white",
        width: "13.5vw",
    },

}))


const ViewAnalytics = ({ open, setOpen }) => {

    const styles = styless()



    const COLORS = ['#0088FE', '#00C49F'];



    const handleChange = (event) => {
        setcur(event.target.value);
    };
    const cancel = () => {
        setOpen(false)
    }
    const closegraph = () => {
        setBarData([])
        setPieData([])
        setgraph(false)
    }

    const [graph, setgraph] = React.useState(false)

    const [pieData, setPieData] = React.useState([])
    const [barData, setBarData] = React.useState([])

    const graphpop = () => {
        if (cur === 'BOTH') {
            axios.get(`http://localhost:8080/b2b_backend/viewAnalytics?clr_date_from=${clrdatefrom}&clr_date_to=${clrdateto}&due_date_to=${duedateto}&due_date_from=${duedatefrom}&base_date_from=${baselinedatefrom}&base_date_to=${baselinedateto}&Cur=${cur}`)
                .then((response) => {
                    console.log(response.data[0])
                    setPieData(response.data[0]);
                    setBarData(response.data[1])
                })
            // .catch((error) => {
            //     console.log(error);
            // })
            setPie(true)
        } else {
            setPie(false)
            axios.get(`http://localhost:8080/b2b_backend/viewAnalytics?clr_date_from=${clrdatefrom}&clr_date_to=${clrdateto}&due_date_to=${duedateto}&due_date_from=${duedatefrom}&base_date_from=${baselinedatefrom}&base_date_to=${baselinedateto}&Cur=${cur}`)
                .then((response) => {
                    console.log(response.data)
                    setBarData(response.data[0])
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        setgraph(true)
    }

    const [isPie, setPie] = React.useState(false)


    const [clrdatefrom, setclrdatefrom] = React.useState('')
    const [clrdateto, setclrdateto] = React.useState('')
    const [duedatefrom, setduedatefrom] = React.useState('')
    const [duedateto, setduedateto] = React.useState('')
    const [baselinedatefrom, setbaselinedatefrom] = React.useState('')
    const [baselinedateto, setbaselinedateto] = React.useState('')
    const [cur, setcur] = React.useState('')

    const handleChangeclrfrom = (event) => {
        setclrdatefrom(event.target.value)
    }
    const handleChangeclrto = (event) => {
        setclrdateto(event.target.value)
    }
    const handleChangedueto = (event) => {
        setduedateto(event.target.value)
    }
    const handleChangeduefrom = (event) => {
        setduedatefrom(event.target.value)
    }
    const handleChangebaselinefrom = (event) => {
        setbaselinedatefrom(event.target.value)
    }
    const handleChangebaselineto = (event) => {
        setbaselinedateto(event.target.value)
    }



    return (
        <Fragment>
            <Fragment>
                <Dialog open={open} maxWidth={"80vw"}>
                    <MuiDialogTitle className={styles.Body} >
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                ANALYTIC VIEW
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sx={{ fontSize: "0.2rem" }}>Clear Date</Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="date"
                                            label="From"
                                            type="date"
                                            onChange={(event) => handleChangeclrfrom(event)}
                                            sx={{ width: 220 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={styles.SearchDate}
                                        /></Grid><Grid item xs={12}>
                                        <TextField
                                            id="date"
                                            label="To"
                                            type="date"
                                            onChange={(event) => handleChangeclrto(event)}
                                            sx={{ width: 220 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={styles.SearchDate}
                                        /></Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={6} >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sx={{ fontSize: "0.2rem" }} >Due Date</Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="date"
                                            label="from"
                                            type="date"
                                            onChange={(event) => handleChangeduefrom(event)}
                                            sx={{ width: 220 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={styles.SearchDate}
                                        /></Grid><Grid item xs={12}>
                                        <TextField
                                            id="date"
                                            label="to"
                                            type="date"
                                            onChange={(event) => handleChangedueto(event)}
                                            sx={{ width: 220 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={styles.SearchDate}
                                        /></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sx={{ fontSize: "0.2rem" }}>BaseLine Create Date</Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="date"
                                            label="from"
                                            type="date"
                                            onChange={(event) => handleChangebaselinefrom(event)}
                                            sx={{ width: 220 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={styles.SearchDate}
                                        /></Grid><Grid item xs={12}>
                                        <TextField
                                            id="date"
                                            label="to"
                                            type="date"
                                            onChange={(event) => handleChangebaselineto(event)}
                                            sx={{ width: 220 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={styles.SearchDate}
                                        /></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} >

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sx={{ fontSize: "0.2rem" }}>Invoice Currency</Grid>
                                    <Grid item xs={12}>
                                        <TextField size="small" id="filled-basic" onChange={(event) => handleChange(event)} className={styles.Search}
                                            label="USD, CAD OR BOTH" variant="filled" /></Grid>
                                </Grid>


                            </Grid>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={6}>
                                <Button className={styles.Button} onClick={graphpop}>Show Chart</Button>

                            </Grid>
                            <Grid item xs={6}>
                                <Button className={styles.Button} onClick={cancel}>Close</Button>

                            </Grid>
                        </Grid>
                    </MuiDialogTitle>
                </Dialog>
            </Fragment>
            <Fragment>
                <Dialog open={graph} maxWidth={"60vw"}>
                    <MuiDialogTitle className={styles.Body2} >
                        <Grid container space={2}>
                            <Grid item xs={6}>
                                Analytics View
                            </Grid>
                            <Grid item xs={6}><Typography align="right" onClick={closegraph}><HighlightOffIcon /></Typography></Grid>
                            <Grid item xs={12}>
                                &nbsp;
                            </Grid>
                            <Grid item xs={12}>
                                &nbsp;
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{ position: "relative" }}>
                                    {isPie ? (<PieChart width={400} height={400}>
                                        <Pie
                                            dataKey="count"
                                            isAnimationActive={true}
                                            data={pieData}
                                            animationDuration={2000}

                                            outerRadius={150}
                                        >{pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}</Pie>

                                        <Tooltip />
                                        <Legend
                                            layout="horizontal"
                                            verticalAlign="top"

                                        />
                                    </PieChart>) : <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><Typography align="center">Pie Chart will shown when Both Currency is choosen</Typography></div>}</div>
                            </Grid>
                            <Grid item xs={1}>&nbsp;</Grid>
                            <Grid item xs={7}>
                                <BarChart
                                    width={600}
                                    height={400}
                                    data={barData}
                                    fill="white"
                                >
                                    <XAxis dataKey="name" stroke="white" />
                                    <YAxis stroke="white" />
                                    <Tooltip />
                                    <Legend
                                        layout="horizontal"
                                        verticalAlign="top" />
                                    <Bar dataKey="total_open_amt" fill="#8884d8" />
                                    <Bar dataKey="no_customer" fill="#82ca9d" />
                                </BarChart>
                            </Grid>
                        </Grid>
                    </MuiDialogTitle>
                </Dialog>
            </Fragment >

        </Fragment>
    );
};

export default ViewAnalytics;
