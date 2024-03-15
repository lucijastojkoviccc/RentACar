// // import React, { useState, useEffect } from "react";
// // import {
// //     Paper,
// //     CssBaseline,
// //     Box,
// //     Divider,
// //     Grid,
// //     Container,
// //     Button,
// //     Typography,
// //     Slider,
// // } from "@mui/material";
// // import Card from "@mui/material/Card";
// // import CardMedia from "@mui/material/CardMedia";
// // import CardActions from "@mui/material/CardActions";
// // import TextField from "@mui/material/TextField";
// // import { useNavigate } from "react-router-dom";
// // import { useParams } from "react-router-dom";
// // import SearchIcon from "@mui/icons-material/Search";
// // import AutoCard from "./components/Filter/AutoCard";
// // import FormGroup from '@mui/material/FormGroup';
// // import FormControlLabel from '@mui/material/FormControlLabel';
// // import Checkbox from '@mui/material/Checkbox';
// // import HomeIcon from '@mui/icons-material/Home';
// // import CarIcon from '@mui/icons-material/DirectionsCar';
// // import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// // import ApartmentIcon from '@mui/icons-material/Apartment';
// // import DisabledIcon from '@mui/icons-material/AccessibleForward';
 
// // export default function FilterAutomobili(props) {
 
// //     const [data, setData] = useState([]);
 
// //     const getData = async () => {
// //         let req = `http://localhost:5100/api/Auto/FilterAutomobili?grad=${encodeURIComponent(document.getElementById("city_name").value)}&maxPrice=${cena[1]}`;
// //         if (document.getElementById("pogodanZaInvalide").checked) {
// //             req += "&pogodanZaInvalide=true";
// //         }
// //         if (document.getElementById("automatic").checked) {
// //             req += "&automatic=true";
// //         }
// //         // if (document.getElementById("house").checked && !document.getElementById("apartment").checked) {
// //         //     req += "&autoType=0";
// //         // }
// //         // if (document.getElementById("apartment").checked && !document.getElementById("house").checked) {
// //         //     req += "&autoType=1";
// //         // }
// //         const resp = await fetch(req);
// //         if (resp.ok) {
// //             const estates = await resp.json();
// //             setData(estates);
// //             console.log(req, estates);
// //         }
// //     }
 
// //     const [cena, setPrice] = React.useState([0, 999999]);
 
// //    // const [area, setArea] = React.useState([0, 500]);
// //     const handleChange = (event, newValue) => {
// //         setPrice(newValue);
// //     };
 
 
// //     useEffect(() => {
// //         getData();
// //     }, []);
 
// //     const navigate = useNavigate();
 
// //     return (
// //         <Container component="main" maxWidth="xl">
// //             <CssBaseline />
// //             <React.Fragment>
// //                 <Grid container xs={12} spacing={3} sx={{ pt: 3 }}>
// //                     <Grid item xs={3} spacing={3} >
// //                         <Paper variant="outlined" sx={{ position: "sticky", top: 90, p: 3, backgroundColor: "#FEB7CE", border: "none" }}>
// //                             Grad:
// //                             <TextField fullWidth variant="filled" sx={{ backgroundColor: "white", mb: 3 }} id="city_name" />
// //                             Kompanija:
// //                             <TextField fullWidth variant="filled" sx={{ backgroundColor: "white", mb: 3 }} id="kompanija" />
 
// //                             Cena:
// //                             <Slider
// //                                 value={cena}
// //                                 onChange={handleChange}
// //                                 valueLabelDisplay="on"
// //                                 valueLabelFormat={(value) => "€ " + value}
// //                                 max={1000}
// //                                 min={0}
// //                                 sx={{ mt: 5 }}
// //                             />
             
// //                             <FormGroup sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "center" }}>
// //                                 <FormControlLabel control={<Checkbox defaultChecked id="automatic" icon={<CarIcon color="disabled" />} checkedIcon={<CarIcon />} />} label="Automatic" />
// //                                 <FormControlLabel control={<Checkbox id="pogodanZaInvalide" defaultChecked icon={<DisabledIcon color="disabled" />} checkedIcon={<DisabledIcon />} />} label="Pogodan za invalide" />
// //                             </FormGroup>
// //                             {/* <FormGroup sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "center" }}>
// //                                 <FormControlLabel control={<Checkbox id="pet_friendly" defaultChecked icon={<PetsIcon color="disabled" />} checkedIcon={<PetsIcon />} />} label="Pet Friendly" />
 
