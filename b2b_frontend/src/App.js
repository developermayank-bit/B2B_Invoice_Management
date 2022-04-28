import React from "react";
import { makeStyles } from "@material-ui/core";
import Datatable from "./view/DataTable";
import Footer from "./view/Footer";
import Header from "./view/Header";
import Navbar from "./view/Navbar";

const styles = makeStyles(() => ({
  Body:{
    height:"100vh",
    backgroundColor:"#2d4250",
    // #2d4250 #253843;
  },
}))

function App() {
  const style = styles()
  const [wsort, setwsort] = React.useState('ASC')
    const [sort, setsort] = React.useState('sl_no')
  const [isadv,setisadv] = React.useState(false)
  const [data,setdata] = React.useState([]);  
  const [selected,setSelected] = React.useState([]);
  const [ searchKeyword, setSearchKeyword] = React.useState('');
  const [ searchResults, setSearchResults ] = React.useState([]);
  const [page, setPage] = React.useState(0)
  const [length, setLength] = React.useState(data.length)
  return (
    <div className={style.Body}>
       <Header />
       <Navbar          data={data} setData={setdata}
                        selected={selected} setSelected={setSelected}
                        searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} 
                        searchResults={searchResults} setSearchResults={setSearchResults} 
                        page={page} setPage={setPage}
                        length={length} setLength={setLength}
                        isadv={isadv} setisadv={setisadv}
                        setsort={setsort} sort={sort}
                        wsort={wsort} setwsort={setwsort}
                        />
       <Datatable data={data} setData={setdata}
                        selected={selected} setSelected={setSelected}
                        searchKeyword={searchKeyword} searchResults={searchResults}
                        page={page} setPage={setPage}
                        setSearchResults={setSearchResults}
                        length={length} setLength={setLength}
                        isadv={isadv} sort={sort} setsort={setsort}
                        wsort={wsort} setwsort={setwsort}
                        />
       <Footer />
    </div>
  );
}

export default App;
