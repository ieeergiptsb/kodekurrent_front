import React, { useEffect, useState } from 'react';

export default function HUDOverlay() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden text-primary font-mono text-xs opacity-70">
      {/* Top Left Corner */}
      <div className="absolute top-4 left-4 border-l-2 border-t-2 border-primary w-16 h-16">
        <div className="mt-1 ml-2">SYS.OP.24</div>
        <div className="ml-2 opacity-50">v2.0.4</div>
      </div>

      {/* Top Right Corner */}
      <div className="absolute top-4 right-4 border-r-2 border-t-2 border-primary w-16 h-16 text-right">
        <div className="mt-1 mr-2 tracking-widest">{time}</div>
        <div className="mr-2 opacity-50">STABLE</div>
      </div>

      {/* Bottom Left Corner */}
      <div className="absolute bottom-4 left-4 border-l-2 border-b-2 border-primary w-16 h-16 flex items-end">
        <div className="mb-1 ml-2">
          TARGET<br />
          <span className="opacity-50 text-[10px]">LOCKED</span>
        </div>
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-4 right-4 border-r-2 border-b-2 border-primary w-16 h-16 flex items-end justify-end text-right">
        <div className="mb-1 mr-2">
          ENERGY<br />
          <span className="opacity-50 text-[10px]">98%</span>
        </div>
      </div>

      {/* Central Guidelines */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-[80vw] h-[80vh] border border-primary/30 rounded-full" style={{ borderStyle: 'dashed' }}></div>
        <div className="absolute w-[90vw] h-[1px] bg-primary/20"></div>
        <div className="absolute w-[1px] h-[90vh] bg-primary/20"></div>
      </div>
    </div>
  );
}
