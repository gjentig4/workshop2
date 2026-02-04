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
        customer_id?: string;
        customer_name?: string;
        amount?: number;
        currency?: string;
        pipeline?: string;
        source?: string;
        description?: string;
      });
    case "createContact":
      return createContact(args as {
        first_name?: string;
        surname: string;
        email?: string;
        phone?: string;
        mobile?: string;
        language?: string;
        gender?: string;
        date_of_birth?: string;
        job_title?: string;
        remarks?: string;
        tags?: string[];
        linked_company_id?: string;
        linked_company_name?: string;
        marketing_opt_in?: boolean;
      });
    case "createCompany":
      return createCompany(args as {
        company_name: string;
        vat_number?: string;
        kvk_number?: string;
        siret_number?: string;
        email?: string;
        phone?: string;
        fax?: string;
        website?: string;
        country?: string;
        street?: string;
        street_number?: string;
        zip_code?: string;
        city?: string;
        province?: string;
        language?: string;
        account_manager?: string;
        tags?: string[];
        marketing_opt_in?: boolean;
        iban?: string;
        bic_swift?: string;
        vat_liability?: string;
        pricelist?: string;
        remarks?: string;
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

// Detect if a name looks like a company (LLC, Inc, Corp, BV, NV, etc.)
function looksLikeCompany(name: string): boolean {
  const companyIndicators = [
    /\bllc\b/i, /\binc\b/i, /\bcorp\b/i, /\bcorporation\b/i,
    /\bbv\b/i, /\bnv\b/i, /\bsa\b/i, /\bgmbh\b/i, /\bag\b/i,
    /\bltd\b/i, /\blimited\b/i, /\bplc\b/i, /\bptyltd\b/i,
    /\bsprl\b/i, /\bsrl\b/i, /\bsarl\b/i, /\beurl\b/i,
    /\bvof\b/i, /\bcv\b/i, /\bvzw\b/i, /\basbl\b/i,
    /\bcompany\b/i, /\benterprises?\b/i, /\bsolutions?\b/i,
    /\bservices?\b/i, /\bgroup\b/i, /\bholdings?\b/i,
    /\bindustries\b/i, /\bsystems?\b/i, /\btechnolog/i,
  ];
  return companyIndicators.some(regex => regex.test(name));
}

// Search for customers (companies or contacts) with fuzzy matching
function searchCustomer(query: string) {
  if (!query || query.trim().length === 0) {
    return {
      success: false,
      error: "Search query is required",
      results: [],
      queryLooksLikeCompany: false,
    };
  }

  const CONFIDENCE_THRESHOLD = 75; // Minimum % to consider a "found" match
  const CLOSE_MATCH_DELTA = 5; // If two results are within 5%, ask for clarification

  const allMatches = MOCK_CUSTOMERS
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

  // Filter to only those above threshold
  const confidentMatches = allMatches.filter(r => r.matchScore >= CONFIDENCE_THRESHOLD);
  
  // Check if we need clarification (multiple close matches)
  let needsClarification = false;
  if (confidentMatches.length >= 2) {
    const scoreDiff = confidentMatches[0].matchScore - confidentMatches[1].matchScore;
    if (scoreDiff <= CLOSE_MATCH_DELTA) {
      needsClarification = true;
    }
  }

  // Detect if query looks like a company name
  const queryLooksLikeCompany = looksLikeCompany(query);

  // Determine result status
  let status: "found" | "not_found" | "needs_clarification";
  let hint: string | undefined;

  if (confidentMatches.length === 0) {
    status = "not_found";
    hint = `No customer found matching "${query}" with confidence ≥${CONFIDENCE_THRESHOLD}%. User should create a new customer or check the spelling.`;
  } else if (needsClarification) {
    status = "needs_clarification";
    hint = `Multiple customers match "${query}" with similar confidence. Ask the user to clarify which one is correct.`;
  } else {
    status = "found";
    hint = `Found ${confidentMatches[0].name} with ${confidentMatches[0].matchScore}% confidence.`;
  }

  return {
    success: true,
    query,
    status,
    queryLooksLikeCompany,
    confidenceThreshold: CONFIDENCE_THRESHOLD,
    resultCount: confidentMatches.length,
    results: confidentMatches,
    // Include low-confidence matches for context (but clearly marked)
    lowConfidenceMatches: allMatches.filter(r => r.matchScore < CONFIDENCE_THRESHOLD),
    hint,
  };
}

// Create a deal - returns structured output for UI integration
function createDeal(params: {
  title: string;
  customer_id?: string;
  customer_name?: string;
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
  if (!title) {
    return {
      success: false,
      error: "Missing required field: title is required",
      action: null,
    };
  }

  // If customer_id provided, verify it exists
  let customerType: "company" | "contact" | null = null;
  if (customer_id) {
    const customer = MOCK_CUSTOMERS.find(c => c.id === customer_id);
    if (customer) {
      customerType = customer.type;
    }
  }

  // Return structured output for frontend to handle
  // Supports both with-customer and without-customer (quick contact) flows
  return {
    success: true,
    action: "openDealDialog",
    message: customer_name 
      ? `Ready to create deal "${title}" for ${customer_name}`
      : `Ready to create deal "${title}" (customer can be added in the deal dialog)`,
    prefill: {
      title,
      customer_id: customer_id ?? null,
      customer_name: customer_name ?? null,
      customer_type: customerType,
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
    note: customer_id 
      ? "This is a PoC - in production, this would trigger the actual Teamleader Focus deal creation dialog"
      : "No customer linked - user can create a quick contact directly in the deal dialog",
  };
}

// Create a contact - returns structured output for UI integration
function createContact(params: {
  first_name?: string;
  surname: string;
  email?: string;
  phone?: string;
  mobile?: string;
  language?: string;
  gender?: string;
  date_of_birth?: string;
  job_title?: string;
  remarks?: string;
  tags?: string[];
  linked_company_id?: string;
  linked_company_name?: string;
  marketing_opt_in?: boolean;
}) {
  const { surname, first_name, ...optionalFields } = params;

  // Validate required fields
  if (!surname || surname.trim() === "") {
    return {
      success: false,
      error: "Missing required field: surname is required",
      action: null,
    };
  }

  const displayName = first_name ? `${first_name} ${surname}` : surname;

  // Return structured output for frontend to handle
  return {
    success: true,
    action: "openContactDialog",
    message: `Ready to create contact "${displayName}"`,
    prefill: {
      first_name: first_name ?? null,
      surname,
      email: optionalFields.email ?? null,
      phone: optionalFields.phone ?? null,
      mobile: optionalFields.mobile ?? null,
      language: optionalFields.language ?? "English",
      gender: optionalFields.gender ?? null,
      date_of_birth: optionalFields.date_of_birth ?? null,
      job_title: optionalFields.job_title ?? null,
      remarks: optionalFields.remarks ?? null,
      tags: optionalFields.tags ?? [],
      linked_company_id: optionalFields.linked_company_id ?? null,
      linked_company_name: optionalFields.linked_company_name ?? null,
      marketing_opt_in: optionalFields.marketing_opt_in ?? false,
    },
    note: "This is a PoC - in production, this would trigger the actual Teamleader Focus contact creation dialog",
  };
}

// Create a company - returns structured output for UI integration
function createCompany(params: {
  company_name: string;
  // Company lookup - if provided, would trigger autofill in production
  vat_number?: string;
  kvk_number?: string;
  siret_number?: string;
  // Contact info
  email?: string;
  phone?: string;
  fax?: string;
  website?: string;
  // Address
  country?: string;
  street?: string;
  street_number?: string;
  zip_code?: string;
  city?: string;
  province?: string;
  // Additional info
  language?: string;
  account_manager?: string;
  tags?: string[];
  marketing_opt_in?: boolean;
  // Financial & Industry
  iban?: string;
  bic_swift?: string;
  vat_liability?: string;
  pricelist?: string;
  remarks?: string;
}) {
  const { company_name, ...optionalFields } = params;

  // Validate required fields
  if (!company_name || company_name.trim() === "") {
    return {
      success: false,
      error: "Missing required field: company_name is required",
      action: null,
    };
  }

  // Return structured output for frontend to handle
  return {
    success: true,
    action: "openCompanyDialog",
    message: `Ready to create company "${company_name}"`,
    prefill: {
      company_name,
      // Company lookup fields
      vat_number: optionalFields.vat_number ?? null,
      kvk_number: optionalFields.kvk_number ?? null,
      siret_number: optionalFields.siret_number ?? null,
      // Contact info
      email: optionalFields.email ?? null,
      phone: optionalFields.phone ?? null,
      fax: optionalFields.fax ?? null,
      website: optionalFields.website ?? null,
      // Address
      country: optionalFields.country ?? null,
      street: optionalFields.street ?? null,
      street_number: optionalFields.street_number ?? null,
      zip_code: optionalFields.zip_code ?? null,
      city: optionalFields.city ?? null,
      province: optionalFields.province ?? null,
      // Additional info
      language: optionalFields.language ?? "English",
      account_manager: optionalFields.account_manager ?? null,
      tags: optionalFields.tags ?? [],
      marketing_opt_in: optionalFields.marketing_opt_in ?? false,
      // Financial & Industry
      iban: optionalFields.iban ?? null,
      bic_swift: optionalFields.bic_swift ?? null,
      vat_liability: optionalFields.vat_liability ?? "Other EU member state",
      pricelist: optionalFields.pricelist ?? null,
      remarks: optionalFields.remarks ?? null,
    },
    note: optionalFields.vat_number || optionalFields.kvk_number || optionalFields.siret_number
      ? "VAT/KVK/SIRET provided - in production, this would trigger autofill of company details"
      : "This is a PoC - in production, this would trigger the actual Teamleader Focus company creation dialog",
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
      description: "Create a new deal in Teamleader Focus. Use this when the user wants to create a deal after discussing a potential sale or project. The tool returns structured data that the UI uses to open a pre-filled deal creation dialog. Can be used with or without an existing customer - if no customer is linked, the user can create a quick contact in the deal dialog.",
      parameters: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "The title/name of the deal, describing the work or sale (e.g., 'Solar Panel Installation', 'Website Redesign')",
          },
          customer_id: {
            type: "string",
            description: "The ID of the customer (from searchCustomer results). Optional - can create deal without customer.",
          },
          customer_name: {
            type: "string",
            description: "The name of the customer for display purposes. Optional if creating deal without customer.",
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
        required: ["title"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "createContact",
      description: "Create a new contact (person) in Teamleader Focus. Use this when the customer is not found and the user wants to create a new individual contact. Only surname is required.",
      parameters: {
        type: "object",
        properties: {
          first_name: {
            type: "string",
            description: "The contact's first name",
          },
          surname: {
            type: "string",
            description: "The contact's surname/last name (required)",
          },
          email: {
            type: "string",
            description: "Email address",
          },
          phone: {
            type: "string",
            description: "Phone number",
          },
          mobile: {
            type: "string",
            description: "Mobile phone number",
          },
          language: {
            type: "string",
            description: "Preferred language (e.g., 'English', 'Dutch', 'French')",
          },
          gender: {
            type: "string",
            enum: ["male", "female", "other"],
            description: "Gender",
          },
          date_of_birth: {
            type: "string",
            description: "Date of birth (YYYY-MM-DD format)",
          },
          job_title: {
            type: "string",
            description: "Job title or position",
          },
          remarks: {
            type: "string",
            description: "Additional notes or remarks",
          },
          tags: {
            type: "array",
            items: { type: "string" },
            description: "Tags to categorize the contact",
          },
          linked_company_id: {
            type: "string",
            description: "ID of a company to link this contact to",
          },
          linked_company_name: {
            type: "string",
            description: "Name of the linked company for display",
          },
          marketing_opt_in: {
            type: "boolean",
            description: "Whether the contact has opted in for marketing emails",
          },
        },
        required: ["surname"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "createCompany",
      description: "Create a new company in Teamleader Focus. Use this when the customer is not found and the user wants to create a new company/business. Only company_name is required. If VAT/KVK/SIRET number is provided, it would autofill other company details in production.",
      parameters: {
        type: "object",
        properties: {
          company_name: {
            type: "string",
            description: "The company name (required)",
          },
          vat_number: {
            type: "string",
            description: "VAT number - if provided, triggers autofill in production (e.g., 'BE0123.456.789')",
          },
          kvk_number: {
            type: "string",
            description: "KVK number (Netherlands Chamber of Commerce)",
          },
          siret_number: {
            type: "string",
            description: "SIRET number (France)",
          },
          email: {
            type: "string",
            description: "Company email address",
          },
          phone: {
            type: "string",
            description: "Company phone number",
          },
          fax: {
            type: "string",
            description: "Fax number",
          },
          website: {
            type: "string",
            description: "Company website URL",
          },
          country: {
            type: "string",
            description: "Country (e.g., 'Belgium', 'Netherlands', 'France')",
          },
          street: {
            type: "string",
            description: "Street name",
          },
          street_number: {
            type: "string",
            description: "Street/house number",
          },
          zip_code: {
            type: "string",
            description: "Postal/ZIP code",
          },
          city: {
            type: "string",
            description: "City name",
          },
          province: {
            type: "string",
            description: "Province or state",
          },
          language: {
            type: "string",
            description: "Preferred language (e.g., 'English', 'Dutch', 'French')",
          },
          account_manager: {
            type: "string",
            description: "Account manager name or ID",
          },
          tags: {
            type: "array",
            items: { type: "string" },
            description: "Tags to categorize the company",
          },
          marketing_opt_in: {
            type: "boolean",
            description: "Whether the company has opted in for marketing emails",
          },
          iban: {
            type: "string",
            description: "IBAN account number",
          },
          bic_swift: {
            type: "string",
            description: "BIC/SWIFT code",
          },
          vat_liability: {
            type: "string",
            description: "VAT liability status",
          },
          pricelist: {
            type: "string",
            description: "Assigned pricelist",
          },
          remarks: {
            type: "string",
            description: "Additional notes or remarks",
          },
        },
        required: ["company_name"],
      },
    },
  },
];
