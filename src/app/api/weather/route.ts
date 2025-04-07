import { NextRequest, NextResponse } from "next/server";

interface WorkflowResult {
  step: string;
  content: string;
}

interface WikipediaPage {
  extract?: string;
}

interface WikipediaResponse {
  query: {
    pages: {
      [key: string]: WikipediaPage;
    };
  };
}

async function callOllama(prompt: string): Promise<string> {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3.2",
      prompt: prompt,
      stream: false,
    }),
  });

  const data = await response.json();
  return data.response;
}

async function getWeather(location: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m`
    );
    const data = await response.json();
    return `Current weather in ${location}: Temperature ${data.current.temperature_2m}°C, Wind Speed ${data.current.wind_speed_10m} km/h`;
  } catch {
    return `Weather data unavailable for ${location}`;
  }
}

async function getWikipediaInfo(location: string): Promise<string> {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&explaintext=1&titles=${encodeURIComponent(
        location
      )}`
    );
    const data = (await response.json()) as WikipediaResponse;
    const pages = Object.values(data.query.pages);
    const page = pages[0] as WikipediaPage;
    return page?.extract || `No Wikipedia information found for ${location}`;
  } catch {
    return `Wikipedia information unavailable for ${location}`;
  }
}

export async function POST(req: NextRequest) {
  const { location } = await req.json();
  const results: WorkflowResult[] = [];

  try {
    // Get weather information
    const weatherInfo = await getWeather(location);
    results.push({
      step: "2",
      content: weatherInfo,
    });

    // Get Wikipedia information
    const wikiInfo = await getWikipediaInfo(location);
    results.push({
      step: "3",
      content: wikiInfo,
    });

    // Get fun facts
    const funFactsPrompt = `Tell me 3 unique and interesting facts about ${location}. Make them specific to the city, not general facts. Include surprising or unusual information that most people wouldn't know. Format each fact with a bullet point and keep them concise.`;
    const funFactsResponse = await callOllama(funFactsPrompt);
    results.push({
      step: "4",
      content: funFactsResponse,
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
