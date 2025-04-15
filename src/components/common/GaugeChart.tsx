import React from "react";

interface CircularGaugeProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
}

const CircularGauge: React.FC<CircularGaugeProps> = ({
  percentage,
  size = 150,
  strokeWidth = 12,
  trackColor = "#ddd",
  progressColor = "#007bff", 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (Math.round(percentage * 100) / 100 / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        {percentage.toFixed(2)}%
      </div>
    </div>
  );
};

export default CircularGauge;
