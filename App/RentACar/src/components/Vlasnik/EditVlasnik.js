import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography, TextField, Box, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/EditRounded";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function EditStudentProfileDialog({
    currentId,
    currentName,
    currentContact,
    automobili,
    kompanija,
    komentari,
    username,
    password,
    update,
}) {
    const [open, setOpen] = React.useState(false);

    const { id } = useParams();
    const [ime, setName] = useState(currentName);
    const [kontakt, setContact] = useState(currentContact);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
   
    


    async function handleSubmit() {
        try {
          const response = await fetch(
            `http://localhost:5100/api/Vlasnik/EditVlasnik/${id}`,
            {
              method: "PUT",
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id,
                ime: ime ,
                kontakt: kontakt ,
                komentari,
                autoIds: automobili,
                kompanija,
                username,
                password,
              }),
            }
          );
    
          setOpen(false);
    
          if (!response.ok) {
            alert("[Error occurred] Could not update owner");
            return;
          }
    
          update();
        } catch (error) {
          console.error("Error updating owner:", error);
          alert("Error occurred while updating owner");
        }
      }

    //console.log(komentari);
    const fileInput = React.createRef();

    //console.log(filename)
    React.useEffect(() => {
        setName(currentName);
        setContact(currentContact);
    }, [currentName, currentContact]);

    return (
        <div>
            <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleClickOpen}
            >
                Izmeni profil
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Edit profile info"}</DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={ime}
                        required
                        error={!ime}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Kontakt"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setContact(e.target.value);
                        }}
                        value={kontakt}
                        required
                        error={!kontakt}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Otkazi</Button>
                    <Button
                        onClick={handleSubmit}
                        autoFocus
                    >
                        Prihvati
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
