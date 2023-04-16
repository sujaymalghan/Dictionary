import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Dictionary from './Dictionary';
import React, { useState } from 'react';

function App() {

  const [boolbutton, setboolbutton] = useState(false);
  const [searchtext, setsearchtext] = useState('');
  const [dictionaryKey, setDictionaryKey] = useState(0);

  const opencomponents = (event) => {
    setboolbutton(true);
    setDictionaryKey(dictionaryKey + 1); // Update the dictionaryKey
  };

  const handleInputChange = (event) => {
    setsearchtext(event.target.value);
  };

  return (
    <div className="container">
      <div className="input-group" style={{ marginTop: 100 }}>
        <input type="text" className="form-control" placeholder="Search word" onChange={handleInputChange} aria-describedby="basic-addon2" style={{ marginLeft: 300 }}></input>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" style={{ marginRight: 500, marginLeft: 10 }} onClick={opencomponents}>Search</button>
        </div>
      </div>

      <Dictionary searchtexts={searchtext} boolbuttons={boolbutton} key={dictionaryKey} />
    </div>
  );
}

export default App;
