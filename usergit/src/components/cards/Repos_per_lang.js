import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from 'react-plotly.js';



const ReposPerLanguagePieChart = ({ username }) => {
  const [reposPerLanguage, setReposPerLanguage] = useState(null);
  const [fork,setfork] = useState(0);
  const [issue,setissue] = useState(0);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        const repos = response.data;

        const reposPerLanguage = {};
        let totalforks = 0;
        let totalissues = 0;
        
        repos.forEach((repo) => {
          const language = repo.language;
          const forkcount = repo.forks;
          totalforks += forkcount; 
          
          const issuecount = repo.open_issues;
          totalissues+= issuecount;
          
          

          if (!reposPerLanguage[language]) {
            reposPerLanguage[language] = 0;
          }
          console.log(`total forks : ${fork}`);
          reposPerLanguage[language]++;
        });
        
        console.log(`issue : ${totalissues}`);
        
        setReposPerLanguage(reposPerLanguage);
        setfork(totalforks);
        setissue(totalissues);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  if (!reposPerLanguage) {
    return <div>Loading...</div>;
  }

  

  const data = Object.entries(reposPerLanguage).filter(
    (repo) => repo[0] !== "null"
  ).map((repo) => ({
    label: repo[0],
    value: repo[1],
  }));
  


  return (
    <>
    
    <Plot
        data={[
          {
            type: "pie",
            values: data.map((repo) => repo.value),
            labels: data.map((repo) => repo.label),
            // values:[19, 26, 55],
            // labels:['Residential', 'Non-Residential', 'Utility']
          },
        ]}
        layout={ {width: 400, height: 350,plot_bgcolor:'#F6F1EE',
        paper_bgcolor:'#F6F1EE', 
        title: {
            text: 'Repos Per Language',
            font: {
              family: 'Roboto',
              size: 25,
              weight:'bold',
              color: 'black'
            }
          }
        } 
      }
        style={{marginLeft:'-5%'}}
      />
      {/* <div>
      <h1>GitHub Repository Forks</h1>
      <h3>Total forks: {fork}</h3>
      </div> */}
      
      
    </>
  );
};

export default ReposPerLanguagePieChart;