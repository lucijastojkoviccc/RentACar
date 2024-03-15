import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
    Button,
    Typography,
    TextField,
    Container,
    CssBaseline,
    Box,
    Select,
    MenuItem,
    Radio,
    Grid,
    Paper,
    Divider,
    FormControl,
    FormControlLabel,
    IconButton,
    fabClasses
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import RadioGroup from '@mui/material/RadioGroup';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function AdAuto(props) {

    const theme = useTheme();

    const navigate = useNavigate();

    const { id } = useParams();

    function fileToBase64(file) {
                return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result.split(",")[1]);
                  reader.onerror = reject;
                  reader.readAsDataURL(file);
                });
              }

            

    async function _submitForm(values, actions) {

        const base64Images = await Promise.all(
            propertyImages.map(async (file) => {
                const base64String = await fileToBase64(file);
                console.log(base64String); 
                return base64String;
            })
        );

        base64Images.forEach((base64String, index) => {
            propertyImages.push(base64String);
        });
            //formData.append(`slike[${index}]`, base64String);
   
        console.log("NAME "+propertyName);
        console.log("DESCRIPTION "+propertyDescription);
        console.log("CITY "+propertyCity);
        console.log("ADDRESS "+propertyAddress);
        console.log("COLOR "+propertyColor);
        console.log("IMAGES "+propertyImages);
        console.log("BROJ SEDISTA "+propertyBrojSedista);
        console.log("CENA PO DANU "+propertyCenaPoDanu);
        console.log("INVALID "+propertyZaInvalide);
        console.log("AUTOMATIC "+propertyAutomatic);
        
        const response = await fetch(
            "http://localhost:5100/api/Auto/AddAuto",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({"id":"", 
                "naziv": propertyName, 
                "opis": propertyDescription, 
                "boja": propertyColor,
                "grad": propertyCity, 
                "adresa": propertyAddress, 
                "slike": propertyImages, 
                "brojSedista": propertyBrojSedista, 
                "cenaPoDanu": propertyCenaPoDanu, 
                "pogodanZaInvalide":propertyZaInvalide, 
                "automatic": propertyAutomatic,
                 "qAs":[],
                 "vlasnik": null,
                 "listaRezervacija":[]
                  })
            }
        )
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const response2 = await fetch(
                "http://localhost:5100/api/VLasnik/AddAutoToVlasnik/" +
                data.id + "/"+id,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                      },
                }
            )
            navigate("/AddedAutoPage");
        }
    }
    const [propertyName, setPropertyName] = useState("");

    const [propertyDescription, setPropertyDescription] = useState("");

    const [propertyColor, setPropertyColor] = useState("");

    const [propertyCity, setPropertyCity] = useState("");

    const [propertyAddress, setPropertyAddress] = useState("");

    const [propertyImages, setPropertyImages] = useState([]);

    const [propertyBrojSedista, setBrojSedista] = useState(0);

    const [propertyCenaPoDanu, setCenaPoDanu] = useState(0);

    const [propertyZaInvalide, setPropertyZaInvalide] = useState(true);

    const [propertyAutomatic, setPropertyAutomatic] = useState(true);

    const handleNaziv = (event) => {
        setPropertyName(event.target.value);
    }
    const handleOpis = (event) => {
        setPropertyDescription(event.target.value);
    }

    const handleGrad = (event) => {
        setPropertyCity(event.target.value);
    }

    const handleAdresa = (event) => {
        setPropertyAddress(event.target.value);
    }
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setPropertyImages([...propertyImages, ...files]);
       
    }
    const handleRemoveImage = (index) => {
        const updatedImages = [...propertyImages];
        updatedImages.splice(index, 1);
        setPropertyImages(updatedImages);
     };

    const handleSedista = (event) => {
        setBrojSedista(event.target.value);
    }
    const handleBoja = (event) => {
        setPropertyColor(event.target.value);
    }

    const handleCena = (event) => {
        setCenaPoDanu(event.target.value);
    }

    const handleInvalid = (event) => {
        setPropertyZaInvalide(event.target.value);
    }

    const handleAutomatic = (event) => {
        setPropertyAutomatic(event.target.value);
    }


    
    return (

            <Container component="main"  >
                <CssBaseline />
                <React.Fragment>
                    <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                        Dodaj novi auto
                    </Typography>
                    <Paper
                        sx={{ p: 3, mb: 4, backgroundColor: theme.palette.mode === 'dark' ? "#3a3b3c" : "whitesmoke", }}
                        variant="outlined"
                    >
                        <Typography component="h1" variant="h6" align="center" sx={{ m: 2 }}>
                            Popunite polja da bi dodali novi auto!
                        </Typography>
                    </Paper>
                    <Paper
                        sx={{ p: 3, mb: 4 }}
                        variant="outlined"
                    >
                    <Grid item xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        />
                        </Grid>
                        {/* <Gallery items={images} /> */}
                        <Grid item xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {propertyImages.map((file, index) => (
                                <div key={index} style={{ position: 'relative', margin: '5px' }}>
                                    <Avatar
                                        alt={`Automobil Slika ${index}`}
                                        src={URL.createObjectURL(file)}
                                        style={{ width: '64px', height: '64px' }}
                                    />
                                    <IconButton
                                        style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '16px' }}
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ))}
                    </div>
                    
                </Grid>
                     <Grid item xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                                
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    {/* <Typography component="subtitle1" align="center" sx={{ m: 2 }}> Koji je tip vozila? </Typography>
                                    <Select fullWidth
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={propertyType}
                                        onChange={handlePTypeChange}
                                    >
                                        <MenuItem value={0}>Automobil</MenuItem>
                                        
                                    } 
                                    */ }
                                </FormControl>
                                
                    </Grid> 
    
                        <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                            <Typography align="center" sx={{ m: 2 }}> Koji je naziv automobila? </Typography>
                            <TextField onChange={(event) => handleNaziv(event)} name={"propertyName"} label={"Enter car name"} fullWidth />
    
                    </Grid>
    
                    <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                            <Typography align="center" sx={{ m: 2 }}> Napisite kratak opis automobila </Typography>
                            <TextField multiline rows={5} onChange={(event) => handleOpis(event)} name={"propertyDecsription"} label={"Enter car description"} fullWidth />
    
                    </Grid>
    
                    <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                            <Typography align="center" sx={{ m: 2 }}> Gde se nalazi automobil (Grad)? </Typography>
                            <TextField onChange={(event) => handleGrad(event)} name={"propertyCity"} label={"Enter car city"} fullWidth />
    
                    </Grid>
    
                    <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                            <Typography align="center" sx={{ m: 2 }}> Gde se nalazi automobil (Adresa)? </Typography>
                            <TextField onChange={(event) => handleAdresa(event)} name={"propertyAddress"} label={"Enter car address"} fullWidth />
    
                    </Grid>
    
                    <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                            <Typography align="center" sx={{ m: 2 }}> Koje je boje automobil? </Typography>
                            <TextField onChange={(event) => handleBoja(event)} name={"propertyColor"} label={"Enter car color"} fullWidth />
    
                    </Grid>
    
                   
    
                    <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                            <Typography align="center" sx={{ m: 2 }}> Koliko sedista ima automobil? </Typography>
                            <TextField onChange={(event) => handleSedista(event)} name={"propertyBrojSedista"} label={"Enter number of seats"} fullWidth />
    
                    </Grid>
    
                    <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                            <Typography align="center" sx={{ m: 2 }}> Napisite cenu po danu </Typography>
                            <TextField onChange={(event) => handleCena(event)} name={"propertyCenaPoDanu"} label={"Enter the price for one day of renting"} fullWidth />
    
                    </Grid>
    
    
                    <Grid container xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                                <Typography component="subtitle1" align="center" sx={{ m: 2 }}> Da li je automobil pogodan za invalide? </Typography>
                                <FormControl style={{ alignItems: "column", justifyContent: "column" }}>
                                    <RadioGroup style={{ alignItems: "column", justifyContent: "column" }}
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={propertyZaInvalide}
                                        onChange={handleInvalid}
                                    >
                                        <Grid style={{ display: "inline-block" }}>
                                            <FormControlLabel value="true" control={<Radio onChange={handleInvalid} />} label="Da" />
                                            <FormControlLabel value="false" control={<Radio onChange={handleInvalid} />} label="Ne" />
                                        </Grid>
    
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
    
                            <Grid container xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                                <Typography component="subtitle1" align="center" sx={{ m: 2 }}> Da li je automatik? </Typography>
                                <FormControl style={{ alignItems: "column", justifyContent: "column" }}>
                                    <RadioGroup style={{ alignItems: "column", justifyContent: "column" }}
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={propertyAutomatic}
                                        onChange={handleAutomatic}
                                    >
                                        <Grid style={{ display: "inline-block" }}>
                                            <FormControlLabel value="true" control={<Radio onChange={handleAutomatic} />} label="Da" />
                                            <FormControlLabel value="false" control={<Radio onChange={handleAutomatic} />} label="Ne" />
                                        </Grid>
    
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Button onClick={_submitForm}
                                variant="contained" endIcon={<SendIcon />}> Potvrdi </Button>
                        {/* </Box> */}
                    </Paper>
    
                </React.Fragment>
            </Container>
        );
    
}

