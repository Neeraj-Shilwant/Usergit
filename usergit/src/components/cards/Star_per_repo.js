import React, { useState, useEffect } from "react";
import Plotly from "react-plotly.js";
import axios from "axios";

const StarsPerRepo = ({username}) => {
    const [starredRepos, setStarredRepos] = useState([]);
    const [starCounts, setStarCounts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${username}/starred`)
      .then((response) => {
        const starredRepoData = response.data;

        setStarredRepos(starredRepoData);

        starredRepoData.forEach((starredRepo) => {
          setStarCounts((prevStarCounts) => {
            return [...prevStarCounts, { repoName: starredRepo.name, starCount: starredRepo.stargazers_count }];
          });
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
          values: starCounts.map((starCount) => starCount.starCount),
          labels: starCounts.map((starCount) => starCount.repoName),
          // values:[19, 26, 55],
          // labels:['Residential', 'Non-Residential', 'Utility']
        },
      ]}
      layout={{
        width: 400,
        height: 350,plot_bgcolor:'#F6F1EE',
        paper_bgcolor:'#F6F1EE',
        title: {
          text: 'Stars Per Repo',
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

export default StarsPerRepo;