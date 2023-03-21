import  axios from "axios";
import { useState } from "react"; 
import Input from "./components/Input";

function App() {
  const [cityData, setCityData] = useState<any>({ });
  const getData = (cityName: string) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f3a683fbc3msh385d4da297ee7e9p134996jsne879cdba850c",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    axios.get(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityName}&days=3`,
      options
    )
      .then((response) => {
        console.log(response.data);
        setCityData(response.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Input getData={getData}></Input>
      <div>{cityData?.current?.temp_c}</div>
    </div>
  );
}

export default App;