// const Gallery = ({ items }) => (
//     <div>
//         {items.map((item, index) => (
//             <img key={index} src={item} alt={`Gallery Item ${index}`} style={{ maxWidth: '100%', maxHeight: '200px', margin: '5px' }} />
//         ))}
//     </div>
// );

// function generateBoundary() {
//     return "----WebKitFormBoundary" + Math.random().toString(36).substring(2);
// }
// const boundary = generateBoundary();

// export default function AddAuto(props) {
//     const theme = useTheme();

//     const navigate = useNavigate();

//     const { id } = useParams();

    
//     function fileToBase64(file) {
//         return new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result.split(",")[1]);
//           reader.onerror = reject;
//           reader.readAsDataURL(file);
//         });
//       }

//     async function _submitForm(values, actions) {

//         console.log("NAZIV "+propertyName);
//         console.log("OPIS "+propertyDescription);
//         console.log("BOJA "+propertyColor);
//         console.log("GRAD "+propertyCity);
//         console.log("ADRESA "+propertyAddress);
//         console.log("SLIKE" + imageFiles);
//         //console.log("AREA "+propertyArea);
//         //console.log("TYPE "+propertyType);
//         console.log("BROJ SEDISTA "+propertySedistaCount);
//         console.log("CENA "+propertyPrice);
//         //console.log("MIN RENT "+propertyMinRent);
//         console.log("POGODAN ZA INVALIDE "+propertyZaInvalide);
//         console.log("AUTOMATIC "+propertyAutomatic);
//         console.log("REZERVACIJE "+propertyListaRezervacija);
//         console.log("VLASNIK "+propertyVlasnik);
        
