import { Typography, Avatar, Grid, Button } from "@mui/material";

export default function AddedAutoPage() {
    return (
        <>
        <Grid fullwidth style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems:"center", height: "60%", marginBottom: 20, flexWrap:"wrap" }}>
            <Grid fullwidth style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", height: "60%", marginBottom: 20 }}>
            <Avatar
                  variant="rounded"
                  alt="Remy Sharp"
                  src={process.env.PUBLIC_URL + "/images/deletepaper.jpg"}
                  sx={{ width: 360, height: 350, marginTop: 14, justifySelf: "center" }}
                />
            </Grid>
            <Grid style={{alignItems:"flex-start"}}>
            <Typography style={{color:"#8298cb", fontWeight:"bold", fontSize:50, justifySelf:"flex-start", alignSelf:"flex-start"}}>Bravo!</Typography>
            <Typography style={{color:"#8298cb", fontWeight:"bold", fontSize:25}}>Auto dodat u bazu!</Typography>
            <Button variant="contained" href="/vlasnici" style={{marginTop:30, backgroundColor:"#f50057"}}>VRATI SE NAZAD</Button>
            </Grid>
            
        </Grid>
        </>

    )
}