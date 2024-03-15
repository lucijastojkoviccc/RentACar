// UpdateAuto.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Button,
    Typography,
    TextField,
    Container,
    CssBaseline,
    Paper,
    Grid,
  } from '@mui/material';
  import SendIcon from '@mui/icons-material/Send';
  import IconButton from '@mui/material/IconButton';
  import DeleteIcon from '@mui/icons-material/Delete';

const UpdateAuto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [autoData, setAutoData] = useState({
    naziv: '',
    opis: '',
    boja: '',
    grad: '',
    adresa: '',
    slike: [],
    brojSedista: 0,
    cenaPoDanu: 0,
    pogodanZaInvalide: false,
    automatic: false,
    qAs: [],
   
  });

  //const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchAutoData = async () => {
      try {
        const response = await fetch(`http://localhost:5100/api/Auto/GetAuto/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAutoData(data);
          //setExistingImages(data.slike);
        } else {
          console.error('Failed to fetch auto details');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchAutoData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5100/api/Auto/EditAuto/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(autoData),
      });
  
      if (response.ok) {
        try {
          const data = await response.json();
          console.log('Update Response:', data);
        
          console.log('Auto updated successfully');
        } catch (jsonError) {
          
          console.error('Failed to parse JSON response:', jsonError);
        }
      } else {
        const errorResponse = await response.text(); // Read the error response as text
        console.error('Failed to update auto. Server response:', errorResponse);
      }
  
      navigate(`/AutoProfile/${id}`);
    } catch (error) {
      console.error('Failed to update auto. Client-side error:', error);
    }
  };
  
  

  const handleImageChange = async (event) => {
//     const files = event.target.files;
//     setAutoData({ ...autoData, slike: [...autoData.slike, ...files] });
//   };
    try {
        const files = Array.from(event.target.files);
        const base64Images = await Promise.all(files.map(file => fileToBase64(file)));
        
        const updatedImages = [...autoData.slike, ...base64Images];
        setAutoData({ ...autoData, slike: updatedImages });
    } catch (error) {
        console.error('Error converting images:', error);
    }
  };

  const handleDeleteImage = (index) => {
    // const updatedImages = [...existingImages];
    // updatedImages.splice(index, 1);
    // setExistingImages(updatedImages);
    const updatedImages = [...autoData.slike];
    updatedImages.splice(index, 1);
    setAutoData({ ...autoData, slike: updatedImages });
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Izmeni Auto
        </Typography>
        <form>
          <Grid container spacing={2}>
            {/* Add form fields based on your auto data structure */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Naziv"
                value={autoData.naziv}
                onChange={(e) => setAutoData({ ...autoData, naziv: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Opis"
                value={autoData.opis}
                onChange={(e) => setAutoData({ ...autoData, opis: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cena po danu"
                type="number"
                value={autoData.cenaPoDanu}
                onChange={(e) => setAutoData({ ...autoData, cenaPoDanu: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Boja"
                value={autoData.boja}
                onChange={(e) => setAutoData({ ...autoData, boja: e.target.value })}
              />
            </Grid>
            <Grid container spacing={2} justifyContent="center">
           
            {autoData.slike.map((image, index) => (
              <Grid item key={index} style={{ marginTop: '10px' }}>
                <img
                  src={`data:image/png;base64,${image}`}
                  alt={`Existing Image ${index}`}
                  style={{ width: '50px', height: '50px', marginRight: '10px' }}
                />
                <Button onClick={() => handleDeleteImage(index)}>Delete</Button>
              </Grid>
            ))}
            </Grid>
            <Grid item xs={12}>
              {/* Input for adding new images */}
              <input type="file" accept="image/*" multiple onChange={handleImageChange} />
            </Grid>
            
            {/* <Grid item xs={12}>
                 {existingImages.map((image, index) => (
                    <Grid item key={index}>
                    <img src={`data:image/jpg;base64, ${image}`} alt={`Existing Image ${index}`} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                    <IconButton onClick={() => handleDeleteImage(index)} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                    </Grid>
                ))} 
            </Grid>
            <Grid item xs={12}>
                <input type="file" accept="image/*" multiple onChange={handleImageChange} />
            </Grid> */}

            {/* <Grid item xs={12}>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} />
            </Grid> */}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleUpdate}
            style={{ marginTop: 20 }}
          >
            Izmeni Auto
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateAuto;