// //                             </FormGroup> */}
 
// //                             <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={() => { getData() }}>Filter</Button>
// //                         </Paper>
// //                     </Grid>
// //                     <Grid container item xs={9} spacing={3} sx={{ pt: 3 }}>
 
 
// //                         {
// //                             data.map(auto => (
// //                                 <Grid item xs={12} key={auto.id}>
 
// //                                     <AutoCard
// //                                         id={auto.id}
// //                                         opis={auto.opis}
// //                                         //slika={auto.slike[0]}
// //                                         naziv={auto.naziv}
// //                                         adresa={auto.adresa}
// //                                         cena={auto.cena}
// //                                         grad={auto.grad}
                                   
// //                                     />
// //                                 </Grid>
// //                             ))
// //                         }
// //                     </Grid>
// //                 </Grid>
// //             </React.Fragment>
// //         </Container>
// //     );
// // }
// import React, { useState, useEffect } from "react";
// import {
//     Paper,
//     CssBaseline,
//     Box,
//     Divider,
//     Grid,
//     Container,
//     Button,
//     Typography,
//     Slider,
// } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import CardActions from "@mui/material/CardActions";
// import TextField from "@mui/material/TextField";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";
// import AutoCard from "./components/Filter/AutoCard";
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import HomeIcon from '@mui/icons-material/Home';
// import CarIcon from '@mui/icons-material/DirectionsCar';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import ApartmentIcon from '@mui/icons-material/Apartment';
// import DisabledIcon from '@mui/icons-material/AccessibleForward';
 
// export default function FilterAutomobili(props) {
 
//     const [data, setData] = useState([]);
//     const [cena, setCena] = useState([0, 1000]); // Definišemo početnu vrednost cene
 
//     const getData = async () => {
//         const cityNameInput = document.getElementById("city_name");
//         const grad = cityNameInput ? encodeURIComponent(cityNameInput.value) : "";
//         const maxPrice = cena[1];
//         let req = `http://localhost:5100/api/Auto/FilterAutomobili?grad=${grad}&maxPrice=${maxPrice}`;
 
//         if (document.getElementById("pogodanZaInvalide")?.checked) {
//             req += "&pogodanZaInvalide=true";
//         }
//         if (document.getElementById("automatic")?.checked) {
//             req += "&automatic=true";
//         }
 
//         const resp = await fetch(req);
//         if (resp.ok) {
//             const estates = await resp.json();
//             setData(estates);
//             console.log(req, estates);
//         }
//     }
 
//     const handleChange = (event, newValue) => {
//         setCena([0, newValue]); // Postavljamo samo desnu vrednost cene
//     };
 
//     useEffect(() => {
//         getData();
//     }, []);
 
//     const navigate = useNavigate();
 
//     return (
//         <Container component="main" maxWidth="xl">
//             <CssBaseline />
//             <React.Fragment>
//                 <Grid container xs={12} spacing={3} sx={{ pt: 3 }}>
//                     <Grid item xs={3} spacing={3} >
//                         <Paper variant="outlined" sx={{ position: "sticky", top: 90, p: 3, backgroundColor: "#FEB7CE", border: "none" }}>
//                             Grad:
//                             <TextField fullWidth variant="filled" sx={{ backgroundColor: "white", mb: 3 }} id="city_name" />
//                             Kompanija:
//                             <TextField fullWidth variant="filled" sx={{ backgroundColor: "white", mb: 3 }} id="kompanija" />
 
//                             Cena:
//                             <Slider
//                                 value={cena[1]}
//                                 onChange={handleChange}
//                                 valueLabelDisplay="on"
//                                 valueLabelFormat={(value) => "€ " + value}
//                                 max={1000}
//                                 min={0}
//                                 sx={{ mt: 5 }}
//                             />
             
//                             <FormGroup sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "center" }}>
//                                 <FormControlLabel control={<Checkbox defaultChecked id="automatic" icon={<CarIcon color="disabled" />} checkedIcon={<CarIcon />} />} label="Automatic" />
//                                 <FormControlLabel control={<Checkbox id="pogodanZaInvalide" defaultChecked icon={<DisabledIcon color="disabled" />} checkedIcon={<DisabledIcon />} />} label="Pogodan za invalide" />
//                             </FormGroup>
//                             <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={() => { getData() }}>Filter</Button>
//                         </Paper>
//                     </Grid>
//                     <Grid container item xs={9} spacing={3} sx={{ pt: 3 }}>
 
 
//                         {
//                             data.map(auto => (
//                                 <Grid item xs={12} key={auto.id}>
 
