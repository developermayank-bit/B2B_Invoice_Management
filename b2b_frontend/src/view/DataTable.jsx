import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import axios from 'axios';
import { Grid, makeStyles } from '@material-ui/core';
import { TablePagination } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const styles = makeStyles(() => ({
    middle: {
        position: "relative",
        overflow: "auto"
    },
    pagination: {
        color: "#ffffff",
        maxWidth: "100vw",
        backgroundColor: "#283d4a"
    },
    labelbutton: {
        color: "white",
        style: "None"
    },
    checkbox: {
        root: {
            color: '#14AFF1',
            '&$checked': {
                color: '#14AFF1',
            },
        },
    },

}))

const Datatable = ({
    data, setData,
    selected, setSelected,
    searchKeyword, searchResults,
    page, setPage, length, setLength, isadv, wsort, setwsort, sort, setsort
}) => {

    const classes = styles()

    const [rowsperpage, setRowsperpage] = React.useState(scale())




    const changeOrder = (name) => {

        if (name !== sort) {
            setwsort("ASC")
            setsort(name)
        }

        else if (wsort === 'ASC') {
            setwsort("DESC")
            setsort(name)

        } else {
            setwsort("ASC")
            setsort(name)

        }
        setData([])
        setPage(0)
    }

    function scale() {


        if (window.innerHeight < 800 & window.innerHeight > 600) {
            return (Math.floor(window.innerHeight * 0.45 / 44))
        } else if (window.innerHeight > 800 & window.innerHeight < 900) {
            return (Math.floor(window.innerHeight * 0.47 / 44))
        } else if (window.innerHeight < 600 & window.innerHeight > 500) {
            return (Math.floor(window.innerHeight * 0.3 / 44))
        } else if (window.innerHeight > 900 & window.innerHeight < 1050) {
            return (Math.floor(window.innerHeight * 0.52 / 44))
        } else if (window.innerHeight > 1049 & window.innerHeight < 1220) {
            return (Math.floor(window.innerHeight * 0.55 / 44))
        }
        else if (window.innerHeight < 500) {
            return (2)
        } else if (window.innerHeight > 1220 & window.innerHeight < 1410) {
            return (Math.floor(window.innerHeight * 0.6 / 44))
        } else if (window.innerHeight > 1410 & window.innerHeight < 2600) {
            return (Math.floor(window.innerHeight * 0.64 / 44))
        } else if (window.innerHeight > 2600) {
            return (Math.floor(window.innerHeight * 0.7 / 44))
        }

    }


    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = data.map(n => n['doc_id']);
            setSelected(newSelecteds);

        }
        else {
            setSelected([]);
        }
    };


    const handleClick = (event, doc_id) => {
        const selectedIndex = selected.indexOf(doc_id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, doc_id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };



    // Reciving All Raw data from servlet
    React.useEffect(() => {

        async function fetchData() {
            setData([])
            setPage(0)
            await axios.get(`http://localhost:8080/b2b_backend/SendData?sort=${sort}&wsort=${wsort}`)
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })


        }
        fetchData()
    }, [`http://localhost:8080/b2b_backend/SendData?sort=${sort}&wsort=${wsort}`])



    const onChangePage = ((event, nextPage) => {
        setPage(nextPage)
    })

    const handleChangeRowsPerPage = (event) => {

        setRowsperpage(parseInt(event.target.value, 10));

    };

    const isSelected = (doc_id) => selected.indexOf(doc_id) !== -1;
    const dataLength = data === undefined ? 0 : data.length;
    const selectedLength = selected === undefined ? 0 : selected.length;




    return (
        <div className={classes.middle}>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" checkbox>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#283d4a" }}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={selectedLength > 0 && selectedLength < dataLength}
                                    checked={dataLength > 0 && selectedLength === dataLength}
                                    onChange={handleSelectAllClick}
                                    inputProps={{ 'aria-label': 'select all desserts' }}
                                    disableRipple={true}
                                    size='small'
                                />
                            </TableCell>
                            <TableCell align="left" onClick={() => changeOrder('sl_no')} sx={{ color: "white", minWidth: "2.2rem", }}><Grid container ><Grid item xs={10}>ID</Grid><Grid item xs={2}>{sort === 'sl_no' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid> </TableCell>
                            <TableCell align="right" onClick={() => changeOrder('business_code')} sx={{ color: "white", minWidth: "8rem" }}><Grid container ><Grid item xs={10}>Business Code</Grid><Grid item xs={2}>{sort === 'business_code' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('cust_number')} sx={{ color: "white", minWidth: "10rem" }}><Grid container ><Grid item xs={10}>Customer Number</Grid><Grid item xs={2}>{sort === 'cust_number' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('clear_date')} sx={{ color: "white", minWidth: "8rem" }}><Grid container ><Grid item xs={10}>Clear Date</Grid><Grid item xs={2}>{sort === 'clear_date' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('buisness_year')} sx={{ color: "white", minWidth: "8rem" }}><Grid container ><Grid item xs={10}>Business Year</Grid><Grid item xs={2}>{sort === 'buisness_year' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('doc_id')} sx={{ color: "white", minWidth: "8rem" }}><Grid container ><Grid item xs={10}>Document ID</Grid><Grid item xs={2}>{sort === 'doc_id' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('posting_date')} sx={{ color: "white", minWidth: "8rem" }}><Grid container ><Grid item xs={10}>Posting Date</Grid><Grid item xs={2}>{sort === 'posting_date' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('document_create_date')} sx={{ color: "white", minWidth: "12rem" }}><Grid container ><Grid item xs={10}>Document Create Date</Grid><Grid item xs={2}>{sort === 'document_create_date' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('due_in_date')} sx={{ color: "white", minWidth: "8rem" }}><Grid container ><Grid item xs={10}>Due Date</Grid><Grid item xs={2}>{sort === 'due_in_date' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('invoice_currency')} sx={{ color: "white", minWidth: "12rem" }}><Grid container ><Grid item xs={10}>Invoice Currencey</Grid><Grid item xs={2}>{sort === 'invoice_currency' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('document_type')} sx={{ color: "white", minWidth: "8rem" }}><Grid container ><Grid item xs={10}>Document Type</Grid><Grid item xs={2}>{sort === 'document_type' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('posting_id')} sx={{ color: "white", minWidth: "6rem" }}><Grid container ><Grid item xs={10}>Posting ID</Grid><Grid item xs={2}>{sort === 'posting_id' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('total_open_amount')} sx={{ color: "white", minWidth: "12rem" }}><Grid container ><Grid item xs={10}>Total Open Amount</Grid><Grid item xs={2}>{sort === 'total_open_amount' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('baseline_create_date')} sx={{ color: "white", minWidth: "12rem" }}><Grid container ><Grid item xs={10}>Baseline Create Date</Grid><Grid item xs={2}>{sort === 'baseline_create_date' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('cust_payment_terms')} sx={{ color: "white", minWidth: "13rem" }}><Grid container ><Grid item xs={10}>Customer Payment Terms</Grid><Grid item xs={2}>{sort === 'cust_payment_terms' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('invoice_id')} sx={{ color: "white", minWidth: "5rem" }}><Grid container ><Grid item xs={10}>Invoice Id</Grid><Grid item xs={2}>{sort === 'invoice_id' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('aging_bucket')} sx={{ color: "white", minWidth: "8rem" }}><Grid container ><Grid item xs={10}>Aging Bucket</Grid><Grid item xs={2}>{sort === 'aging_bucket' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                            <TableCell align="right" onClick={() => changeOrder('isOpen')} sx={{ color: "white", minWidth: "4rem" }}><Grid container ><Grid item xs={10}>is Open</Grid><Grid item xs={2}>{sort === 'isOpen' ? (wsort === 'ASC' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />) : <div>&nbsp;</div>}</Grid></Grid></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(isadv ? searchResults : (searchKeyword === '' ? data : searchResults)).slice(page * rowsperpage, page * rowsperpage + rowsperpage).map((row) => {
                            if (!isadv) {
                                if (searchKeyword === '') {
                                    setLength(data.length)

                                } else {
                                    setLength(searchResults.length)
                                }
                            } else {
                                setLength(searchResults.length)
                            }



                            const isItemSelected = isSelected(row['doc_id']);
                            return (
                                <TableRow
                                    // key={row.doc_id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 }
                                        , backgroundColor: "#283d4a"
                                    }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}
                                            onClick={(event) => handleClick(event, row['doc_id'])}
                                            disableRipple={true}
                                            size='small'
                                            className={classes.checkbox}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row" sx={{ color: "white" }}>
                                        {row.sl_no}
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.business_code}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.cust_number}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.clear_date}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.business_year.slice(0, 4)}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.doc_id}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.posting_date}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.document_create_date}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.due_in_date}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.invoice_currency}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.document_type}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.posting_id}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.total_open_amount}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.baseline_create_date}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.cust_payment_terms}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.invoice_id}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.aging_bucket === null ? "NA" : row.aging_bucket}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.isOpen}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[rowsperpage, 5, 10, 15]}
                size="small"
                sx={{ color: "white", width: "100vw", borderBottom: "0", backgroundColor: "#283d4a" }}
                count={length}
                rowsPerPage={rowsperpage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />



        </div>
    )
}

export default Datatable