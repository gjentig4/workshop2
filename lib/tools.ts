import { OpenRouterTool } from "./openrouter";

// =============================================================================
// MOCK DATA - Teamleader Focus PoC
// =============================================================================

interface Customer {
  id: string;
  name: string;
  type: "company" | "contact";
  email?: string;
  phone?: string;
  vat?: string;
  city?: string;
}

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "comp_001",
    name: "Solar Systems Belgium",
    type: "company",
    email: "info@solarsystems.be",
    phone: "+32 9 123 45 67",
    vat: "BE0123.456.789",
    city: "Ghent",
  },
  {
    id: "comp_002",
    name: "Green Energy Solutions",
    type: "company",
    email: "contact@greenenergy.eu",
    phone: "+32 2 987 65 43",
    vat: "BE0987.654.321",
    city: "Brussels",
  },
  {
    id: "cont_003",
    name: "Jan De Smet",
    type: "contact",
    email: "jan.desmet@outlook.be",
    phone: "+32 478 12 34 56",
    city: "Antwerp",
  },
  {
    id: "comp_004",
    name: "Bakkerij Van den Berg",
    type: "company",
    email: "info@vandenberg-bakker.be",
    phone: "+32 3 555 12 34",
    vat: "BE0456.789.012",
    city: "Bruges",
  },
  {
    id: "cont_005",
    name: "Marie Claes",
    type: "contact",
    email: "marie.claes@gmail.com",
    phone: "+32 495 67 89 01",
    city: "Leuven",
  },
];

// Simple fuzzy matching - checks if query words appear in name (case-insensitive)
function fuzzyMatch(name: string, query: string): { matches: boolean; score: number } {
  const nameLower = name.toLowerCase();
  const queryLower = query.toLowerCase();
  
  // Exact match
  if (nameLower === queryLower) return { matches: true, score: 1.0 };
  
  // Contains full query
  if (nameLower.includes(queryLower)) return { matches: true, score: 0.9 };
  
  // Check each word in query
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 1);
  const matchedWords = queryWords.filter(word => nameLower.includes(word));
  
  if (matchedWords.length > 0) {
    const score = matchedWords.length / queryWords.length * 0.7;
    return { matches: true, score };
  }
  
  // Levenshtein-ish: check if any word is close (1-2 char difference)
  const nameWords = nameLower.split(/\s+/);
  for (const qWord of queryWords) {
    for (const nWord of nameWords) {
      if (Math.abs(qWord.length - nWord.length) <= 2) {
        let diff = 0;
        const minLen = Math.min(qWord.length, nWord.length);
        for (let i = 0; i < minLen; i++) {
          if (qWord[i] !== nWord[i]) diff++;
        }
        diff += Math.abs(qWord.length - nWord.length);
        if (diff <= 2) return { matches: true, score: 0.5 };
      }
    }
  }
  
  return { matches: false, score: 0 };
}

// =============================================================================
// DEMO TOOLS - Original demo tools
// =============================================================================

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
    // Demo tools
    case "get_current_datetime":
      return getDateTime(args.timezone as string, args.format as string);
    case "get_weather":
      return getWeather(args.location as string, args.units as string);
    
    // Teamleader Focus tools
    case "searchCustomer":
      return searchCustomer(args.query as string);
    case "createDeal":
      return createDeal(args as {
        title: string;
        customer_id: string;
        customer_name: string;
        amount?: number;
        currency?: string;
        pipeline?: string;
        source?: string;
        description?: string;
      });
    
    default:
      return { 
        error: `Unknown tool: ${name}`, 
        availableTools: [...AVAILABLE_TOOLS, ...TEAMLEADER_TOOLS].map(t => t.function.name),
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

// =============================================================================
// TEAMLEADER FOCUS TOOLS - Sales Workflow PoC
// =============================================================================

// Search for customers (companies or contacts) with fuzzy matching
function searchCustomer(query: string) {
  if (!query || query.trim().length === 0) {
    return {
      success: false,
      error: "Search query is required",
      results: [],
    };
  }

  const results = MOCK_CUSTOMERS
    .map(customer => {
      const { matches, score } = fuzzyMatch(customer.name, query);
      return { customer, matches, score };
    })
    .filter(r => r.matches)
    .sort((a, b) => b.score - a.score)
    .map(r => ({
      id: r.customer.id,
      name: r.customer.name,
      type: r.customer.type,
      email: r.customer.email,
      phone: r.customer.phone,
      city: r.customer.city,
      matchScore: Math.round(r.score * 100),
    }));

  return {
    success: true,
    query,
    resultCount: results.length,
    results,
    hint: results.length === 0 
      ? "No customers found. Try a different search term or check the spelling."
      : undefined,
  };
}

// Create a deal - returns structured output for UI integration
function createDeal(params: {
  title: string;
  customer_id: string;
  customer_name: string;
  amount?: number;
  currency?: string;
  pipeline?: string;
  source?: string;
  description?: string;
}) {
  const {
    title,
    customer_id,
    customer_name,
    amount,
    currency = "EUR",
    pipeline = "Sales Pipeline",
    source = "AI Assistant",
    description,
  } = params;

  // Validate required fields
  if (!title || !customer_id || !customer_name) {
    return {
      success: false,
      error: "Missing required fields: title, customer_id, and customer_name are required",
      action: null,
    };
  }

  // Verify customer exists
  const customer = MOCK_CUSTOMERS.find(c => c.id === customer_id);
  if (!customer) {
    return {
      success: false,
      error: `Customer with ID ${customer_id} not found`,
      action: null,
    };
  }

  // Return structured output for frontend to handle
  return {
    success: true,
    action: "openDealDialog",
    message: `Ready to create deal "${title}" for ${customer_name}`,
    prefill: {
      title,
      customer_id,
      customer_name,
      customer_type: customer.type,
      amount: amount ?? null,
      currency,
      pipeline,
      source,
      description: description ?? null,
      // Additional fields the UI might need
      assigned_to: null, // Let user select
      expected_close_date: null, // Let user select
      probability: null, // Based on pipeline phase
    },
    note: "This is a PoC - in production, this would trigger the actual Teamleader Focus deal creation dialog",
  };
}

// Export Teamleader Focus tool definitions
export const TEAMLEADER_TOOLS: OpenRouterTool[] = [
  {
    type: "function",
    function: {
      name: "searchCustomer",
      description: "Search for customers (companies or contacts) in Teamleader Focus by name. Use this when the user mentions a customer, company, or contact name to find their details and ID for creating deals or quotations.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The customer/company/contact name to search for. Supports partial and fuzzy matching.",
          },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "createDeal",
      description: "Create a new deal in Teamleader Focus. Use this when the user wants to create a deal after discussing a potential sale or project. The tool returns structured data that the UI uses to open a pre-filled deal creation dialog.",
      parameters: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "The title/name of the deal, describing the work or sale (e.g., 'Solar Panel Installation', 'Website Redesign')",
          },
          customer_id: {
            type: "string",
            description: "The ID of the customer (from searchCustomer results)",
          },
          customer_name: {
            type: "string",
            description: "The name of the customer for display purposes",
          },
          amount: {
            type: "number",
            description: "The deal amount/value in the specified currency",
          },
          currency: {
            type: "string",
            enum: ["EUR", "USD", "GBP"],
            description: "The currency for the deal amount (default: EUR)",
          },
          description: {
            type: "string",
            description: "Optional description or notes about the deal",
          },
        },
        required: ["title", "customer_id", "customer_name"],
      },
    },
  },
];
