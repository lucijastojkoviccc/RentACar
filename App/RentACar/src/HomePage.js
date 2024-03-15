//to be implemented
import { useState, useEffect } from "react";
import React from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {
  Paper,
  CssBaseline,
  Box,
  Divider,
  Grid,
  Container,
  Button,
  Typography,
  Chip
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Search from "@mui/icons-material/Search";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import AutoCard from "./components/HomeAutoCard";

// home page - samo pretraga ( za ostalo videti kasnije)

export default function HomePage(props) {

  // const theme = useTheme();
  // console.log(theme);

  const navigate = useNavigate();

  // const [searchData, setSearchData] = useState(null);

  const [search, setSearch] = useState("");

  // const getSearchData = async () => {
  //   const response = await fetch("http://localhost:5211/api/Home/Search/" + search);

  //   console.log(search);
  //   if (response.ok) {
  //       const fetchData = await response.json();
  //       console.log(fetchData);
  //       setSearchData(fetchData);
  //   }
  // };

  const getData = async () => {
    const resp = await fetch("http://localhost:5100/api/Auto/Top");
    if (resp.ok) {
      const d = await (await resp).json();
      setData(d);
    }
  }

  const update = () => {
    //getSearchData();
    props.reloadHeader();
  }

  const [data, setData] = useState([
    { id: "1", naziv: "Property Name", opis: "This is some example description...", slike: ["https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"], amenities: ["Pool", "Laundry room", "Sauna", "AC"] },
    { id: "2", naziv: "Property Name", opis: "This is some example description...", slike: ["https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"] },
    { id: "3", naziv: "Property Name", opis: "This is some example description...", slike: ["https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"] },
    { id: "4", naziv: "Property Name", opis: "This is some example description...", slike: ["https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"] },
    { id: "5", naziv: "Property Name", opis: "This is some example description...", slike: ["https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"] },
    { id: "6", naziv: "Property Name", opis: "This is some example description...", slike: ["https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"] }

  ]);

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box sx={{ backgroundImage: "https://i.pinimg.com/564x/4c/77/53/4c7753d77b7ad6a9061d19faee5a3c13.jpg"/*"url('" + process.env.PUBLIC_URL + "/images/back.svg')"*/, backgroundSize: "100%" }}>
      <CssBaseline />
      <React.Fragment>


        {/* //   opacity:"80%",
        //   backgroundImage: theme.palette.mode === 'dark' ?
        //     "url(" + process.env.PUBLIC_URL + "/images/im.jpg" + ")"
        //     : "url(" + process.env.PUBLIC_URL + "/images/im.jpg" + ")" */}
        <Grid fullwidth style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>

          <Typography variant="h1" style={{ alignSelf: "center", fontWeight: 800, marginTop: 200, color: "white", fontSize: 150 }}> RENT A CAR</Typography>
          <Button variant="contained" sx={{ backgroundColor: "#FEB7CE", fontSize: 42 }} onClick={()=>{navigate("/FilterAutomobili")}}>Explore</Button>
        </Grid>

        <Grid fullwidth style={{ marginTop: 10, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "10%" }}>
        </Grid>
        {/* <Divider style={{ marginTop: 10, marginBottom: 20 }}></Divider> */}
        {/* <Grid container xs={12} spacing={4} sx={{ p: 10 }}>
          {
            data.map(d => (
              <Grid item xs={12} md={4}>
                <AutoCard
                  id={d.id}
                  //photo={d.photos[0]}
                  address={d.address}
                  area={d.area}
                  price={d.price}
                  name={d.name}
                />
              </Grid>
            ))

          }
        </Grid> */}
        <Grid container xs={12} spacing={4} sx={{ p: 10 }}>
        {data.map((d) => (
            <Grid item xs={12} md={4} key={d.id} onClick={()=>{navigate("/AutoProfile/"+d.id)}}> {/* Add key prop */}
              <AutoCard
                id={d.id}
                //slika={d.slike[0]}
                slika={`data:image/jpg;base64,${d.slike[0]}`}
                adresa={d.adresa}
                grad={d.grad}
                cenaPoDanu={d.cenaPoDanu}
                naziv={d.naziv}
              />  
            </Grid>
  ))}
</Grid>


      </React.Fragment>

    </Box>
  );

}