//                                     <AutoCard
//                                         id={auto.id}
//                                         opis={auto.opis}
//                                         naziv={auto.naziv}
//                                         adresa={auto.adresa}
//                                         cena={auto.cena}
//                                         grad={auto.grad}
//                                         //treba i photo
//                                     />
//                                 </Grid>
//                             ))
//                         }
//                     </Grid>
//                 </Grid>
//             </React.Fragment>
//         </Container>
//     );
// }
import React, { useState, useEffect } from "react";
import {
    Paper,
    CssBaseline,
    Box,
    Divider,
    Grid,
    Container,
    Button,
    Typography,
    Slider,
    autocompleteClasses,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AutoCard from "./components/Filter/AutoCard";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import HomeIcon from '@mui/icons-material/Home';
import CarIcon from '@mui/icons-material/DirectionsCar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DisabledIcon from '@mui/icons-material/AccessibleForward';
 
export default function FilterAutomobili(props) {
 
    const [data, setData] = useState([]);
    const [cena, setCena] = useState([0, 1000]); // Definišemo početnu vrednost cene
 
    const getData = async () => {
        const cityNameInput = document.getElementById("city_name");
        const grad = cityNameInput ? encodeURIComponent(cityNameInput.value) : "";
        const companyNameInput = document.getElementById("kompanija");
        const kompanija = companyNameInput ? encodeURIComponent(companyNameInput.value) : "";
        const maxPrice = cena[1];
        //let req = `http://localhost:5100/api/Auto/FilterAutomobili?grad=${grad}&kompanija=${kompanija}&maxPrice=${maxPrice}`;
        let req = `http://localhost:5100/api/Auto/FilterAutomobili?grad=${grad}&kompanija=${kompanija}&maxCena=${maxPrice}`
        if (document.getElementById("pogodanZaInvalide")?.checked) {
            req += "&invalidi=true";
        }
        if (document.getElementById("automatic")?.checked) {
            req += "&automatic=true";
        }
 
        const resp = await fetch(req);
        if (resp.ok) {
            const estates = await resp.json();
            setData(estates);
            console.log(req, estates);
        }
    }
 
    const handleChange = (event, newValue) => {
        setCena([0, newValue]); // Postavljamo samo desnu vrednost cene
    };
 
    useEffect(() => {
        getData();
    }, []);
 
    const navigate = useNavigate();
 
    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <React.Fragment>
                <Grid container xs={12} spacing={3} sx={{ pt: 3 }}>
                    <Grid item xs={3} spacing={3} >
                        <Paper variant="outlined" sx={{ position: "sticky", top: 90, p: 3, backgroundColor: "#FEB7CE", border: "none" }}>
                            Grad:
                            <TextField fullWidth variant="filled" sx={{ backgroundColor: "white", mb: 3 }} id="city_name" />
                            Kompanija:
                            <TextField fullWidth variant="filled" sx={{ backgroundColor: "white", mb: 3 }} id="kompanija" />
 
                            Cena:
                            <Slider
                                value={cena[1]}
                                onChange={handleChange}
                                valueLabelDisplay="on"
                                valueLabelFormat={(value) => "€ " + value}
                                max={1000}
                                min={0}
                                sx={{ mt: 5 }}
                            />
             
                            <FormGroup sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "center" }}>
                                <FormControlLabel control={<Checkbox  id="automatic" icon={<CarIcon color="disabled" />} checkedIcon={<CarIcon />} />} label="Automatic" />
                                <FormControlLabel control={<Checkbox id="pogodanZaInvalide"  icon={<DisabledIcon color="disabled" />} checkedIcon={<DisabledIcon />} />} label="Pogodan za invalide" />
                            </FormGroup>
                            <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={() => { getData() }}>Filter</Button>
                        </Paper>
                    </Grid>
                    <Grid container item xs={9} spacing={3} sx={{ pt: 3 }}>
 
 
                        {
                            data.map(auto => (
                                <Grid item xs={12} key={auto.id}>
 
                                    <AutoCard
                                        id={auto.id}
                                        opis={auto.opis}
                                        naziv={auto.naziv}           
                                        slika={`data:image/jpg;base64,${auto.slike[0]}`}                                              
                                        adresa={auto.adresa}
                                        cenaPoDanu={auto.cenaPoDanu}
                                        grad={auto.grad}
                                        //treba i photo
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </React.Fragment>
        </Container>
    );
}
 