import React from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from "axios"
import Country from "./country";

function App() {

  const [currentCountry , setCountry] = React.useState([])

  var options=[]

    axios.get(`http://localhost:8080/api/countries`).then(res => {
      const persons = res.data;
      console.log("countries",persons.countries)
      for(let data of persons.countries){
        options.push(data.name);
      }
    })


  var countryData ;
  function countryDetails(e){
    console.log("event value" , e.value)

    axios.get(`http://localhost:8080/api/countries`)
    .then(res => {
      const persons = res.data;
      console.log(persons.countries)
      for(let data of persons.countries){
        if(data.name === e.value){
         countryData = data;
         setCountry({name : countryData.name , id : countryData.id ,continents : countryData.continent , rank : countryData.rank , flag : countryData.flag})
        }
      }
    })

  }

  console.log("currentCountry" ,currentCountry)
  
  const defaultOption = options[0];
  
    return (
      <div id="country">
       <h1>Hello</h1>
       <Dropdown options={options} onChange={countryDetails} value={defaultOption} placeholder="Select an option" />
      {
        <Country
            key={currentCountry.id}
            id={currentCountry.id}
            country={currentCountry.name}
            continent={currentCountry.continents}
            rank = {currentCountry.rank}
            flag = {currentCountry.flag}
          />

      }
          

      
      
      </div>
      

    );
  }

  export default App;