//         //console.log("AMENITIES "+amenityList);

//         const formData = new FormData();
//         formData.append("id", "");
//         formData.append("naziv", propertyName);
//         formData.append("opis", propertyDescription);
//         formData.append("boja", propertyColor);
//         formData.append("grad", propertyCity);
//         formData.append("adresa", propertyAddress);
       
        
//         const base64Images = await Promise.all(
//             imageFiles.map(async (file) => {
//                 const base64String = await fileToBase64(file);
//                 console.log(base64String); 
//                 return base64String;
//             })
//         );
//         if(base64Images != null && base64Images != undefined && base64Images != [] )
//         {
//                 base64Images.forEach((base64String, index) => {
//                 formData.append(`slike[${index}]`, base64String);
//             });
//          } 
//          else
//             formData.append("slike", imageFiles);
       

//         formData.append("brojSedista", propertySedistaCount);
//         formData.append("cenaPoDanu", propertyPrice);
//         formData.append("pogodanZaInvalide", propertyZaInvalide);
//         formData.append("automatic", propertyAutomatic);
//         formData.append("qAs", null);
//         formData.append("vlasnik", propertyVlasnik);//null);
//         formData.append("listaRezervacija", propertyListaRezervacija);//null);
//         // Append each image file to FormData
//         const headers = new Headers();
//         headers.append('Content-Type', `multipart/form-data; boundary=${boundary}`);
//        // headers.append('Content-Length', '999999999');

//         try{
//             const response = await fetch(
//                 "http://localhost:5100/api/Auto/AddAuto",
//                 {
//                     method: "POST",
//                     credentials: "include",
//                     headers: headers,
//                     body: formData,
//                 //     body: JSON.stringify({"id":"", 
//                 //     "naziv": propertyName, 
//                 //     "opis": propertyDescription, 
//                 //     "boja": propertyColor,
//                 //     "grad": propertyCity, 
//                 //     "adresa": propertyAddress, 
//                 //     "slike":[], 
//                 //    // "area": propertyArea, 
//                 //     //"propertyType": propertyType, 
//                 //     "brojSedista":propertySedistaCount, 
//                 //    // "amenities": amenityList, 
//                 //     "cenaPoDanu": propertyPrice, 
//                 //     "pogodanZaInvalide": propertyZaInvalide, 
//                 //     "automatic": propertyAutomatic,                 
//                 //     //"minimalRentPeriod": propertyMinRent, 
//                 //     "qAs":[]  })
//                 }
//             );
//             if (response.ok) {
//                 const data = await response.json();
//                 console.log(data);
//                 try {
//                     const response2 = await fetch(
//                         `http://localhost:5100/api/Vlasnik/AddAutoToVlasnik/${data.id}/${id}`,
//                         {
//                             method: "PUT",
//                             credentials: "include",
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             // Add any additional data you need to send in the body here
//                         }
//                     );
            
                    
//                     navigate("/AddedAutoPage");
                    
