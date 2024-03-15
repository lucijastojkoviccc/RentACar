import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import styled from 'styled-components';

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


  const Rezervisi = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [rezervacijaData, setRezervacijaData] = useState({
        ime: '',
        email: '',
        brojDana: 0,
        datumOd: new Date(),//'',
        datumDo: new Date(),
        autoId: '',
       
      });

    //   const [ime, setIme] = useState('');
    //   const [email, setEmail] = useState('');
    //   const [brojDana, setBrojDana] = useState(1);
    //   const [datumOd, setDatumOd] = useState(new Date());
    //   const [datumDo, setDatumDo] = useState(new Date());
    //   const [autoID, setAutoID] = useState('');
    
      //const handleRezervacija = () => {
       
    
        // const rezervacijaData = {
        //   ime: ime,
        //   email: email,
        //   brojDana: brojDana,
        //   datumOd: datumOd,
        //   datumDo: datumDo,
        //   autoID: autoID,
        // };
    
        // Slanje podataka na server
        //console.log('Podaci za rezervaciju:', rezervacijaData);
     // };
    


  const handleAdd = async () => {
    try {
      const response = await fetch(`http://localhost:5100/api/Rezervacija/AddRezervacija/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rezervacijaData),
      });
  
      if (response.ok) {
        try {
          const data = await response.json();
          console.log('Add Response:', data);
        
          console.log('Reservation added successfully');
        } catch (jsonError) {
          
          console.error('Failed to parse JSON response:', jsonError);
        }
      } else {
        const errorResponse = await response.text(); // Read the error response as text
        console.error('Failed to add reservation. Server response:', errorResponse);
      }
  
      navigate(`/AutoProfile/${id}`);
    } catch (error) {
      console.error('Failed to add reservation. Client-side error:', error);
    }
  };
  
  
  

 
  return (
    <Container component="main">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Rezerviši Auto
        </Typography>
        <form>
          <Grid container spacing={2}>
            {/* Add form fields based on your auto data structure */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Vase ime"
                value={rezervacijaData.ime}
                onChange={(e) => setRezervacijaData({ ...rezervacijaData, ime: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={rezervacijaData.email}
                onChange={(e) => setRezervacijaData({ ...rezervacijaData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Datum od
              </Typography>
              <DatePicker
                selected={rezervacijaData.datumOd}
                selectsStart
                startDate={rezervacijaData.datumOd}
                endDate={rezervacijaData.datumDo}
                onChange={(date) => setRezervacijaData({ ...rezervacijaData, datumOd: date })}
                dateFormat="dd.MM.yyyy"
              />
            </Grid>

          </Grid>
          <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Datum do
              </Typography>
              <DatePicker
                selected={rezervacijaData.datumDo}
                selectsEnd
                startDate={rezervacijaData.datumOd}
                endDate={rezervacijaData.datumDo}
                onChange={(date) => setRezervacijaData({ ...rezervacijaData, datumDo: date })}
                dateFormat="dd.MM.yyyy"
                minDate={rezervacijaData.datumOd}
              />
            </Grid>
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleAdd}
            style={{ marginTop: 20 }}
          >
            Sacuvaj rezervaciju
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Rezervisi;


// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import moment from 'moment';
// import styled from 'styled-components';

// const FormContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const FormSection = styled.div`
//   flex: 1;
//   margin-right: 20px;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 20px;
// `;

// const FormLabel = styled.label`
//   display: block;
//   margin-bottom: 8px;
//   font-weight: bold;
// `;

// const StyledInput = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 16px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const StyledButton = styled.button`
//   background-color: #4caf50;
//   color: white;
//   padding: 12px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// `;
// const Title = styled.h1`
//     text-align: center;
//     margin-bottom: 20px;
//     color: #4b0082;
//     font-weight: bold;
//     font-family: 'Arial', sans-serif;
// `;
// const PageContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     height: 100vh;
// `;

// const Rezervisi = () => {
//   const [ime, setIme] = useState('');
//   const [email, setEmail] = useState('');
//   const [brojDana, setBrojDana] = useState(1);
//   const [datumOd, setDatumOd] = useState(new Date());
//   const [datumDo, setDatumDo] = useState(new Date());
//   const [autoID, setAutoID] = useState('');

//   const handleRezervacija = () => {
//     // Ovdje implementirajte logiku za slanje podataka na server (backend).
//     // Na primjer, možete koristiti Fetch API ili axios.

//     const rezervacijaData = {
//       Ime: ime,
//       Email: email,
//       BrojDana: brojDana,
//       DatumOd: datumOd,
//       DatumDo: datumDo,
//       AutoID: autoID,
//     };

//     // Slanje podataka na server
//     console.log('Podaci za rezervaciju:', rezervacijaData);
//   };

//   return (
//     <div>
//     <PageContainer>
//       <Title>Rezervišite automobil</Title>
//       <FormContainer>
//         {/* Kalendar za odabir datuma */}
//         <FormSection>
//           <FormGroup>
//             <h2>Datum od</h2>
//             <DatePicker
//               selected={datumOd}
//               selectsStart
//               startDate={datumOd}
//               endDate={datumDo}
//               onChange={(date) => setDatumOd(date)}
//               dateFormat="dd.MM.yyyy"
//             />
//           </FormGroup>
//           <FormGroup>
//             <h2>Datum do</h2>
//             <DatePicker
//               selected={datumDo}
//               selectsEnd
//               startDate={datumOd}
//               endDate={datumDo}
//               onChange={(date) => setDatumDo(date)}
//               dateFormat="dd.MM.yyyy"
//               minDate={datumOd}
//             />
//           </FormGroup>
//         </FormSection>

//         {/* Polja za unos ostalih podataka */}
//         <FormSection>
//           <h2>Unesi ostale podatke</h2>
//           <FormGroup>
//             <FormLabel>Ime:</FormLabel>
//             <StyledInput type="text" value={ime} onChange={(e) => setIme(e.target.value)} />
//           </FormGroup>
//           <FormGroup>
//             <FormLabel>Email:</FormLabel>
//             <StyledInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </FormGroup>
//           <StyledButton onClick={handleRezervacija}>Rezerviši</StyledButton>
//         </FormSection>
//       </FormContainer>
//       </PageContainer>
//     </div>
//   );
// };

// export default Rezervisi;
