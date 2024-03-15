import { Button, Card, Divider, Typography, Grid, Checkbox, CardMedia, Box } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AttachMoneyIcon from '@mui/icons-material/EuroSymbol';
 
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import getIcon from "./Icons";
 
export default function AutoCard({
    id, naziv, opis, adresa, cenaPoDanu, grad, slika
}) {
 
    const navigate = useNavigate();
    //{/* backgroundColor: "#FEBB0277", border: "none" }}>*/}
    return (
        <Card variant="outlined" sx={{ display: "flex" }}>
            <CardMedia
                component="img"
                sx={{ maxWidth: "35%" }}
                image={slika}
                alt=""
                onClick={()=>{navigate("/AutoProfile/"+id)}}
            />
 
            <Grid container spacing={3} sx={{ p: 2 }} >
 
                <Grid item xs={12} md={9} >
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
                        variant="body1"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
 
                    >
                        <LocationOnIcon sx={{ color: "#FEB7CE" }} />
                        {adresa}
                    </Typography>
                    <Typography
                        align="left"
                        variant="body2"
                        sx={{ p: 1 }}
                    >
                        {opis}
                    </Typography>
                    {/* <Box sx={{ display: "flex", gap: 2,mt:2 }}>
                        {
                            amenities != undefined ?
                                amenities.map((a, i) => (
                                    <Typography key={i} sx={{ display: "flex", alignItems: "center" }}>{getIcon(a)}{a}</Typography>
                                )) : <></>
                        }
                    </Box> */}
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box sx={{ display: "flex", gap: 0, flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                        { <Typography
                            align="left"
                            variant="h5"
                            sx={{ display: "flex", alignItems: "center" }}
 
 
                        >
                             <LocationOnIcon sx={{ color: "#FEB7CE" }} fontSize="large" />
                            {grad}
                        </Typography> }
                        <Typography
                            align="left"
                            variant="h4"
                            sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
                            color="error"
                        >
                            <AttachMoneyIcon color="error" fontSize="large" />
                            {cenaPoDanu}
                        </Typography>
 
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}