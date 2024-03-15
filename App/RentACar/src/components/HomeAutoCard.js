import { Button, Card, Divider, Typography, Grid, Checkbox, CardMedia, Box } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapsHomeWorkIcon from '@mui/icons-material/EuroSymbol';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AutoCard({
    id, naziv, slika, opis, adresa, grad, cenaPoDanu, amenities
}) {

    const navigate = useNavigate();
    //{/* backgroundColor: "#FEBB0277", border: "none" }}>*/}
    return (
        <Card  >
            <CardMedia
                component="img"
                onClick={()=>{navigate("/AutoProfile/"+id,{/*ovde bi trebale da prenesete naziv i sta jos, ali vam treba axios, pitajte gpt*/ })}}
                image={slika}
                style={{ height: 300, objectFit: "cover" }} // Set a fixed height and use objectFit to control the image size
      
                //alt="EstatesCopyright"
            />

            <Grid container spacing={0} sx={{ p: 2 }} >

                <Grid item xs={12} md={8} >
                    <Typography
                        align="left"
                        variant="h5"
                        sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            color: "#0071C2",
                            fontWeight: "bold"
                        }}
                    >
                        {naziv}
                    </Typography>
                    <Typography
                        align="left"
                        variant="h6"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}

                    >
                    
                        
                    </Typography>
                    <Typography
                        align="left"
                        variant="body2"
                        sx={{ p: 1 }}
                    >
                        {opis}
                    </Typography>

                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ display: "flex", gap: 0, flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                        <Typography
                            align="left"
                            variant="h6"
                            sx={{ display: "flex", alignItems: "center" }}


                        >
                            <MapsHomeWorkIcon sx={{ fontSize: "30px", color: "#FEB7CE" }} /> { cenaPoDanu}
            
                            
                        </Typography>
                        <Typography
                            align="left"
                            variant="h6"
                            sx={{ display: "flex", alignItems: "center"}}
                            
                        >
                            <LocationOnIcon sx={{ fontSize: "30px", color: "#FEB7CE" }} /> {grad}
                           
                            
                        </Typography>

                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}