//                 } catch (error) {
//                     console.error("Error in second fetch:", error);
//                 }
//             }
//             else {
//                 const errorData = await response.json();
//                 console.error("Server error:", errorData);
//             }
//         }catch (error) {
//             // Uhvati sve ostale greške koje se mogu pojaviti prilikom izvršavanja fetch-a
//             console.error("Fetch error:", error);
//         }
//     }

    
//     const [propertyVlasnik, setPropertyVlasnik] = useState("");
//     const [propertyListaRezervacija, setPropertyListaRezervacija] = useState("");

//     const [propertyName, setPropertyName] = useState("");

//     const [propertyDescription, setPropertyDescription] = useState("");

//     const [propertyRezervacije, setPropertyRezervacije] = useState("");

//     const [propertyColor, setPropertyColor] = useState("");

//     const [propertyCity, setPropertyCity] = useState("");

//     const [propertyAddress, setPropertyAddress] = useState("");

//     //const [propertyArea, setPropertyArea] = useState(0);

//     const [propertyType, setPropertyType] = useState("");

//     const [propertySedistaCount, setPropertySedistaCount] = useState(0);

//     const [propertyPrice, setPropertyPrice] = useState(0);

//     //const [propertyMinRent, setPropertyMinRent] = useState(0);

//     const [propertyZaInvalide, setPropertyZaInvalide] = useState(true);

//     const [propertyAutomatic, setPropertyAutomatic] = useState(true);

//     const [imageFiles, setImageFiles] = useState([]);

//     //const [amenityList, setAmenityList] = useState([{}]);

//     // const handleSubmit = () => console.log(textValue);

//     // const handleAmenityAdd = () => {
//     //     setAmenityList([...amenityList, { }])
//     // }

//     // console.log("CL " + amenityList);

//     // const handleAmenityRemove = (index) => {
//     //     const list = [...amenityList];
//     //     list.splice(index, 1);
//     //     setAmenityList(list);
//     // }

//     // const handleAmenityChange = (event, index) => {
//     //     const { value} = event.target;
//     //     const list = [...amenityList];
//     //     list[index]= value;
//     //     setAmenityList(list);
//     // }
//     const handleVlasnikChange = (event) => {
//         setPropertyVlasnik(event.target.value);
//     }
//     const handleListaRezervacijaChange = (event) => {
//         setPropertyListaRezervacija(event.target.value);
//     }

//     const handleImageChange = (event) => {
//         const files = Array.from(event.target.files);
//         //setImageFiles(files);
//         setImageFiles([...imageFiles, ...files]);
//       };
//     const handlePNChange = (event) => {
//         setPropertyName(event.target.value);
//     }
//     const handlePDChange = (event) => {
//         setPropertyDescription(event.target.value);
//     }

//     const handlePCChange = (event) => {
//         setPropertyCity(event.target.value);
//     }

//     const handlePAChange = (event) => {
//         setPropertyAddress(event.target.value);
//     }

//     // const handlePAreaChange = (event) => {
//     //     setPropertyArea(event.target.value);
//     // }

//     const handlePColorChange = (event) => {
//         setPropertyColor(event.target.value);
//     }

//     const handlePTypeChange = (event) => {
//         setPropertyType(event.target.value);
//     }

//     // const handlePRoomCntChangeChange = (event) => {
//     //     setPropertyRoomCount(event.target.value);
//     // }
//     const handlePSedistaCount = (event) => {
//         setPropertySedistaCount(event.target.value);
//     }

//     const handlePPriceChange = (event) => {
//         setPropertyPrice(event.target.value);
//     }

//     // const handlePMinRentChange = (event) => {
//     //     setPropertyMinRent(event.target.value);
//     // }

//     const handlePPetFChange = (event) => {
//         setPropertyZaInvalide(event.target.value === "true");
//     }

//     const handlePExpCov = (event) => {
//         setPropertyAutomatic(event.target.value === "true");
//     }
//     const images = imageFiles.map((base64String, index) => `data:image/jpg;base64,${base64String}`);
    
