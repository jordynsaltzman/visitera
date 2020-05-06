import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from "./API";

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      console.log(created);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3>{error}</h3> : null}
      <div className="title-section">
        <input
          name="apiKey"
          type="password"
          placeholder="Placeholder"
          autoComplete="off"
          ref={register}
          required
        />
        <label htmlFor="apiKey">API KEY</label>
      </div>
      <div className="title-section">
        <input
          name="title"
          placeholder="Placeholder"
          autoComplete="off"
          ref={register}
          required
        />
        <label htmlFor="title">Title</label>
      </div>
      <div className="description-section">
        <input
          name="description"
          placeholder="Placeholder"
          autoComplete="off"
          ref={register}
        />
        <label htmlFor="description">Description</label>
      </div>
      <div className="comments-section">
        <input
          name="comments"
          rows={3}
          placeholder="Placeholder"
          autoComplete="off"
          ref={register}
        />
        <label htmlFor="comments">Comments</label>
      </div>
      <div className="image-section">
        <input
          name="image"
          placeholder="Placeholder"
          autoComplete="off"
          ref={register}
        />
        <label htmlFor="image">Image URL</label>
      </div>
      <div className="date-section">
        <input
          name="visitDate"
          type="date"
          className="visit-date-input"
          placeholder="Placeholder"
          ref={register}
          required
        />
        <label htmlFor="visitDate" className="visit-date-label">
          Visit Date
        </label>
        <div className="button-div">
          <button className="icon-btn add-btn" type="submit">
            <div className="add-icon"></div>
            <div className="btn-txt">{loading ? "Loading..." : "Add"}</div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default LogEntryForm;
