import React, { useState, useEffect } from "react";
import Plotly from "react-plotly.js";
import axios from "axios";

const CommitsPerRepoPieChart = ({username}) => {
    const [repos, setRepos] = useState([]);
    const [commitCounts, setCommitCounts] = useState([]);
    const [pullscount,setpullcount] = useState(0);
    useEffect(() => {
      let totalpull = 0;
        axios
          .get(`https://api.github.com/users/${username}/repos`)
          .then((response) => {
            const repoData = response.data;
           
            setRepos(repoData);
            
            repoData.forEach((repo) => {
                if(repo.private===false){
              axios
                .get(`https://api.github.com/repos/${repo.full_name}/commits`)
                .then((resp) => {
                  const commitData = resp.data;
    
                  setCommitCounts((prevCommitCounts) => {
                    return [...prevCommitCounts, { repoName: repo.name, countCommit: commitData.length }];
                  });
                })
                .catch((error) => {
                  console.log(error);
                });

                axios
                .get(`https://api.github.com/repos/${repo.full_name}/pulls`)
                .then((respo) => {
                  const pulldata = respo.data;
                  totalpull += pulldata.length;
                  
                })
                .catch((error) => {
                  console.log(error);
                });

            }
            });
            
          })
          .catch((error) => {
            console.log(error);
          });
      }, [username]);
      
  return (
    <Plotly
      data={[
        {
          type: "pie",
          values: commitCounts.map((commitCount) => commitCount.countCommit),
          labels: commitCounts.map((commitCount) => commitCount.repoName),
          // values:[19, 26, 55],
          // labels:['Residential', 'Non-Residential', 'Utility'],
          hole: .4
        },
      ]}
      layout={{
        width: 400,
        plot_bgcolor:'#F6F1EE',
        paper_bgcolor:'#F6F1EE',
        height: 350,
        title: {
          text: 'Commits Per Repo',
          font: {
            family: 'Roboto',
            size: 25,
            weight:'bold',
            color: 'black'
          }
        },
      }}
    />
  );
};

export default CommitsPerRepoPieChart;