//     const handleRemoveImage = (index) => {
//         const updatedImages = [...imageFiles];
//         updatedImages.splice(index, 1);
//         setImageFiles(updatedImages);
//     };

//     return (

//         <Container component="main"  >
//             <CssBaseline />
//             <React.Fragment>
//                 <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
//                     Dodaj novi auto
//                 </Typography>
//                 <Paper
//                     sx={{ p: 3, mb: 4, backgroundColor: theme.palette.mode === 'dark' ? "#3a3b3c" : "whitesmoke", }}
//                     variant="outlined"
//                 >
//                     <Typography component="h1" variant="h6" align="center" sx={{ m: 2 }}>
//                         Popunite polja da bi dodali novi auto!
//                     </Typography>
//                 </Paper>
//                 <Paper
//                     sx={{ p: 3, mb: 4 }}
//                     variant="outlined"
//                 >
//                 <Grid item xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
//                 <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handleImageChange}
//                     />
//                  </Grid>
//                  {/* <Gallery items={images} /> */}
//                  <Grid item xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
//                 <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
//                     {imageFiles.map((file, index) => (
//                             <div key={index} style={{ position: 'relative', margin: '5px' }}>
//                                 <Avatar
//                                     alt={`Automobil Slika ${index}`}
//                                     src={URL.createObjectURL(file)}
//                                     style={{ width: '64px', height: '64px' }}
//                                 />
//                                 <IconButton
//                                     style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '16px' }}
//                                     onClick={() => handleRemoveImage(index)}
//                                 >
//                                     <DeleteIcon />
//                                 </IconButton>
//                             </div>
//                         ))}
//                 </div>
                
//             </Grid>
//                 <Grid item xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                            
//                             <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
//                                 <Typography component="subtitle1" align="center" sx={{ m: 2 }}> Koji je tip vozila? </Typography>
//                                 <Select fullWidth
//                                     labelId="demo-simple-select-standard-label"
//                                     id="demo-simple-select-standard"
//                                     value={propertyType}
//                                     onChange={handlePTypeChange}
//                                 >
//                                     <MenuItem value={0}>Automobil</MenuItem>
//                                     {/* <MenuItem value={1}>Apartment</MenuItem> */}
//                                 </Select>
//                             </FormControl>
                            
//                 </Grid>

//                  <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
//                         <Typography align="center" sx={{ m: 2 }}> Koji je naziv automobila? </Typography>
//                         <TextField onChange={(event) => handlePNChange(event)} name={"propertyName"} label={"Enter car name"} fullWidth />

//                 </Grid>

//                 <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
//                         <Typography align="center" sx={{ m: 2 }}> Napisite kratak opis automobila </Typography>
//                         <TextField multiline rows={5} onChange={(event) => handlePDChange(event)} name={"propertyDecsription"} label={"Enter car description"} fullWidth />

//                 </Grid>

//                 <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
//                         <Typography align="center" sx={{ m: 2 }}> Gde se nalazi automobil (Grad)? </Typography>
//                         <TextField onChange={(event) => handlePCChange(event)} name={"propertyCity"} label={"Enter car city"} fullWidth />

//                 </Grid>

//                 <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
//                         <Typography align="center" sx={{ m: 2 }}> Gde se nalazi automobil (Adresa)? </Typography>
//                         <TextField onChange={(event) => handlePAChange(event)} name={"propertyAddress"} label={"Enter car address"} fullWidth />

//                 </Grid>

//                 <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
//                         <Typography align="center" sx={{ m: 2 }}> Koje je boje automobil? </Typography>
//                         <TextField onChange={(event) => handlePColorChange(event)} name={"propertyColor"} label={"Enter car color"} fullWidth />

//                 </Grid>

//                 {/* <Paper sx={{ p: 3, mb: 4, mt:3, backgroundColor: theme.palette.mode === 'dark' ? "#3a3b3c" : "whitesmoke", }} style={{ display: "flex", flexDirection: "column", alignItems: "space-between" }}
//                         variant="outlined">
//                         <Typography align="center" sx={{ m: 2 }}> <LightbulbCircleIcon style={{ color: "red" }} /> Does the property have any amenities worth listing? </Typography>
//                         {
//                             amenityList.map((singleamenity, index) => (
//                                 <Grid>
//                                     {(amenityList.length == 1) ?
//                                         (
//                                             <Grid style={{ display: "flex", flexDirection: "row" }}>
//                                                 <TextField name={"amenity"} value={singleamenity.amenity} onChange={(event) => handleAmenityChange(event, index)} style={{ marginBottom: 10, marginRight: 5 }} label={"eg. Pool, Water fountain, Botanical garden, Garage..."} fullWidth />
//                                             </Grid>
//                                         ) :
//                                         (
//                                             <Grid style={{ display: "flex", flexDirection: "row" }}>
//                                                 <TextField name={"amenity"} value={singleamenity.amenity} onChange={(event) => handleAmenityChange(event, index)} style={{ marginBottom: 10, marginRight: 5 }} label={"eg. Pool, Water fountain, Botanical garden, Garage..."} fullWidth />
//                                                 <IconButton aria-label="delete" onClick={() => handleAmenityRemove(index)}>
//                                                     <DeleteIcon />
//                                                 </IconButton>
//                                             </Grid>

