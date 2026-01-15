import { OpenRouterTool } from "./openrouter";

// Demo tool definitions - simple working tools for testing
export const AVAILABLE_TOOLS: OpenRouterTool[] = [
  {
    type: "function",
    function: {
      name: "get_current_datetime",
      description: "Get the current date and time. Use this when the user asks about the current date, time, day of the week, or anything time-related.",
      parameters: {
        type: "object",
        properties: {
          timezone: {
            type: "string",
            description: "Timezone (e.g., 'Europe/Brussels', 'America/New_York'). Defaults to UTC if not specified.",
          },
          format: {
            type: "string",
            enum: ["full", "date_only", "time_only"],
            description: "Output format. 'full' includes date and time, 'date_only' just the date, 'time_only' just the time.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get current weather information for a city or location. Returns temperature, conditions, humidity, and wind speed.",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "City name (e.g., 'Prishtina, Kosovo', 'Brussels, Belgium', 'New York')",
          },
          units: {
            type: "string",
            enum: ["celsius", "fahrenheit"],
            description: "Temperature units (default: celsius)",
          },
        },
        required: ["location"],
      },
    },
  },
];

// Tool execution - returns mock data for demo purposes
export function executeTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  console.log(`Executing tool: ${name}`, args);
  
  switch (name) {
    case "get_current_datetime":
      return getDateTime(args.timezone as string, args.format as string);
    case "get_weather":
      return getWeather(args.location as string, args.units as string);
    default:
      return { 
        error: `Unknown tool: ${name}`, 
        availableTools: AVAILABLE_TOOLS.map(t => t.function.name),
        hint: "Make sure the tool name matches exactly"
      };
  }
}

// Get current date/time - returns REAL time
function getDateTime(timezone?: string, format?: string) {
  const tz = timezone || "UTC";
  const now = new Date();
  
  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: tz,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const dateFormatter = new Intl.DateTimeFormat("en-US", options);
    const parts = dateFormatter.formatToParts(now);
    
    const getPart = (type: string) => parts.find(p => p.type === type)?.value || "";
    
    const fullDate = `${getPart("weekday")}, ${getPart("month")} ${getPart("day")}, ${getPart("year")}`;
    const fullTime = `${getPart("hour")}:${getPart("minute")}:${getPart("second")}`;

    if (format === "date_only") {
      return {
        date: fullDate,
        timezone: tz,
        iso: now.toISOString().split("T")[0],
      };
    }
    
    if (format === "time_only") {
      return {
        time: fullTime,
        timezone: tz,
      };
    }

    return {
      datetime: `${fullDate} at ${fullTime}`,
      date: fullDate,
      time: fullTime,
      timezone: tz,
      iso: now.toISOString(),
      unix_timestamp: Math.floor(now.getTime() / 1000),
    };
  } catch {
    // Fallback if timezone is invalid
    return {
      datetime: now.toUTCString(),
      timezone: "UTC (fallback - invalid timezone provided)",
      iso: now.toISOString(),
      unix_timestamp: Math.floor(now.getTime() / 1000),
    };
  }
}

// Get weather - returns MOCK data for demo
function getWeather(location: string, units: string = "celsius") {
  // Mock weather data for various cities
  const weatherData: Record<string, { temp: number; condition: string; humidity: number; wind: number }> = {
    "prishtina": { temp: 2, condition: "Partly cloudy", humidity: 75, wind: 12 },
    "pristina": { temp: 2, condition: "Partly cloudy", humidity: 75, wind: 12 },
    "kosovo": { temp: 2, condition: "Partly cloudy", humidity: 75, wind: 12 },
    "brussels": { temp: 7, condition: "Overcast", humidity: 82, wind: 18 },
    "belgium": { temp: 7, condition: "Overcast", humidity: 82, wind: 18 },
    "ghent": { temp: 6, condition: "Light rain", humidity: 88, wind: 22 },
    "antwerp": { temp: 7, condition: "Cloudy", humidity: 80, wind: 15 },
    "london": { temp: 9, condition: "Rainy", humidity: 85, wind: 20 },
    "paris": { temp: 10, condition: "Sunny", humidity: 65, wind: 10 },
    "amsterdam": { temp: 5, condition: "Windy", humidity: 78, wind: 28 },
    "berlin": { temp: 3, condition: "Snowy", humidity: 90, wind: 8 },
    "new york": { temp: 4, condition: "Clear", humidity: 55, wind: 12 },
    "tokyo": { temp: 12, condition: "Clear", humidity: 45, wind: 8 },
    "sydney": { temp: 28, condition: "Sunny", humidity: 55, wind: 15 },
  };

  const locationLower = location.toLowerCase();
  const matchedCity = Object.keys(weatherData).find(city => locationLower.includes(city));
  
  // Use matched city data or generate random-ish data for unknown locations
  const weather = matchedCity 
    ? weatherData[matchedCity] 
    : { temp: 15 + Math.floor(Math.random() * 10), condition: "Clear", humidity: 60, wind: 10 };
  
  const tempCelsius = weather.temp;
  const tempFahrenheit = Math.round(tempCelsius * 9/5 + 32);
  const tempDisplay = units === "fahrenheit" ? `${tempFahrenheit}°F` : `${tempCelsius}°C`;

  return {
    location,
    temperature: tempDisplay,
    temperature_celsius: tempCelsius,
    temperature_fahrenheit: tempFahrenheit,
    condition: weather.condition,
    humidity: `${weather.humidity}%`,
    wind_speed: `${weather.wind} km/h`,
    units: units || "celsius",
    timestamp: new Date().toISOString(),
    note: "⚠️ This is simulated weather data for demonstration purposes",
  };
}
