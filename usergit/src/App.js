
import './App.css';
import React, { useState} from "react";
import ProfileSummary from './components/ProfileSummary';
import Navbar from './components/Navbar';
import './components/css/username.css'
function App() {
  const [username, setUsername] = useState("");



  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    setUsername(event.target.username.value);
  };
  return (<>
    
    
    <Navbar/>
    <div className='App'>
      <h3 style={{fontSize:'3rem',marginTop:'7rem'}}>USER PROFILE ANALYZER</h3>
      <form onSubmit={handleSubmit} >
          <input type="text" name='username' style={{height:'50px',marginRight:'1%'}}/>
        <button type="submit" style={{borderRadius: '3px'}}>Submit</button>
      </form>

      <ProfileSummary username={username}  />
    </div>
    
      
    
    </>
  );
}

export default App;