//                                         )}

//                                     {(amenityList.length - 1 === index) ?
//                                         (
//                                             <Grid>
//                                                 <Button onClick={handleAmenityAdd} variant="contained" sx={{ mt: 2 }} startIcon={<AddBoxIcon />} > Add amenity</Button>
//                                             </Grid>
//                                         ) : ""}
//                                 </Grid>
//                             ))
//                         }

//                 </Paper> */}

//                 {/* <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
//                         <Typography align="center" sx={{ m: 2 }}> How large is the property? </Typography>
//                         <TextField onChange={(event) => handlePAreaChange(event)} name={"propertyArea"} label={"Enter property area in square meters"} fullWidth />

//                 </Grid> */}

//                 <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
//                         <Typography align="center" sx={{ m: 2 }}> Koliko sedista ima automobil? </Typography>
//                         <TextField onChange={(event) => handlePSedistaCount(event)} name={"propertySedistaCount"} label={"Enter number of seats"} fullWidth />

//                 </Grid>

//                 <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
//                         <Typography align="center" sx={{ m: 2 }}> Napisite cenu po danu </Typography>
//                         <TextField onChange={(event) => handlePPriceChange(event)} name={"propertyPrice"} label={"Enter the price for one day of renting"} fullWidth />

//                 </Grid>

//                 {/* <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
//                         <Typography align="center" sx={{ m: 2 }}> Minimalan period rente </Typography>
//                         <TextField onChange={(event) => handlePMinRentChange(event)} name={"propertyMinRent"} label={"Enter minimal renting period"} fullWidth />

//                 </Grid> */}

//                 <Grid container xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
//                             <Typography component="subtitle1" align="center" sx={{ m: 2 }}> Da li je automobil pogodan za invalide? </Typography>
//                             <FormControl style={{ alignItems: "column", justifyContent: "column" }}>
//                                 <RadioGroup style={{ alignItems: "column", justifyContent: "column" }}
//                                     aria-labelledby="demo-controlled-radio-buttons-group"
//                                     name="controlled-radio-buttons-group"
//                                     value={propertyZaInvalide.toString()}
//                                     onChange={handlePPetFChange}
//                                 >
//                                     <Grid style={{ display: "inline-block" }}>
//                                         <FormControlLabel value="true" control={<Radio onChange={handlePPetFChange} />} label="Da" />
//                                         <FormControlLabel value="false" control={<Radio onChange={handlePPetFChange} />} label="Ne" />
//                                     </Grid>

//                                 </RadioGroup>
//                             </FormControl>
//                         </Grid>

//                         <Grid container xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
//                             <Typography component="subtitle1" align="center" sx={{ m: 2 }}> Da li je automatik? </Typography>
//                             <FormControl style={{ alignItems: "column", justifyContent: "column" }}>
//                                 <RadioGroup style={{ alignItems: "column", justifyContent: "column" }}
//                                     aria-labelledby="demo-controlled-radio-buttons-group"
//                                     name="controlled-radio-buttons-group"
//                                     value={propertyAutomatic.toString()}
//                                     onChange={handlePExpCov}
//                                 >
//                                     <Grid style={{ display: "inline-block" }}>
//                                         <FormControlLabel value="true" control={<Radio /*onChange={handlePExpCov}*/ />} label="Da" />
//                                         <FormControlLabel value="false" control={<Radio /*onChange={handlePExpCov}*/ />} label="Ne" />
//                                     </Grid>

//                                 </RadioGroup>
//                             </FormControl>
//                         </Grid>
//                         <Button onClick={_submitForm}
//                             variant="contained" endIcon={<SendIcon />}> Potvrdi </Button>
//                     {/* </Box> */}
//                 </Paper>

//             </React.Fragment>
//         </Container>
//     );
// }