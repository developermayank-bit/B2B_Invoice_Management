import { Button, ButtonGroup, TextField, Box } from "@material-ui/core";

import axios from "axios";
import React from "react";
import './Component.css'
import AddInvoice from "../component/AddInvoice";
import EditInvoice from "../component/EditInvoice";
import ViewAnalytics from "../component/ViewAnalytics";
import DeleteInvoice from "../component/Deleteinvoice";
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import Predict from "../component/Predict";
import AdvanceSearch from "../component/AdvanceSearch";

const Navbar = ({
    data, setData,
    selected, setSelected, setSearchKeyword, setSearchResults,
    searchKeyword, setPage, setisadv,
    wsort, setwsort, sort, setsort
}) => {

    const Edipopup = () => {
        setEditOpen(true)
    }


    const [adddisable, setAdddisable] = React.useState(false)
    const [editdisable, setEditdisable] = React.useState(true)
    const [deldisable, setdeldisable] = React.useState(true)
    const [predisable, setpredisable] = React.useState(true)

    React.useEffect(() => {
        if (selected.length === 1) {
            setEditdisable(false)
        } else {
            setEditdisable(true)
        }
        if (selected.length === 0) {
            setpredisable(true)
            setAdddisable(false)
            setdeldisable(true)
        } else {
            setpredisable(false)
            setdeldisable(false)
            setAdddisable(true)
        }
    })

    const [addopen, setaddopen] = React.useState(false);
    const [editopen, setEditOpen] = React.useState(false)
    const [deleteopen, setDelOpen] = React.useState(false)
    const [showgraph, setshowgraph] = React.useState(false)

    const DelPopup = () => {
        setDelOpen(true)
    }

    const graphpopup = () => {
        setshowgraph(true)
    }
    const handleSearch = (event) => {
        setSearchKeyword(event.target.value)
        setSearchResults([])
    }

    const addpopup = () => {
        setaddopen(true)
    }

    React.useEffect(() => {
        async function fetchData() {

            axios.get(`http://localhost:8080/b2b_backend/SearchData?searchKeyword=${searchKeyword}&sort=${sort}&wsort=${wsort}`)
                .then((response) => {

                    setPage(0)
                    setSearchResults(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        fetchData()
    }, [`http://localhost:8080/b2b_backend/SearchData?searchKeyword=${searchKeyword}&sort=${sort}&wsort=${wsort}`])

    const reload = () => {
        setsort('sl_no')
        setwsort('ASC')
        setisadv(false)
        setSearchKeyword('')
        setSearchResults([])
        setSelected([])
        setData([])
        setPage(0)
        axios.get(`http://localhost:8080/b2b_backend/SendData?sort=sl_no&wsort=ASC`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const [Openpredict, SetOpenpredict] = React.useState(false)

    const prePopup = () => {
        SetOpenpredict(true)
    }

    const [openAdvSearch, setopenadv] = React.useState(false)

    const handleadvSearch = () => {
        setopenadv(true)
    }

    return (

        <div className="Navbar">
            <ButtonGroup className="ButtonGroup1">
                <Button className="Button" disabled={predisable} onClick={prePopup}>Predict</Button>
                <Predict open={Openpredict} setOpen={SetOpenpredict} selected={selected} reload={reload} />
                <Button className="Button" onClick={graphpopup}>Analytics View</Button>
                <ViewAnalytics open={showgraph} setOpen={setshowgraph} />
                <Button className="Button" onClick={handleadvSearch}>Advance Search</Button>
                <AdvanceSearch open={openAdvSearch} setOpen={setopenadv} setisAdvance={setisadv} setadvanceresult={setSearchResults} setPage={setPage} reload={reload} />
                <IconButton color="primary" onClick={reload} aria-label="add to shopping cart" sx={{ borderLeft: "0.15rem solid lightskyblue" }}>
                    <RefreshIcon />
                </IconButton>
            </ButtonGroup>
            <Box className="search-box">
                <TextField size="small" id="filled-basic" className="Search" onChange={(event) => handleSearch(event)}

                    label="Search Customer ID" variant="filled" />

            </Box>
            <ButtonGroup className="ButtonGroup2">
                <Button className="Button " disabled={adddisable} onClick={addpopup}>Add</Button>
                < AddInvoice open={addopen} setOpen={setaddopen} data={data} reload={reload} />
                <Button className="Button Button-mid" onClick={Edipopup} disabled={editdisable}>Edit</Button>
                <EditInvoice open={editopen} setOpen={setEditOpen} selected={selected} reload={reload} />
                <Button className="Button Button-del" disabled={deldisable} onClick={DelPopup}>Delete</Button>
                <DeleteInvoice open={deleteopen} setOpen={setDelOpen} selected={selected} reload={reload} />


            </ButtonGroup>
        </div>

    );
};

export default Navbar;