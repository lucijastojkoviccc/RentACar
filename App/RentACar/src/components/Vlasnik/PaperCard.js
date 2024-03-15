import {
  Button,
  Card,
  Divider,
  Typography,
  Grid,
  Checkbox,
  Link,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EuroSymbol } from "@mui/icons-material";

 
export default function PaperCard({ autoId, index }) {
  const navigate = useNavigate();
  const [infos, setInfos] = useState(null);//([]);
  //const theme = useTheme();
 
  //const { id } = useParams();
 
  const getInformations = async () => {
    //let response;
    try{
    const response = await fetch(
      "http://localhost:5100/api/Auto/GetAuto/" + autoId,
      {
        credentials: "include",
      }
    );
 
    const data = await response.json();
    console.log(data);
    setInfos(data);
    }catch (error) {
      console.error("Error fetching auto data:", error);
    }
  };
 
  useEffect(() => {
    getInformations();
  }, [autoId]);
 
  if (!infos) {
    return null; // Add a check to handle case when infos is null
  }

  return (
    <Card variant="outlined" sx={{ p: 3, width: "100%" }}>
      <Grid container>
        <Grid container item xs={12}>
          <Grid item xs={10} sx={{ display: "flex", flexDirection: "row" }}>
            <Link
              href={"/AutoProfile/" + infos.id}
              variant="h5"
              align="left"
              sx={{ align: "left" }}
            >
              {infos.naziv}
            </Link>
          </Grid>
 
          <Divider sx={{ width: "100%" }} />
          <Typography
            variant="subtitle1"
            align="left"
            sx={{ display: infos.cenaPoDanu == undefined ? "none" : "" }}
          >
            {/* {infos.grad + } " sqm for " + infos.cenaPoDanu + " eur"} */}
            {infos.grad+", "+infos.adresa}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography
            align="left"
            variant="body2"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              mb: 1,
            }}
          >
            {infos.opis}
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            sx={{ alignItems: "baseline" }}
          >
            <EuroSymbol sx={{ color: "pink", fontSize: "1.2rem" }} />{" "}
            {infos.cenaPoDanu}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}