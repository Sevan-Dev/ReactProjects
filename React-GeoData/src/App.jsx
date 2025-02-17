import { useEffect, useState } from "react";

function App() {
  const [flags, setFlags] = useState(null);
  const [loading, setLoading] = useState(true); // État pour l'animation de chargement
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(data => {
        setFlags(
          data.map(country => ({
            name: country.name.common,
            flag: country.flags.svg,
            languages: country.languages ? Object.values(country.languages).join(", ") : "N/A",
            capital: country.capital?.[0] || "N/A",
            population: country.population,
            cca3: country.cca3
          }))
        );
        setLoading(false); // Arrête le chargement une fois les données récupérées
      })
      .catch(error => {
        console.error("Erreur API :", error);
        setLoading(false); // Arrête le chargement en cas d'erreur
      });
  }, []);

  return (
    <main className="bg-slate-800 font-geist py-28 px-80 min-h-screen flex flex-col items-center">
      <h1 className="text-white text-4xl font-light">Europe Countries Data</h1>
      <p className="text-white font-light">
        Click on a card to reveal a country&apos;s information
      </p>

      {/* ANIMATION DE CHARGEMENT */}
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div id="container" className="grid grid-cols-4 gap-10 mt-6">
          {flags?.sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
            <div
              key={country.cca3}
              id="card"
              className="w-full h-50 rounded-xs relative cursor-pointer"
              onClick={() => {
                setSelectedCountry(country);
                setOpen(true);
              }}
            >
              <img
                src={country.flag}
                className="object-cover w-full h-full bg-no-repeat rounded-xs"
                alt="flag"
              />
              <label className="absolute top-0 left-0 bg-white border-1 py-2 px-4 border-black rounded-xs">
                {country.name}
              </label>
            </div>
          ))}
        </div>
      )}

      {/* MODAL POUR INFOS DU PAYS */}
      {open && selectedCountry && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#000000c7] flex justify-center items-center z-10">
          <div className="bg-white p-8 rounded-lg text-start">
            <h2 className="text-black text-3xl font-light">
              Here is {selectedCountry.name}&apos;s information
            </h2>
            <p><b>Language(s):</b> {selectedCountry.languages}</p>
            <p><b>Capital:</b> {selectedCountry.capital}</p>
            <p><b>Population:</b> {selectedCountry.population}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
