import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEvent, getEvent, updateEvent } from "../api.js";

const empty = { name: "", description: "", date: "", venue: "", totalRegistrations: 0 };

export default function EventForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editing) {
      setForm(empty);
      return;
    }
    getEvent(id)
      .then((ev) =>
        setForm({
          name: ev.name,
          description: ev.description,
          date: ev.date.slice(0, 10),
          venue: ev.venue,
          totalRegistrations: ev.totalRegistrations,
        })
      )
      .catch((e) => setError(e.message));
  }, [id, editing]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form, totalRegistrations: Number(form.totalRegistrations) || 0 };
      if (editing) await updateEvent(id, payload);
      else await createEvent(payload);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <section className="form-card">
      <h1>{editing ? "Update Event" : "Add Event"}</h1>
      <p className="muted">
        {editing ? "Change the details below and save." : "Fill in the details to create a new event."}
      </p>

      {error && <div className="alert">{error}</div>}

      <form onSubmit={onSubmit}>
        <label>
          Event Name
          <input name="name" value={form.name} onChange={onChange} required placeholder="Tech Fest 2026" />
        </label>
        <label>
          Event Description
          <textarea name="description" rows="4" value={form.description} onChange={onChange} required placeholder="What is this event about?" />
        </label>
        <div className="row">
          <label>
            Event Date
            <input type="date" name="date" value={form.date} onChange={onChange} required />
          </label>
          <label>
            Venue
            <input name="venue" value={form.venue} onChange={onChange} required placeholder="Main Auditorium" />
          </label>
        </div>
        {editing && (
          <label>
            Total Registrations
            <input type="number" min="0" name="totalRegistrations" value={form.totalRegistrations} onChange={onChange} />
          </label>
        )}
        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={() => navigate("/")}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : editing ? "Save changes" : "Add Event"}
          </button>
        </div>
      </form>
    </section>
  );
}
