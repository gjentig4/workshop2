"use client";

import { Slider } from "@/components/ui/slider";
import { Thermometer } from "lucide-react";

interface TemperatureSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function TemperatureSlider({
  value,
  onChange,
  disabled = false,
}: TemperatureSliderProps) {
  return (
    <div className={`space-y-3 ${disabled ? "opacity-50" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-zinc-400" />
          <label className="text-sm font-medium text-zinc-300">
            Temperature
          </label>
        </div>
        <span className="text-sm font-mono text-cyan-400">{value.toFixed(1)}</span>
      </div>

      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={0}
        max={2}
        step={0.1}
        disabled={disabled}
        className="w-full"
      />

      <div className="flex justify-between text-xs text-zinc-500">
        <span>Precise</span>
        <span>Creative</span>
      </div>

      {disabled && (
        <p className="text-xs text-amber-400/80">
          Disabled when reasoning is enabled
        </p>
      )}
    </div>
  );
}
