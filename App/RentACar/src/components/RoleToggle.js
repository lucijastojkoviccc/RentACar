import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ColorToggleButton(props) {

  const { setStudent, setOther,setProfessor, selected } = props;

  const [alignment, setAlignment] = React.useState("web");
  const navigate = useNavigate();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      sx={{ mt: 2, width: 1 }}
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton sx={{ width: 1 }} value="student" onClick={() => { navigate("/CreateProfile/student"); setStudent() }} selected={selected === "student"}>
        <SchoolRoundedIcon />
        <Typography sx={{ ml: 1 }}> Student</Typography>
      </ToggleButton>
      <ToggleButton sx={{ width: 1 }} value="professor" onClick={() => { navigate("/CreateProfile/professor"); setProfessor() }} selected={selected === "professor"}>
        <WorkRoundedIcon />
        <Typography sx={{ ml: 1 }}> Professor</Typography>
      </ToggleButton>
      <ToggleButton sx={{ width: 1 }} value="other" onClick={() => { navigate("/CreateProfile/other"); setOther() }} selected={selected === "other"}>
        <WorkRoundedIcon />
        <Typography sx={{ ml: 1 }}> Other</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
