import { Typography, Avatar, Grid, Button } from "@mui/material";

export default function NotFoundPage() {
    return (
        <>
        <Grid fullwidth style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems:"center", height: "60%", marginBottom: 20, flexWrap:"wrap" }}>
            <Grid fullwidth style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", height: "60%", marginBottom: 20 }}>
            {/* <Avatar
                  variant="rounded"
                  alt="Remy Sharp"
                  src={process.env.PUBLIC_URL + "/images/error404.jpg"}
                  sx={{ width: 360, height: 150, marginTop: 14, justifySelf: "center" }}
                /> */}
            </Grid>
            <Grid style={{alignItems:"flex-start"}}>
            <Typography style={{color:"#ffffff", fontWeight:"bold", fontSize:60, justifySelf:"flex-start", alignSelf:"flex-start"}}>Ooops...</Typography>
            <Typography style={{color:"#ffffff", fontWeight:"bold", fontSize:25}}>Stranica nije pronadjena!</Typography>
            <Button variant="contained" href="http://localhost:3000/" style={{marginTop:30, backgroundColor:"#f50057"}}>GO BACK TO HOME PAGE</Button>
            </Grid>
            
        </Grid>
        </>

    )
}