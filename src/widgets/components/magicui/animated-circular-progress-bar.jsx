import { cn } from "@/lib/cn";

export function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className,
}) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percent = ((normalizedValue - min) / (max - min)) * 100;
  const dashArray = `${(percent / 100) * circumference} ${circumference}`;

  return (
    <div className={cn("relative w-40 h-40", className)}>
      <svg width="100" height="100" viewBox="0 0 100 100" className="w-full h-full">
        {/* Fondo gris */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={gaugeSecondaryColor}
          strokeWidth="10"
          fill="none"
        />
        {/* Barra de progreso */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={gaugePrimaryColor}
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={dashArray}
          strokeDashoffset="0"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
        {Math.round(percent)}
      </span>
    </div>
  );
}
