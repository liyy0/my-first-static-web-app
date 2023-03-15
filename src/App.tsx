import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { BASE_URL,GET_DEFAULT_HEADERS } from "./globals";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


// let api_key = "jWEgIXzfodOaGQKxty7JR3hxGooA1HhT1f3Py7KeMAClAzFuUx63tA==";
// let api_key = process.env.REACT_APP_api_key as string;
function App() {
  // // You will need to use more of these!
  const [curShipperId, setcurShipperId] = useState<string>("");
  const [curShipment, setcurShipment] = useState([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [apiKey,setapiKey] = useState<string>("default_none");

  const getApiKey = async () => {
    const res = await fetch("../../api/getkey", {
      method: "GET"//
    })
  
    const json = await res.text();
    setapiKey(json);
  };

  
  getApiKey();

  const fetchSomeData = async () => {

    // console.log(apiKey);
    const res = await fetch(`${BASE_URL}ShipperId=${curShipperId}`, {
          method: 'get',
          headers:GET_DEFAULT_HEADERS(apiKey),
          credentials: "include"
        });
    const json = await res.json();
    console.log(json)
    return json
    
  };


  
  const submitHandler = (event:any) => {
    event.preventDefault();
    console.log(curShipperId);
    // debugger;

    fetchSomeData()
    .then(
      res =>{
        if(res.length===0){
          setcurShipment([]);
          setErrorMsg("Invalid Shipper Id. Please check");
        }else{
          setcurShipment(res);
          setErrorMsg("");
        }
      }
    )
  }

  const columns: GridColDef[] = [
    { field: 'Date', headerName: 'Date', width: 130 },
    { field: 'WarehouseID', headerName: 'Warehouse ID', width: 300 },
    { field: 'ShippingPO', headerName: 'CShipping PO', width: 300 },
    { field: 'ShipmentID', headerName: 'Shipment ID', width: 100 },
    { field: 'BoxesRcvd', headerName: 'Boxes Received', width: 100 },
  ];
  
  // const rows = [
  //   { id: 1, StudentName: 'abc', ClassId: 'C123', ClassName: 'ABCD', Semester: '123'},

  // ];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Report
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Shipper ID
          </Typography>
          <div style={{ width: "100%" }}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
          >
            <TextField id="inputId" label="Shipper Id" placeholder="between 1 to 3" variant="standard"
            onChange={e => setcurShipperId(e.target.value)} />
            <Button variant="contained" type="submit">Check</Button>
          </Box>
          <Typography variant="h6" color="error.main">
            {errorMsg}
          </Typography>
          </div>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom align="center">
            Shipment Table
          </Typography>
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid rows={curShipment} columns={columns} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
