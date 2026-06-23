import { Link } from 'react-router';

interface WeatherCardProps {
  data: any;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  return (
    <div className="w-full max-w-2xl bg-[#243A5E] rounded-4xl shadow-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group border border-[#5F86A6]/30">
      
      {/* Left side: Info */}
      <div className="flex flex-col w-full text-center md:text-left z-10">
        <h2 className="text-2xl md:text-3xl font-medium tracking-wide mb-1 text-[#EDF4FA]">
          {data.name}, <span className="font-light text-[#8FB6D8]">{data.sys.country}</span>
        </h2>
        <p className="text-[#8FB6D8] text-xs font-medium tracking-widest uppercase mb-6">
          Current Weather
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-6">
          <h3 className="text-7xl md:text-8xl font-extralight tracking-tighter leading-none text-[#EDF4FA]">
            {Math.round(data.main.temp)}&deg;
          </h3>
          <div className="text-sm text-[#CFE3F1] font-light mb-2 flex flex-row md:flex-col gap-4 md:gap-1">
            <span>H: {Math.round(data.main.temp_max)}&deg;</span>
            <span>L: {Math.round(data.main.temp_min)}&deg;</span>
          </div>
        </div>

        <div className="text-[#8FB6D8] font-light text-lg capitalize mb-4">
          {data.weather[0].description}
        </div>

        {/* Minimalist Stats */}
        <div className="flex justify-center md:justify-start gap-8 pt-4 w-full">
          <div className="flex items-center gap-2">
            <span className="text-[#CFE3F1] text-sm">Wind</span>
            <span className="text-[#EDF4FA] font-medium text-sm">{data.wind.speed}m/s</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#CFE3F1] text-sm">Hum</span>
            <span className="text-[#EDF4FA] font-medium text-sm">{data.main.humidity}%</span>
          </div>
        </div>
      </div>

      {/* Right side: Icon & Action */}
      <div className="flex flex-col items-center justify-center z-10 mt-8 md:mt-0 w-full md:w-auto">
        <img 
          src={iconUrl} 
          alt={data.weather[0].description} 
          className="w-40 h-40 md:w-48 md:h-48 object-contain scale-125 mb-4 drop-shadow-[0_0_30px_rgba(143,182,216,0.15)]" 
        />
        <Link 
          to={`/weather/${data.name}`} 
          className="mt-2 w-full text-center bg-[#5F86A6] hover:bg-[#8FB6D8] hover:text-[#243A5E] text-[#EDF4FA] text-sm py-3 px-6 rounded-2xl transition-all font-medium tracking-wide shadow-lg"
        >
          Detailed Forecast
        </Link>
      </div>
    </div>
  );
}