import { useState, useEffect } from 'react';
import { getWeatherByCity } from '../services/weatherApi.services';
import WeatherCard from './WeatherCard';

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('Surat');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const predefinedCities = ['Surat', 'Ahmedabad', 'Mumbai', 'Delhi'];

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(false);
    try {
      const data = await getWeatherByCity(cityName);
      setWeatherData(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      setCity(search);
      setSearch('');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl animate-fade-in px-4">
      
      <form onSubmit={handleSearch} className="w-full max-w-xl mb-6 flex gap-3 relative z-10">
        <input
          type="text"
          placeholder="Search location..."
          className="flex-1 bg-white/80 backdrop-blur-md border border-[#8FB6D8] text-[#243A5E] placeholder-[#5F86A6] px-6 py-4 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5F86A6] transition-all font-medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-[#243A5E] hover:bg-[#5F86A6] text-[#EDF4FA] px-8 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all font-semibold"
        >
          Search
        </button>
      </form>

      <div className="flex flex-wrap gap-3 mb-12 justify-center z-10">
        {predefinedCities.map((c) => (
          <button
            key={c}
            onClick={() => setCity(c)}
            className="bg-[#EDF4FA] border border-[#8FB6D8] text-[#243A5E] hover:bg-[#8FB6D8] hover:text-[#EDF4FA] px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm"
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <div className="text-xl font-medium tracking-wide text-[#243A5E] animate-pulse mt-10">Fetching skies...</div>}
      {error && !loading && <div className="text-red-700 font-medium mt-10 bg-red-50 border border-red-200 px-6 py-3 rounded-xl shadow-sm">Location not found. Please try again.</div>}
      
      {!loading && !error && weatherData && (
        <WeatherCard data={weatherData} />
      )}
    </div>
  );
}