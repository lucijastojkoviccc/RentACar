import { Paper, CssBaseline, Box, Button } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import MapsHomeWorkIcon from '@mui/icons-material/EuroSymbol';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { TextBox } from 'devextreme-react/text-box';
import SendIcon from '@mui/icons-material/Send';
//import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


import {
  Tabs,
  Tab,
  TabPanel,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Avatar,
  Grid,
  Divider,
  TextField,
  IconButton,
  useTheme
} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import CardActions from "@mui/material/CardActions";



export default function AutoProfile({ type, reloadHeader }) {
 
  //const theme = useTheme();
  const decodeBase64Image = (base64String) => {
    const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches.length !== 3) {
      throw new Error('Invalid base64 string');
    }
    return {
      type: matches[1],
      data: Buffer.from(matches[2], 'base64'),
    };
  };
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  // Function to open the dialog with the selected image
  const openImageDialog = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

   // Function to close the dialog
   const closeImageDialog = () => {
    setSelectedImage(null);
    setOpenDialog(false);
  };

  

  const { id } = useParams();
 
  const navigate = useNavigate();
 
  const [newQuestion, setNewQuestion] = useState([]);
 
  //const [newAnswerIndex, setNewAnswerIndex] = useState(0);
 
  const handleQAChange = (e) => {    
    setNewQuestion(e.value);
  };
 
  // const handleAQChange = async (event) => {
  //     setNewAnswer(event.target.value);
  // };
 
  // const handleAIndexChange = async (event) => {
  //     setNewAnswerIndex(event.target.value);
  // };
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
        {value === index && (
          <Box sx={{ p: 3, width: 1 }}>
            {children}
          </Box>
        )}
      </Box>
    );
  }
 
  async function _submitForm(values, actions) {
    const response = await fetch(
      "http://localhost:5100/api/QA/Ask/" + id + "/" +
      newQuestion,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
 
    getInfo();
 
    if (response.ok) {
      const data = await response.json();
      // setSubmitted("yes");
      getInfo();
    }
  }
 
  async function _submitAnswer(index) {
    const list = [...newAnswer];
    list[index].answer2 = newAnswer[index].answer2;

    console.log(newAnswer[index].answer2);
    console.log(index);
    const response = await fetch(
      "http://localhost:5100/api/QA/Answer/" + id + "/" +
      newAnswer[index].answer2 + "/" + index,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
 
    getInfo();
 
    if (response.ok) {
      const data = await response.json();
      // setSubmitted("yes");
      getInfo();
    }
  }
 
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
 
  const [info, setInfo] = useState({
    id: "",
    naziv: "",
    opis: "",
    grad: "",
    adresa: "",
    slike: [],
    boja: "",
   
    brojSedista: 0,
   
    cenaPoDanu: "",
    pogodanZaInvalide: true,
    automatic: true,
   
    qAs: [],
    listaRezervacija: []
  });
 
  const getInfo = async () => {
    const response = await fetch("http://localhost:5100/api/Auto/GetAuto/" + id);
    if (response.ok) {
      const fetchData = await response.json();
      console.log(fetchData)
      //if (fetchData.cv.education.length > 0) {
      setInfo(fetchData);
      setNewAnswer(fetchData.qAs);
      //}
    }
  }
  const handleDeleteAndNavigate = async (id) => {//////////////////
    try {
        // Fetch function that deletes the vlasnik
        await fetch(`http://localhost:5100/api/Auto/DeleteAuto/${id}`, {
            method: 'DELETE',
        });
 
        // Navigate to the "/vlasnici" page
        navigate('/home');
    } catch (error) {
        console.error('Error deleting vlasnik:', error);
    }
};
const handleUpdateAndNavigate = async (id) =>{
  navigate(`/UpdateAuto/${id}`);
};

const handleRezervisiNavigate = async (id) => {
  navigate(`/Rezervisi/${id}`);
}
 
  const [newAnswer, setNewAnswer] = useState(info.qAs);
 
  console.log("NA" + newAnswer);
 
  const handleAnswerRemove = (index) => {
    const list = [...newAnswer];
    list.splice(index, 1);
    setNewAnswer(list);
  }
 
  const handleAnswerChange = (value, index) => {
    const list = [...newAnswer];
    list[index].answer2 = value;
    setNewAnswer(list);
  };
 
 
  const update = () => {
    getInfo();
    reloadHeader();
  }
 
  useEffect(() => {
    getInfo();
 
  }, []);

  const images = info.slike.map((photo, index) => ({
    original: `data:image/png;base64,${photo}`,
    thumbnail: `data:image/png;base64,${photo}`,
  }));

  return (
    <Container component="main" sx={{ pt: 3 }}>
      <CssBaseline />
      <Grid container>
        <Grid container item xs={12}>
          <Grid item xs={10} sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="h2"
              align="left"
              sx={{ align: "left" }}
            >
             {info.naziv}
            </Typography>
          </Grid>
 
          <Divider sx={{ width: "100%" }} />
          <Grid>
            <Typography
              variant="h5"
              align="left"
              sx={{ mt: 2, display: info.cenaPoDanu == undefined ? "none" : "" }}
            >
              <LocationOnIcon sx={{ fontSize: "30px", color: "#FEB7CE" }} /> {info.adresa + ", " + info.grad}
            </Typography>
            <Typography
              variant="h5"
              align="left"
              sx={{ mt: 1, display: info.cenaPoDanu == undefined ? "none" : "" }}
            >
              <MapsHomeWorkIcon sx={{ fontSize: "30px", color: "#FEB7CE" }} /> { info.cenaPoDanu + " eura po danu"}
            </Typography>
            
          </Grid>
    
        </Grid>
      </Grid>
     
      <Box >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', position: "sticky", top: 35, mt: 3, zIndex: 20 }}>
        <Tabs value={value} variant="scrollable" scrollButtons onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Informacije" sx={{ color: 'white', fontWeight: 'bold' }} />
          <Tab label="Opis" sx={{ color: 'white', fontWeight: 'bold', display: type === "public" ? "none" : "" }} />
          <Tab label="Slike" sx={{ color: 'white', fontWeight: 'bold', display: type === "public" ? "none" : "" }} />
          <Tab label="Q&A" sx={{ color: 'white', fontWeight: 'bold', display: type === "public" ? "none" : "" }} />
          <Tab label="Rezervacije" sx={{ color: 'white', fontWeight: 'bold', display: type === "public" ? "none" : "" }} />
        </Tabs>
 
        </Box>
        <TabPanel value={value} index={0}>
          <Grid>
            <Paper sx={{ height: 35 }}>
              <Typography
                variant="h5"
                align="center"
                sx={{ mt: 2, display: info.cenaPoDanu == undefined ? "none" : "" }}
              >
                {/* {"Property type: "} {info.propertyType == 1 ? " Apartment" : " House"} */}
                {"Boja: " + info.boja}
              </Typography>
            </Paper>
            <Paper sx={{ height: 35 }}>
              <Typography
                variant="h5"
                align="center"
                sx={{ mt: 2, mb: 1, display: info.cenaPoDanu == undefined ? "none" : "" }}
              >
                 {"Broj sedista: " + info.brojSedista} {/*{info.roomCount == 1 ? " room" : " rooms"} */}
              </Typography>
            </Paper>
            {/* <Paper sx={{ height: 35 }}>
              <Typography
                variant="h5"
                align="center"
                sx={{ mt: 2, mb: 1, display: info.price == undefined ? "none" : "" }}
              >
                {"Minimal rent period: " + info.minimalRentPeriod} {info.minimalRentPeriod == 1 ? "month" : "months"}
              </Typography>
            </Paper> */}
            <Paper sx={{ height: 35 }}>
              <Typography
                variant="h5"
                align="center"
                sx={{ mt: 2, mb: 1, display: info.cenaPoDanu == undefined ? "none" : "" }}
              >
                {"Vrsta menjaca: "} {info.automatic == true ? " Automatik" : " Manuelni"}
              </Typography>
            </Paper>
            <Paper sx={{ height: 35 }}>
              <Typography
                variant="h5"
                align="center"
                sx={{ mt: 2, mb: 1, display: info.cenaPoDanu == undefined ? "none" : "" }}
              >
                {"Pogodan za invalide: "} {info.pogodanZaInvalide == true ? " Da" : " Ne"}
              </Typography>
            </Paper>
          </Grid>
          <Button variant="contained" sx={{ ml: 2, mt:2 }} onClick={() => handleRezervisiNavigate(info.id)}>
                Rezervisi Automobil
            </Button>
          <Button variant="contained" sx={{ ml: 2, mt:2 }} onClick={() => handleDeleteAndNavigate(info.id)}>
                Ukloni Automobil
            </Button>
            <Button variant="contained" sx={{ ml: 2, mt:2 }} onClick={() => handleUpdateAndNavigate(info.id)}>
                Izmeni Automobil
            </Button>
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
           {info.opis == "" ? "Currently no amenities to display" : info.opis
            //.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
            .map((am, index) => {
              return (
                <Grid item >
                  <Typography style={{ marginRight: 20, marginBottom: 10, marginTop: 10 }} variant='h5' align="center">{am}</Typography>
                  <Divider style={{ marginBottom: 10 }}></Divider>
                </Grid>
              );
            })} 
        </TabPanel> */}
        <TabPanel value={value} index={1}>
            {info.opis === "" ? (
              "Currently no amenities to display"
            ) : (
              <Grid item>
                <Typography
                  style={{ marginRight: 20, marginBottom: 10, marginTop: 10 }}
                  variant="h5"
                  align="center"
                >
                  {info.opis}
                </Typography>
                <Divider style={{ marginBottom: 10 }}></Divider>
              </Grid>
            )}
      </TabPanel>
{/* RADE SLIKEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}
        <TabPanel value={value} index={2}>
          <Gallery items={images} />
        {/* ovaj slider je dobar ali ne fensi*/
        /* <Slider {...settings}>
          {info.slike.map((photo, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <img
                src={`data:image/png;base64,${photo}`}
                alt={`Car Photo ${index + 1}`}
                style={{ maxWidth: '100%', maxHeight: '70vh', margin: 'auto' }}
              />
            </div>
          ))}
        </Slider> */}
        {/* {info.slike.length === 0
            ? "Currently no photos to display"
            : info.slike.map((photo, index) => {
                console.log(photo); // Log the image URL
                return (
                  <CardMedia
                    key={index}
                    sx={{
                      mb: 2,
                      height: 250,
                      width: 200,
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                    component="img"
                   // height={250}
                   // width={200}
                    src={`data:image/png;base64,${photo}`}  
          
                    //image={photo}
                    alt={`Car Photo ${index + 1}`}
                    onClick={() => openImageDialog(photo)}
                  />
                );
              })} */}
        
          {/* {info.slike.length == 0 ? "Currently no photos to display" : info.slike
            //.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
            .map((photo, index) => {
              return (
                <CardMedia
                  sx={{ mb: 2 }}
                  component="img"
                  height={250}
                  width={200}
                  image={"https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"}
                  alt=" "
                />
              );
            })} */}
        </TabPanel>
          {/* Image Dialog */}
          <Dialog open={openDialog} onClose={closeImageDialog}>
            {/* <DialogTitle>Slika</DialogTitle> */}
            <DialogContent>
              <img
                src={`data:image/png;base64,${selectedImage}`}
                alt="Enlarged Car Photo"
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </DialogContent>
            <Button onClick={closeImageDialog} color="primary">
              Close
            </Button>
          </Dialog>

          <TabPanel value={value} index={3}>
          <TextBox name={"question"}          
            value={newQuestion}
            onValueChanged={handleQAChange}
            style={{ marginBottom: 10, marginRight: 5, padding: 10 }}
            fullWidth />
          <Button
            onClick={_submitForm}
            color="primary"
            aria-label="add an alarm"
            variant="contained"
          >
            <AddIcon /> Dodaj pitanje
          </Button>
          <Divider style={{ marginBottom: 10, marginTop: 10 }}></Divider>
          {/* {info.qAs.length == 0 || info.qAs ==null ? "Trenutno nema pitanja" : info.qAs          
            .map((qa, index) => {
              return (
                <Grid>
                  <Typography
                    variant="h5"
                    align="center"
                    sx={{ mt: 1, mb: 1, display: info.cenaPoDanu == undefined ? "none" : "" }}
                  >
                    {"Pitanje " + (index + 1) + ":"} {qa.pitanje}
                  </Typography>
                  <Typography
                    variant="h5"
                    align="center"
                    sx={{ mt: 1, mb: 1, display: info.cenaPoDanu == undefined ? "none" : "" }}
                  >
                    {"Odgovor na pitanje " + (index + 1) + ":"} {qa.odgovor == null ? <Grid>
           
                      <TextBox
                        name={`answer2`}
                        defaultValue={newAnswer[index].answer2}
                        onValueChanged={(e) => handleAnswerChange(e.value, index)} // Koristimo e.value za pristup vrijednosti
                        style={{ marginBottom: 10, marginRight: 5 }}
                        fullwidth
                      />
                      <Button onClick={() => _submitAnswer(index)} variant="contained">Odgovori na pitanje</Button></Grid> : qa.odgovor}
                  </Typography>
                  <Divider style={{ marginBottom: 10 }}></Divider>
                </Grid>
              );
            })} */}
            {info.qAs && info.qAs.length > 0 ? (
              info.qAs.map((qa, index) => (
                <Grid key={index}>
                  <Typography
                    variant="h5"
                    align="center"
                    sx={{ mt: 1, mb: 1, display: info.cenaPoDanu === undefined ? "none" : "" }}
                  >
                    {"Pitanje " + (index + 1) + ":"} {qa.pitanje}
                  </Typography>
                  <Typography
                    variant="h5"
                    align="center"
                    sx={{ mt: 1, mb: 1, display: info.cenaPoDanu === undefined ? "none" : "" }}
                  >
                    {"Odgovor na pitanje " + (index + 1) + ":"} {qa.odgovor == null ? (
                      <Grid>
                        <TextBox
                          name={`answer${index}`}
                          defaultValue={newAnswer[index][`answer${index}`]}
                          onValueChanged={(e) => handleAnswerChange(e.value, index)}
                          style={{ marginBottom: 10, marginRight: 5 }}
                          fullwidth
                        />
                        <Button onClick={() => _submitAnswer(index)} variant="contained">
                          Odgovori na pitanje
                        </Button>
                      </Grid>
                    ) : (
                      qa.odgovor
                    )}
                  </Typography>
                  <Divider style={{ marginBottom: 10 }}></Divider>
                </Grid>
              ))
            ) : (
              <Typography variant="h5" align="center">
                Trenutno nema pitanja
              </Typography>
            )}
        </TabPanel>
        <TabPanel value={value} index={4}>
        {info.listaRezervacija && info.listaRezervacija.length > 0 ? (
  <Grid container spacing={2}>
    {info.listaRezervacija.map((rezervacija, index) => (
      <Grid item key={index} xs={12}>
        <Typography variant="h5" align="center" gutterBottom>
          Ime: {rezervacija.ime ?? 'Nema informacija'}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Email: {rezervacija.email ?? 'Nema informacija'}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Datum od: {rezervacija.datumOd ? new Date(rezervacija.datumOd).toLocaleDateString('en-GB') : 'Nema informacija'}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Datum do: {rezervacija.datumDo ? new Date(rezervacija.datumDo).toLocaleDateString('en-GB') : 'Nema informacija'}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Ukupna cena: {rezervacija.ukupnaCena ?? 'Nema informacija'}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Broj dana: {rezervacija.brojDana ?? 'Nema informacija'}
        </Typography>
        <Divider style={{ margin: '20px 0' }} />
      </Grid>
    ))}
  </Grid>
) : (
  "Trenutno nema dostupnih rezervacija"
)}

        </TabPanel>
      </Box>
    </Container>
  );
}