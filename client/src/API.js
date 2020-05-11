import axios from "axios";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:1337"
    : "https://floating-dawn-92174.herokuapp.com";

export const listLogEntries = async () => {
  const response = await fetch(`${API_URL}/api/logs`);
  const data = await response.json();
  return data;
};

export async function createLogEntry(entry) {
  const apiKey = entry.apiKey;
  delete entry.apiKey;
  let data = JSON.stringify(entry);

  const response = axios.post(`${API_URL}/api/logs`, data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },
  });

  /* const response = await axios.post(`${API_URL}/api/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify(entry),
  }); */
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  const error = new Error(json.message);
  error.response = json;
  throw error;
}
