import React, { useState, useEffect } from "react";
import axios from "axios";


const PullCount = ({ username }) => {
  const [pullscount,setpullcount] = useState(0);
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        const repoData = response.data;
        setRepos(repoData);
        let totalpull = 0;
        repoData.forEach((repo) => {
          if(repo.private===false){
              axios
              .get(`https://api.github.com/repos/${repo.full_name}/pulls`)
              .then((respo) => {
                const pulldata = respo.data;
                totalpull += pulldata.length;
                
              })
              .catch((error) => {
                console.log(error);
              });
              setpullcount(totalpull);
          }
        });

      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

 

  return (
    <>{pullscount}</>
  );
};

export default PullCount;