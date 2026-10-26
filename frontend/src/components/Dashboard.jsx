import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents, deleteEvent } from "../api.js";

const fmt = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      setEvents(await getEvents());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (ev) => {
    if (!window.confirm(`Delete "${ev.name}"?`)) return;
    try {
      await deleteEvent(ev._id);
      setEvents((prev) => prev.filter((x) => x._id !== ev._id));
    } catch (e) {
      setError(e.message);
    }
  };

  const total = events.reduce((s, e) => s + (e.totalRegistrations || 0), 0);

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>Events</h1>
          <p className="muted">
            {events.length} event{events.length !== 1 && "s"} · {total} total registrations
          </p>
        </div>
        <Link to="/add" className="btn btn-primary">Add Event</Link>
      </div>

      {error && <div className="alert">{error}</div>}
      {loading && <p className="muted">Loading events...</p>}

      {!loading && events.length === 0 && !error && (
        <div className="empty">
          <h2>No events yet</h2>
          <p>Create your first event to start tracking registrations.</p>
          <Link to="/add" className="btn btn-primary">Add Event</Link>
        </div>
      )}

      {events.length > 0 && (
        <div className="table-wrap">
          <table className="events">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Venue</th>
                <th className="num">Total Registrations</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev._id}>
                  <td data-label="Event ID"><span className="id-chip">{ev.eventId}</span></td>
                  <td data-label="Event Name" className="name-cell">
                    <strong>{ev.name}</strong>
                    <span className="desc">{ev.description}</span>
                  </td>
                  <td data-label="Event Date">{fmt(ev.date)}</td>
                  <td data-label="Venue">{ev.venue}</td>
                  <td data-label="Registrations" className="num">{ev.totalRegistrations}</td>
                  <td className="actions">
                    <Link to={`/edit/${ev._id}`} className="btn btn-ghost">Update</Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(ev)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
