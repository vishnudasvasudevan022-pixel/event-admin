const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const getEvents = () => request("/events");
export const getEvent = (id) => request(`/events/${id}`);
export const createEvent = (body) =>
  request("/events", { method: "POST", body: JSON.stringify(body) });
export const updateEvent = (id, body) =>
  request(`/events/${id}`, { method: "PUT", body: JSON.stringify(body) });
export const deleteEvent = (id) => request(`/events/${id}`, { method: "DELETE" });
