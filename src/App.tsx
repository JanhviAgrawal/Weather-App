import { Outlet } from "react-router";

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#EDF4FA] to-[#CFE3F1] font-sans text-[#243A5E] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      
      {/* --- Custom CSS for Cloud Animations --- */}
      <style>
        {`
          @keyframes drift {
            0% { transform: translateX(-25vw); }
            100% { transform: translateX(120vw); }
          }
          .animate-drift-1 { animation: drift 40s linear infinite; }
          .animate-drift-2 { animation: drift 32s linear infinite; animation-delay: -12s; }
          .animate-drift-3 { animation: drift 55s linear infinite; animation-delay: -25s; }
          .animate-drift-4 { animation: drift 48s linear infinite; animation-delay: -5s; }
        `}
      </style>

      {/* --- Animated Background Clouds (Different Shapes & More Visible) --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Cloud 1 - Classic Fluffy Shape (More visible) */}
        <svg className="absolute top-[12%] text-white/80 w-56 h-56 animate-drift-1 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
        
        {/* Cloud 2 - Smooth & Asymmetric Shape */}
        <svg className="absolute top-[42%] text-white/70 w-40 h-40 animate-drift-2 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>

        {/* Cloud 3 - Huge, Flat Bottom (Blurred slightly for 3D depth) */}
        <svg className="absolute top-[65%] text-white/50 w-88 h-88 animate-drift-3 drop-shadow-lg blur-[2px]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.42 8.22A7 7 0 0 0 5.06 10.11 4 4 0 0 0 6 18h11a5 5 0 0 0 1.42-9.78z" />
        </svg>

        {/* Cloud 4 - Small, Compact Classic Shape */}
        <svg className="absolute top-[5%] text-white/90 w-28 h-28 animate-drift-4 drop-shadow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 19c2.485 0 4.5-2.015 4.5-4.5 0-2.316-1.745-4.218-3.99-4.474a6.002 6.002 0 0 0-11.455-.838A4.502 4.502 0 0 0 2.5 14.5C2.5 16.985 4.515 19 7 19h10.5z" />
        </svg>

      </div>

      {/* --- Main Application --- */}
      <div className="w-full max-w-7xl h-full min-h-[85vh] flex justify-center items-center relative z-10">
        <Outlet />
      </div>
    </div>
  );
}