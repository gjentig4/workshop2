import { OpenRouterTool } from "./openrouter";

// Mock tool definitions for Teamleader CRM context
export const AVAILABLE_TOOLS: OpenRouterTool[] = [
  {
    type: "function",
    function: {
      name: "search_help_center",
      description:
        "Search the Teamleader help center for articles matching a query. Returns relevant documentation and guides.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The search query to find relevant help articles",
          },
          limit: {
            type: "number",
            description: "Maximum number of results to return (default: 5)",
          },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_customer",
      description:
        "Retrieve customer information from the CRM by customer ID or email address.",
      parameters: {
        type: "object",
        properties: {
          customer_id: {
            type: "string",
            description: "The unique customer ID",
          },
          email: {
            type: "string",
            description: "The customer's email address",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_ticket",
      description:
        "Create a new support ticket in the system for a customer issue.",
      parameters: {
        type: "object",
        properties: {
          customer_id: {
            type: "string",
            description: "The customer ID to associate the ticket with",
          },
          subject: {
            type: "string",
            description: "The ticket subject/title",
          },
          description: {
            type: "string",
            description: "Detailed description of the issue",
          },
          priority: {
            type: "string",
            enum: ["low", "medium", "high", "urgent"],
            description: "Ticket priority level",
          },
        },
        required: ["customer_id", "subject", "description"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get current weather information for a city or location.",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "City name (e.g., 'Prishtina, Kosovo' or 'Brussels, Belgium')",
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
  {
    type: "function",
    function: {
      name: "calculate",
      description: "Perform a mathematical calculation.",
      parameters: {
        type: "object",
        properties: {
          expression: {
            type: "string",
            description: "Mathematical expression to evaluate (e.g., '2 + 2', '15 * 7', 'sqrt(144)')",
          },
        },
        required: ["expression"],
      },
    },
  },
];

// Mock tool execution - in production these would call actual APIs
export function executeTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  console.log(`Executing tool: ${name}`, args);
  
  switch (name) {
    case "search_help_center":
      return mockSearchHelpCenter(args.query as string, args.limit as number);
    case "get_customer":
      return mockGetCustomer(args.customer_id as string, args.email as string);
    case "create_ticket":
      return mockCreateTicket(
        args.customer_id as string,
        args.subject as string,
        args.description as string,
        args.priority as string
      );
    case "get_weather":
      return mockGetWeather(args.location as string, args.units as string);
    case "calculate":
      return mockCalculate(args.expression as string);
    default:
      return { error: `Unknown tool: ${name}`, availableTools: AVAILABLE_TOOLS.map(t => t.function.name) };
  }
}

function mockSearchHelpCenter(query: string, limit: number = 5) {
  // Mock help center results based on query
  const allArticles = [
    {
      id: "hc-001",
      title: "Getting Started with Teamleader",
      excerpt: "Learn the basics of setting up your Teamleader account. This guide covers initial configuration, user setup, and essential first steps.",
      url: "https://support.teamleader.eu/getting-started",
      relevance: 0.95,
    },
    {
      id: "hc-002",
      title: "Managing Customer Contacts",
      excerpt: "How to add, edit, and organize your customer database. Learn about contact fields, custom properties, and segmentation.",
      url: "https://support.teamleader.eu/contacts",
      relevance: 0.87,
    },
    {
      id: "hc-003",
      title: "Creating and Sending Invoices",
      excerpt: "Step-by-step guide to invoicing in Teamleader. Covers invoice creation, templates, payment tracking, and reminders.",
      url: "https://support.teamleader.eu/invoices",
      relevance: 0.82,
    },
    {
      id: "hc-004",
      title: "Project Management Features",
      excerpt: "Track projects, milestones, and time entries. Learn about project budgeting and team collaboration features.",
      url: "https://support.teamleader.eu/projects",
      relevance: 0.78,
    },
    {
      id: "hc-005",
      title: "API Integration Guide",
      excerpt: "Connect Teamleader with other tools using our REST API. Includes authentication, rate limits, and common endpoints.",
      url: "https://support.teamleader.eu/api",
      relevance: 0.75,
    },
  ];

  // Simple relevance scoring based on query
  const queryLower = query.toLowerCase();
  const results = allArticles
    .map(article => ({
      ...article,
      relevance: article.title.toLowerCase().includes(queryLower) 
        ? 0.95 
        : article.excerpt.toLowerCase().includes(queryLower) 
          ? 0.85 
          : article.relevance * 0.7,
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit);

  return {
    query,
    results,
    totalResults: results.length,
    message: `Found ${results.length} help articles matching "${query}"`,
  };
}

function mockGetCustomer(customerId?: string, email?: string) {
  if (!customerId && !email) {
    return { error: "Either customer_id or email is required" };
  }

  // Return different mock customers based on input
  const mockCustomers: Record<string, object> = {
    default: {
      id: customerId || "cust-12345",
      name: "Acme Corporation",
      email: email || "contact@acme.com",
      phone: "+32 2 123 45 67",
      address: "Rue de la Loi 200, 1000 Brussels, Belgium",
      company_type: "B2B",
      industry: "Technology",
      created_at: "2024-01-15T10:30:00Z",
      total_invoices: 12,
      total_revenue: 45000.0,
      currency: "EUR",
      status: "active",
      assigned_to: "Jan Peeters",
      last_contact: "2025-01-10T14:22:00Z",
      tags: ["premium", "enterprise"],
    },
  };

  return {
    success: true,
    customer: mockCustomers.default,
    message: "Customer found successfully",
  };
}

function mockCreateTicket(
  customerId: string,
  subject: string,
  description: string,
  priority: string = "medium"
) {
  const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}`;

  return {
    success: true,
    ticket: {
      id: ticketId,
      customer_id: customerId,
      subject,
      description,
      priority,
      status: "open",
      created_at: new Date().toISOString(),
      assigned_to: null,
      estimated_response_time: priority === "urgent" ? "1 hour" : priority === "high" ? "4 hours" : "24 hours",
    },
    message: `Support ticket ${ticketId} created successfully. Priority: ${priority}. Expected response within ${priority === "urgent" ? "1 hour" : priority === "high" ? "4 hours" : "24 hours"}.`,
  };
}

function mockGetWeather(location: string, units: string = "celsius") {
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
  };

  const locationLower = location.toLowerCase();
  const matchedCity = Object.keys(weatherData).find(city => locationLower.includes(city));
  
  if (!matchedCity) {
    // Return generic weather for unknown locations
    const weather = { temp: 15, condition: "Clear", humidity: 60, wind: 10 };
    const tempDisplay = units === "fahrenheit" ? `${Math.round(weather.temp * 9/5 + 32)}°F` : `${weather.temp}°C`;
    
    return {
      location,
      temperature: tempDisplay,
      condition: weather.condition,
      humidity: `${weather.humidity}%`,
      wind_speed: `${weather.wind} km/h`,
      units,
      timestamp: new Date().toISOString(),
      note: "Weather data is simulated for demonstration purposes",
    };
  }

  const weather = weatherData[matchedCity];
  const tempDisplay = units === "fahrenheit" ? `${Math.round(weather.temp * 9/5 + 32)}°F` : `${weather.temp}°C`;

  return {
    location,
    temperature: tempDisplay,
    condition: weather.condition,
    humidity: `${weather.humidity}%`,
    wind_speed: `${weather.wind} km/h`,
    units: units || "celsius",
    timestamp: new Date().toISOString(),
    forecast: "Expected to remain similar for the next few hours",
    note: "Weather data is simulated for demonstration purposes",
  };
}

function mockCalculate(expression: string) {
  try {
    // Safe evaluation of basic math expressions
    // Replace common math functions
    let expr = expression
      .replace(/sqrt\(([^)]+)\)/gi, "Math.sqrt($1)")
      .replace(/pow\(([^,]+),([^)]+)\)/gi, "Math.pow($1,$2)")
      .replace(/sin\(([^)]+)\)/gi, "Math.sin($1)")
      .replace(/cos\(([^)]+)\)/gi, "Math.cos($1)")
      .replace(/tan\(([^)]+)\)/gi, "Math.tan($1)")
      .replace(/log\(([^)]+)\)/gi, "Math.log10($1)")
      .replace(/ln\(([^)]+)\)/gi, "Math.log($1)")
      .replace(/abs\(([^)]+)\)/gi, "Math.abs($1)")
      .replace(/pi/gi, "Math.PI")
      .replace(/e(?![xp])/gi, "Math.E");

    // Only allow safe characters
    if (!/^[\d\s+\-*/().Math,sqrtpowsincoantlgbPIE]+$/.test(expr)) {
      return { error: "Invalid characters in expression", expression };
    }

    // eslint-disable-next-line no-eval
    const result = eval(expr);
    
    return {
      expression,
      result: typeof result === "number" ? (Number.isInteger(result) ? result : parseFloat(result.toFixed(10))) : result,
      success: true,
    };
  } catch (error) {
    return {
      expression,
      error: "Could not evaluate expression",
      details: error instanceof Error ? error.message : "Unknown error",
      success: false,
    };
  }
}
