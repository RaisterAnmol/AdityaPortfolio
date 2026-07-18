import React, { useEffect, useState, useRef } from 'react';
import { FiClock, FiActivity, FiGitCommit } from 'react-icons/fi';

export default function Widgets() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const canvasRef = useRef(null);
  const [cpuUsage, setCpuUsage] = useState(24);

  // 1. Clock updates
  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const d = new Date();
      setTime(new Intl.DateTimeFormat('en-US', options).format(d));
      setDate(d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. CPU load simulator & Canvas line wave graph animation (HUD style)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;
    let dataPoints = Array(20).fill(20);

    const drawGraph = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#00FF99';
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      // Shift data points and add new simulated CPU utilization
      dataPoints.shift();
      const noise = Math.sin(Date.now() / 2000) * 8 + Math.random() * 6;
      const currentVal = Math.min(Math.max(Math.floor(25 + noise), 10), 99);
      setCpuUsage(currentVal);
      dataPoints.push(currentVal);

      // Render line graph
      const step = canvas.width / (dataPoints.length - 1);
      dataPoints.forEach((val, idx) => {
        const x = idx * step;
        const y = canvas.height - (val / 100) * canvas.height * 0.8 - 5;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      animFrame = requestAnimationFrame(drawGraph);
    };

    drawGraph();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Mock GitHub grid values
  const mockContributions = Array.from({ length: 48 }, () => Math.floor(Math.random() * 4));

  return (
    <div className="absolute top-16 right-6 w-72 space-y-6 pointer-events-auto select-none hidden lg:block z-10">
      {/* HUD Clock Widget */}
      <div className="glassmorphism rounded-2xl p-5 border border-white/5 space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-color)] tracking-wider">
          <FiClock />
          <span>TIME_MODULE</span>
        </div>
        <div className="space-y-0.5">
          <div className="text-4xl font-bold font-mono text-white tracking-widest tabular-nums">
            {time}
          </div>
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest pl-0.5">
            {date} // GMT+5:30
          </div>
        </div>
      </div>

      {/* System Monitor Wave Widget */}
      <div className="glassmorphism rounded-2xl p-5 border border-white/5 space-y-3">
        <div className="flex justify-between items-center text-xs font-mono tracking-wider">
          <div className="flex items-center gap-2 text-[var(--accent-color)]">
            <FiActivity className="animate-pulse" />
            <span>SYS_CORE_LOAD</span>
          </div>
          <span className="text-white font-bold tabular-nums">{cpuUsage}%</span>
        </div>
        <canvas ref={canvasRef} width="240" height="50" className="w-full h-[50px] opacity-75" />
      </div>

      {/* GitHub Commit Widget */}
      <div className="glassmorphism rounded-2xl p-5 border border-white/5 space-y-3">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--accent-color)] tracking-wider">
          <div className="flex items-center gap-2">
            <FiGitCommit />
            <span>COMMIT_MATRIX</span>
          </div>
          <span className="text-neutral-400 text-[10px]">STREAK: 216D</span>
        </div>
        
        {/* Contributions Grid */}
        <div className="grid grid-cols-8 gap-1.5 pt-1">
          {mockContributions.map((lvl, idx) => (
            <div
              key={idx}
              className="w-5.5 h-5.5 rounded-sm transition-colors duration-500"
              style={{
                backgroundColor: lvl === 3 
                  ? 'var(--accent-color)' 
                  : lvl === 2 
                    ? 'rgba(0, 255, 153, 0.5)' 
                    : lvl === 1 
                      ? 'rgba(0, 255, 153, 0.2)' 
                      : 'rgba(255, 255, 255, 0.03)',
                boxShadow: lvl === 3 ? '0 0 8px var(--glow-color)' : 'none'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
