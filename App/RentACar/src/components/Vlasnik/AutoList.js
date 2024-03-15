// import { Grid, Typography, useTheme } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import PaperCard from "./PaperCard";

// export default function AutoList({ AutoIds }) {
//   const [infos, setInfos] = useState([
//     {
//       naziv: "",
//       kontakt: "",
//       autoIds: [],
//       komentari: [],
//       id: "",
//     }
//   ]);
//   //const theme = useTheme();

//   const { id } = useParams();

//   const getInformations = async () => {
//     let response;
//     let data = [];

//     AutoIds.forEach(async element => {
//       response = await fetch(
//         "http://localhost:5100/api/Auto/GetAuto/" + element,
//         {
//           credentials: "include",
//         }
//       );
     
//       data.Append(response)
//     });
    
//     console.log(data);
//     setInfos(data);
//   };

//   useEffect(() => {
//     // getInformations();
//   }, []);

//   return (
//     <Grid container spacing={3}>
//       {console.log(AutoIds)}
//       {AutoIds.map((info, index) => (
//         <Grid item xs={12} md={6} lg={4} key={index}>
//           <PaperCard
//             infos={info.naziv}
//             index={index}
            
//           /> 
          
//         </Grid>
//       ))}
//     </Grid>
//   );
// }
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PaperCard from "./PaperCard";

export default function AutoList({ AutoIds }) {
  const [infos, setInfos] = useState([]);

  const { id } = useParams();

  const getInformations = async () => {
    try {
      const data = [];

      for (const element of AutoIds) {
        if(element){
          const response = await fetch(
            `http://localhost:5100/api/Auto/GetAuto/${element}`,
            {
              credentials: "include",
            }
          );
        
        const autoData = await response.json(); // assuming your response is JSON
        data.push(autoData);
          }
      }

      console.log(data);
      setInfos(data);
    } catch (error) {
      console.error("Error fetching auto data:", error);
    }
  };

  useEffect(() => {
    getInformations();
  }, [AutoIds]);

  return (
    <Grid container spacing={3}>
      {AutoIds.map((autoId, index) => (
      <Grid item xs={12} md={6} lg={4} key={index}>
        <PaperCard
          autoId={autoId} // Pass AutoId to PaperCard
          index={index}
        />
      </Grid>
    ))}
      {/* {infos.map((info, index) => (
        <Grid item xs={12} md={6} lg={4} key={index}>
          <PaperCard
            infos={info} 
            index={index}
          />
        </Grid>
      ))} */}
    </Grid>
  );
}

