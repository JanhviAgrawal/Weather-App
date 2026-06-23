import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { getWeatherByCity } from '../services/weatherApi.services';

export default function WeatherDetail() {
  const { city } = useParams<{ city: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (city) {
      setLoading(true);
      getWeatherByCity(city)
        .then((res) => setData(res))
        .finally(() => setLoading(false));
    }
  }, [city]);

  if (loading) return <div className="text-2xl font-light tracking-widest text-[#243A5E] animate-pulse">Loading...</div>;
  if (!data) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const formatTime = (unixTime: number) => {
    return new Date(unixTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full max-w-6xl bg-[#243A5E] rounded-[2.5rem] shadow-2xl p-10 md:p-14 flex flex-col relative overflow-hidden">
      
      {/* Back Button */}
      <Link to="/" className="absolute top-8 left-8 w-10 h-10 bg-[#5F86A6] rounded-full flex items-center justify-center text-[#EDF4FA] hover:bg-[#8FB6D8] hover:text-[#243A5E] transition-colors z-50 shadow-lg">
        &larr;
      </Link>

      {/* Top Header */}
      <div className="flex justify-center items-center gap-4 text-[#CFE3F1] text-xs tracking-wide mb-16 relative z-20">
        <span className="flex items-center gap-2 text-[#EDF4FA] font-medium">
          <svg className="w-4 h-4 text-[#8FB6D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          {data.name}, {data.sys.country} <span className="text-[10px] ml-1 text-[#8FB6D8]">⏷</span>
        </span>
        <span>({dateStr})</span>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full mb-16 relative z-10">
        
        {/* Left Side: Large Temp & Conditions */}
        <div className="w-full md:w-1/3 z-20 flex flex-col items-start text-center md:text-left">
          <h1 className="text-8xl md:text-[11rem] font-extralight tracking-tighter leading-none mb-2 text-[#EDF4FA]">
            {Math.round(data.main.temp)}&deg;
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-[#8FB6D8] mb-10 capitalize">
            {data.weather[0].description}
          </h2>
          
          <div className="flex gap-12 text-left">
            <div>
              <div className="flex items-center gap-2 text-[#CFE3F1] text-xs mb-2">
                <svg className="w-4 h-4 text-[#8FB6D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                Wind
              </div>
              <div className="text-xl font-light text-[#EDF4FA]">{data.wind.speed} <span className="text-sm text-[#CFE3F1]">m/s</span></div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#CFE3F1] text-xs mb-2">
                <svg className="w-4 h-4 text-[#8FB6D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                Humidity
              </div>
              <div className="text-xl font-light text-[#EDF4FA]">{data.main.humidity}%</div>
            </div>
          </div>
        </div>

        {/* Center: Large Weather Icon */}
        <div className="w-full md:w-1/3 flex justify-center z-10 absolute md:relative inset-0 md:inset-auto opacity-30 md:opacity-100 pointer-events-none">
          <img 
            src={iconUrl} 
            alt="weather" 
            className="w-72 h-72 md:w-104 md:h-104 object-contain scale-125 drop-shadow-[0_0_60px_rgba(237,244,250,0.15)]" 
          />
        </div>

        {/* Right Side: Details Panel */}
        <div className="w-full md:w-1/3 flex justify-end z-20 mt-10 md:mt-0">
          <div className="bg-[#5F86A6]/20 border border-[#8FB6D8]/30 rounded-3xl p-6 w-full max-w-xs shadow-xl backdrop-blur-sm">
            <RightPanelItem icon="🌡️" label="Feels Like" value={`${Math.round(data.main.feels_like)}°`} />
            <RightPanelItem icon="📉" label="Min Temp" value={`${Math.round(data.main.temp_min)}°`} />
            <RightPanelItem icon="📈" label="Max Temp" value={`${Math.round(data.main.temp_max)}°`} />
            <RightPanelItem icon="⏱️" label="Pressure" value={`${data.main.pressure} hPa`} />
            <RightPanelItem icon="🌅" label="Sunrise" value={formatTime(data.sys.sunrise)} />
            <RightPanelItem icon="🌇" label="Sunset" value={formatTime(data.sys.sunset)} noBorder />
          </div>
        </div>
      </div>
    </div>
  );
}

function RightPanelItem({ icon, label, value, noBorder = false }: { icon: string, label: string, value: string, noBorder?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-4 ${!noBorder ? 'border-b border-[#8FB6D8]/20' : ''}`}>
      <div className="flex items-center gap-3 text-[#CFE3F1] text-sm font-light">
        <span>{icon}</span> {label}
      </div>
      <div className="text-[#EDF4FA] text-sm font-medium">{value}</div>
    </div>
  );
}