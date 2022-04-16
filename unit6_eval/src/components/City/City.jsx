import React,{useEffect, useState} from 'react'
import axios from "axios"


export const City = () => {

    

    

    useEffect(() => {
      
        axios
          .get("https://json-server-050.herokuapp.com/country")
          .then((res) => {
            setCntryData([...res.data]);
          });
    
      return () => {
        
      }
    }, [])
    

    const [cntryData,setCntryData] = useState([]);

    const [City, setCity] = useState({
      city: "",
      country:"",
      population:""
    });

    const handleChange = (e) => {
      setCity({
        ...City,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      axios
        .post("https://json-server-050.herokuapp.com/city", City)
        .then((res) => {
          console.log(res.data);
          setCity({
            city: "",
            country: "",
            population: "",
          });
        });
      console.log(City);
    };


  return (
    <div>
      <form action=" " onSubmit={handleSubmit}>
        <label htmlFor="">City</label>
        <input
          value={City.city}
          onChange={handleChange}
          type="text"
          name="city"
        />

        <label htmlFor="">Country</label>
        <select onChange={handleChange} name="country">
          <option value="--">Select Country</option>
          {cntryData.map((cntry, i) => {
            return (
              <option key={i} value={cntry.name}>
                {cntry.name}
              </option>
            );
          })}
        </select>

        <label htmlFor="">Population</label>
        <input
          value={City.population}
          onChange={handleChange}
          type="Number"
          name="population"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
