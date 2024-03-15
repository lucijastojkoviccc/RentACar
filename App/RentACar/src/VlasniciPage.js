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
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import VlasnikCard from "./components/Vlasnik/VlasnikCard";

export default function Vlasnici(props) {

    const [data, setData] = useState([]);

    const getData = async () => {
        const response = await fetch("http://localhost:5100/api/Vlasnik/GetAllVlasnici");
        if (response.ok) {
            const d = await response.json();
            setData(d);
        }
    }

    const calculateAvgRating = (info) => {
        if (!info.reviews || !Array.isArray(info.reviews) || info.reviews.length === 0) {
            return 0; // Default to 0 if there are no reviews or reviews is not an array
        }
        let initSum = 0;
        let averageRating;
        info.komentari.forEach((review) => {
          initSum = initSum + review.ocena;
        });
        averageRating = Math.round(initSum*100 / parseFloat(info.reviews.length))/100;
        return averageRating
      };


    useEffect(() => {
        getData();
    }, []);

    const navigate = useNavigate();

    return (
        
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <React.Fragment>
                {/* <Grid container xs={12} spacing={3} sx={{ pt: 3 }}> */}
                <Grid container spacing={3} sx={{ pt: 3 }}>
               

                    {
                        data.map(l => (
                            <Grid item xs={12} key={l.id}>

                                <VlasnikCard
                                    id={l.id}
                                   ime={l.ime}
                                   kompanija={l.kompanija}
                                    kontakt={l.kontakt}
                                    ocena={calculateAvgRating(l)}
                                    numOfAutomobili={l.autoIds ? l.autoIds.length : 0}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </React.Fragment>
        </Container>
    );
}
