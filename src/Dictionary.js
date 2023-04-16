import React, { useState } from 'react';
import axios from 'axios';

const Dictionary = (props) => {
  
    const[arrbool,settrue]=useState(false);

  const [arr, setArr] = useState([]); 

  const [syns,setsyns] = useState([]);
  const [resch,setreschu] = useState([]);

  const text = props.searchtexts

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          key: '02a3939d-a48c-4cad-8b0e-965ff630ae49',
        },
      });
     
      return response;
    } catch (e) {
        
      return e.message;
    }
   
  };


  const handleButtonClick = async () => {
    var res = await fetchData();
    const newArr = res.data[0].meanings[0].definitions;
    console.log(newArr);
    if (newArr.length >=0) {
      setArr(newArr); 
      settrue(true);
    } 
  };

const handlesynonm = async () => {
    var ressyn = await fetchData();
    const newsyn = ressyn.data[0].meanings[0].definitions[0].synonyms;

    if (newsyn.length>=0)
    {
        setsyns(newsyn)
        settrue(true);
    }
     
};

const handlexample = async () => {
    var reshandle = await fetchData();
    const reshandl = reshandle.data[0].meanings[0].definitions;


    if (reshandl.length>=0)
    {
        setreschu(reshandl)
        settrue(true);
    }
      

};


  return (
    props.boolbuttons && (
      <div className="row" style={{ marginTop: 20 }}>
        
        <div className="col-md-4" style={{ marginLeft: 200, marginBottom: 20 }}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Definitions</h5>
              
              <p className="card-text">Gives the defintions of the word from the api</p>
              <div>
      {arrbool && (
        <ul>
        {arr.map((definitionObj, index) => {
    
            var def = definitionObj.definition;
       return  <li className="card-text" key={index}>{def}</li>;
        
      })
      }
        </ul>
      )}
    </div>
         
              <button type="button" className="btn btn-outline-primary" onClick={handleButtonClick}>
                Define
              </button>

            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Synonyms</h5>
              <p className="card-text">Displays Synonyms after clicking on the button</p>
              <div>
              {arrbool && (
  syns.length > 0 ? (
    <ul>
      {syns.map((def, index) => (
        <li className="card-text" key={index}>{def}</li>
      ))}
    </ul>
  ) : (
    <p>No Synonym in the API</p>
  )
)}
    </div>
              <button type="button" className="btn btn-outline-primary" onClick={handlesynonm} >
                Synonym
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4" style={{ marginLeft: 200, marginBottom: 20 }}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Examples</h5>
              
              <p className="card-text">Gives the examples from the api</p>
              <div>
      {arrbool &&
      
      resch.length > 0 ?(
        <ul>
      {resch.filter((definitionObj) => definitionObj.example && definitionObj.example.length > 0).map((definitionObj, index) => (
    <li className="card-text" key={index}>{definitionObj.example}</li>
))}

        </ul>
      ) : (
        <p>No Examples in the API</p>
      )}
    </div>
              <button type="button" className="btn btn-outline-primary" onClick={handlexample}>
                Example
              </button>

            </div>
          </div>
        </div>
      </div>
    
    
    )
  );
};

export default Dictionary;
