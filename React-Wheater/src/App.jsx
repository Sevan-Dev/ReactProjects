import { useEffect, useState } from "react";

const APIKEY = import.meta.env.VITE_WEATHER_API;

function App() {
  const [dataWeather, setDataWeather] = useState(null);

  useEffect(() => {
    fetch(`https://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
      .then((response) => response.json())
      .then((data) => {
        setDataWeather({
          city: data.data.city, 
          country: data.data.country, 
          temperature: data.data.current.weather.tp, 
          icon: data.data.current.weather.ic
        });
      })
      .catch((error) => console.error("Erreur API :", error));
  }, []);

  return (
    <main className="w-screen h-screen flex justify-center items-center text-center bg-[#0e5092] font-geist">
      <div className="px-24 bg-white text-[#393939] rounded-lg shadow-xs flex flex-col items-center">
        {dataWeather ? (
          <>
            <h2 className="text-5xl mt-10">{dataWeather.city}</h2>
            <h3 className="text-2xl">{dataWeather.country}</h3>
            <h1 className="text-7xl font-semibold mt-10">
              {dataWeather.temperature}°
            </h1>
            <img
              className="w-32"
              src={`/icons/${dataWeather.icon}.svg`}
              alt="Météo"
            />
          </>
        ) : (
         <img src="./assets/loader.svg" alt="" />
        )}
      </div>
    </main>
  );
}

export default App;
