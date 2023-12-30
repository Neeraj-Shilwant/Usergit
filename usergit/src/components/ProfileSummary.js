import React, { useState, useEffect } from "react";
import axios from "axios";
import './ProfileSummary.css'
// import ReposPerLanguagePieChart from "./cards/Repos_per_lang";
import CommitsPerRepoPieChart from "./cards/Commits_per_repo";
import StarsPerRepo from "./cards/Star_per_repo";
import PullCount from "./cards/Pull_count";
import Plot from 'react-plotly.js';

const ProfileSummary = ({ username }) => {
  const [profile, setProfile] = useState(null);
  const [stars, setStars] = useState(null);
  const [fork,setfork] = useState(0);
  const [issue,setissue] = useState(0);
  const [axioserror,setaxioserror] = useState(false);


  useEffect(() => {
    if(username){
    const apiRequests = [
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/starred`),
      
      
    ];
    let totalforks = 0;
    let totalissues = 0;
    axios.all(apiRequests).then((responses) => {
      const profileResponse = responses[0];
      const starsResponse = responses[1];
      
      
      setProfile(profileResponse.data);
      setStars(starsResponse.data.length);
    }).catch((err)=>{
      console.log("Axios get request error")
      setaxioserror(true);
    })

    }
  }, [username]);

  
    
  const ReposPerLanguagePieChart = () => {
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
        
        
        
      </>
    );
  };
  


  

  const [predictedOutput, setPredictedOutput] = useState(0);
  
      
    const fetchPredictedOutput = async () => {
      const repos = profile.public_repos;
      const headers = {
        'Content-Type': 'application/json'
      };
      axios.post('http://localhost:5000/predict', {
        star_count: stars,
        repo_count: repos,
        followers_count: profile.followers,
        following_count: profile.following,
        foll_ratio : profile.followers/profile.following,
        n_lang : 3,
        n_cont: 20,
        org_flag_0: 1,
        org_flag_1: 0
      },{headers})
      .then((response)=>{
        const predictedOutputData = response.data;
        setPredictedOutput(predictedOutputData.predicted_output);
      })
      .catch((error) => {
        console.error('Error sending data to Flask backend:', error);
      });
      
    };

  
  
  
  const [showButton, setShowButton] = useState(true);

  const handleScore = ()=>{
   if(profile){
    // console.log(profile.followers);
    fetchPredictedOutput();
    setShowButton(false);
   }
  }
  
  if (!profile) {
    return <div style={{marginTop:'10px'}}>Loading...</div>;
  }

  
  let colorClass = '';

  if (predictedOutput >= 3.51 && predictedOutput <= 5) {
    colorClass = 'green';
  } else if (predictedOutput > 2.50 && predictedOutput <= 3.50) {
    colorClass = 'orange';
  } else {
    colorClass = 'red';
  }

  return (
    <>
    {axioserror && <h2>The Checking Rate Limits exceeded. Try Again after </h2>}
    <div className="container">
      <div className="profile-summary">
      
        <img src={profile.avatar_url} alt={profile.name} className="profile-image"/>
      <div style={{marginLeft:'80px',marginTop:'35px'}}>
        <h1 className="profile-name">{profile.name}</h1>
        
        <ul className="arrow" style={{textAlign:'left'}}>
          <li style={{fontSize:'20px'}}>Public repos: {profile.public_repos}</li>
          <li style={{fontSize:'20px'}}>Followers: {profile.followers}</li>
          <li style={{fontSize:'20px'}}>Following: {profile.following}</li>
          <li style={{fontSize:'20px'}}>Stars : {stars}</li>
          <li style={{fontSize:'20px'}}><a href={profile.html_url} style={{color:'black',fontWeight:'bold',textDecoration:'none'}}>View Profile on github</a></li>
        </ul>
        </div>
      </div>
      <div className="container " style={{marginTop:'20px',display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <div>
          <ReposPerLanguagePieChart/>
        </div>
        <div>
        <CommitsPerRepoPieChart username = {username}/>
        </div>
        
    </div >
      <div className="container" style={{marginTop:'20px',display:'flex',flexDirection:'row',justifyContent:'center'}}>
          <div>
          <StarsPerRepo username={username}/>
          </div>
          <div style={{marginLeft:'80px',marginTop:'35px'}}>
            <h1 className="profile-name">IMPORTANT FEATURES</h1>
            
            <ul className="arrow" style={{textAlign:'left'}}>
              <li style={{fontSize:'20px'}}>Total forks count : 8</li>
              <li style={{fontSize:'20px'}}>Total Pull request : 12</li>
              <li style={{fontSize:'20px'}}>Total Issue Count : 3</li>
              <li style={{fontSize:'20px'}}>Total Contributors : 0</li>
            </ul>
            </div>
          
      </div>
      <div className="container " style={{marginTop:'20px',justifyContent:'center'}}>
          
          
          
              <h1 className="profile-name">GENERALIZED REPORT</h1>
              
                {showButton && <button onClick={handleScore} style={{borderRadius: '3px'}}>Predict</button>}
              
              <h3 style={{marginTop:'20px'}}>The user profile rating is <h3 style={{color:`${colorClass}`}}>{predictedOutput}</h3> </h3>
              <p style={{fontSize:'1.5rem',marginTop:'10px'}}>After analyzing the parameters of <b>GITHUB PROFILE</b> of the user and correlating 
              with the critical values ,<br/> our <b>MACHINE LEARNING MODEL</b> predicts that the 
              following user is malicious.
              </p>
          
        </div>
    </div>

    {/* /////////////////////////////////////////////////////// */}
    {/* <div className="container">
    <div className="profile-summary">
    
      <img src="logo512.png" alt='Logo' className="profile-image"/>
    <div style={{marginLeft:'80px',marginTop:'35px'}}>
      <h1 className="profile-name">Neeraj Shilwant</h1>
      
      <ul className="arrow" style={{textAlign:'left'}}>
        <li style={{fontSize:'20px'}}>Public repos: 11</li>
        <li style={{fontSize:'20px'}}>Followers: 34</li>
        <li style={{fontSize:'20px'}}>Following: 10</li>
        <li style={{fontSize:'20px'}}>Stars : 7</li>
        <li style={{fontSize:'20px'}}><a href="#" style={{color:'black',fontWeight:'bold',textDecoration:'none'}}>View Profile on github</a></li>
      </ul>
      </div>
    </div>
    <div className="container " style={{marginTop:'20px',display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <div>
        <ReposPerLanguagePieChart username = {username}/>
        </div>
        <div>
        <CommitsPerRepoPieChart username = {username}/>
        </div>
        
    </div>
    <div className="container " style={{marginTop:'20px',display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <div>
        <StarsPerRepo username={username}/>
        </div>
        
              <div style={{marginLeft:'80px',marginTop:'35px'}}>
            <h1 className="profile-name">IMPORTANT FEATURES</h1>
            
            <ul className="arrow" style={{textAlign:'left'}}>
              <li style={{fontSize:'20px'}}>Total forks count : 316</li>
              <li style={{fontSize:'20px'}}>Total Pull request : 23</li>
              <li style={{fontSize:'20px'}}>Total Issue Count : 21</li>
              <li style={{fontSize:'20px'}}>Total Contributors : 12</li>
            </ul>
            </div>
      </div>

        <div className="container " style={{marginTop:'20px',justifyContent:'center'}}>
          
          
          
              <h1 className="profile-name">GENERALIZED REPORT</h1>
              
              <h3 style={{marginTop:'20px'}}>There is {predictedOutput} chance that the user is Malicious</h3>
              <p style={{fontSize:'1.5rem',marginTop:'10px'}}>After analyzing the parameters of <b>GITHUB PROFILE</b> of the user and correlating 
              with the critical values ,<br/> our <b>MACHINE LEARNING MODEL</b> predicts that the 
              following user is malicious.
              </p>
          
        </div>
        
    </div> */}
    </>
  
  );
};

export default ProfileSummary;