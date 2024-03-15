import { Paper, CssBaseline, Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  CircularProgress,
  Avatar,
  Grid,
  useTheme,
} from "@mui/material";
import AutoList from "./components/Vlasnik/AutoList";
import EditVlasnik from "./components/Vlasnik/EditVlasnik";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import ReviewCard from "./components/Vlasnik/ReviewCard";

export default function Vlasnik({ type, reloadHeader }) {
  const theme = useTheme();

  const navigate = useNavigate();

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        sx={{ width: 1 }}
      >
        {value === index && <Box sx={{ p: 3, width: 1 }}>{children}</Box>}
      </Box>
    );
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [info, setInfo] = useState({
    ime: "",
    kompanija:"",
    kontakt: "",
    autoIds: [],
    komentari: [],
    id: "",
  });


  const { id } = useParams();

  const getInfo = async () => {
    const response = await fetch(
      "http://localhost:5100/api/Vlasnik/GetVlasnik/" + id,
      {
        credentials: "include",
      }
    );
    const fetchData = await response.json();
    console.log(fetchData);
    setInfo(fetchData);
  };

  // Fetch comments for the owner
  const commentsResponse = async () => {
    const response = await fetch(
      `http://localhost:5100/api/Komentar/GetKomentariForVlasnik/${id}`,
      {
        credentials: "include",
      }
  
    );
    
    const commentsData = await response.json();
    console.log(commentsData);
    setInfo((prevInfo) => ({ ...prevInfo, komentari: commentsData }));
    //setInfo(fetchData);
  }
//   const commentsResponse = await fetch(
//     `http://localhost:5100/api/Komentar/GetKomentariForVlasnik/${id}`
//   );
//   const commentsData = await commentsResponse.json();
//   setInfo((prevInfo) => ({ ...prevInfo, komentari: commentsData }));
// };

  const handleDeleteAndNavigate = async (id) => {//////////////////
    try {
        // Fetch function that deletes the vlasnik
        await fetch(`http://localhost:5100/api/Vlasnik/DeleteVlasnik/${id}`, {
            method: 'DELETE',
        });
 
        // Navigate to the "/vlasnici" page
        navigate('/vlasnici');
    } catch (error) {
        console.error('Error deleting vlasnik:', error);
    }
};

  const calculateAvgRating = () => {
    let initSum = 0;
    let averageRating=0;
    if(info.komentari !=null){
      info.komentari.forEach((review) => {
        initSum = initSum + review.ocena;
      });
  
    averageRating = Math.round(initSum*100 / parseFloat(info.komentari.length))/100;
    }
    return averageRating
  };

  const update = () => {
    getInfo();
    commentsResponse();
    reloadHeader();
  };

  useEffect(() => {
    getInfo();
    commentsResponse();
  }, []);

  return (
    <Container component="main" sx={{ pt: 3 }}>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <Typography variant="h3" align="left">
            {info != undefined ? info.kompanija : ""} ✨
            {info != undefined ? calculateAvgRating() : ""}
          </Typography>
          <Typography align="left">
            {info != undefined ? "🧑 Vlasnik: " + info.ime : ""}
          </Typography>
          <Typography align="left">
            {info != undefined ? "📞" + info.kontakt: ""}
          </Typography>
          <Box sx={{ display: type === "public" ? "none" : "flex", mt: 1 }}>
            <EditVlasnik
              currentName={info.ime}
              currentContact={info.kontakt}
              Properties={info.autoIds}
              Reviews={info.komentari}
              update={update}
            />
            <Button variant="contained" sx={{ml:2}} onClick={()=>{navigate("/AddAuto/"+id)}}>
              Add Auto
            </Button>
            <Button variant="contained" sx={{ ml: 2 }} onClick={() => handleDeleteAndNavigate(info.id)}>
                Ukloni vlasnika
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            position: "sticky",
            top: 65,
            mt: 4,
            zIndex: 20,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Tabs
            value={value}
            variant="scrollable"
            scrollButtons
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Auto list" />
            <Tab
              label="Reviews"
              sx={{ display: type === "public" ? "none" : "" }}
            />
            {/* <Tab label="Categories" sx={{ display: type === "public" ? "none" : "" }} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AutoList AutoIds={info.autoIds} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <CardList type="proceedings" /> */}
          {/* OVDE IDE REVIEWS LIST THING !!!!!!!!!!!!!!!!!!!!!!!!!!!*/}

          <Grid item xs={12} key={id} padding={3}>
            {info.komentari == undefined || info.komentari.length == 0 ? (
              <Typography>No reviews found 😒</Typography>
            ) : (
              ""
            )}
            {info.komentari != null && (
              <Grid
                container spacing={2}
                /*xs={12} md={6} lg={6}*/
              >
                {info.komentari
                  //.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
                  .map((card, index) => {
                    // const {
                    //   id,
                    //   authorID,
                    //   postID,
                    //   text,
                    //   downvotes,
                    //   upvotes,
                    //   time,
                    // } = card;
                    console.log(card);
                    console.log(card.text);
                    return (
                      <ReviewCard
                        text={card.text}
                        ocena={card.ocena}
                        imeOsobe={card.imeOsobe}
                      />
                    );
                  })}
              </Grid>
            )}
          </Grid>
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
                    <CardList type="categories" />
                </TabPanel> */}
      </Box>
    </Container>
  );
}
