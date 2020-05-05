import React from "react";

const LogEntryForm = () => {
  return (
    <form className="entry-form">
      <div className="title-section">
        <input name="title" placeholder="Placeholder" />
        <label htmlFor="title" required>
          Title
        </label>
      </div>
      <div className="description-section">
        <input name="description" placeholder="Placeholder" />
        <label htmlFor="description">Description</label>
      </div>
      <div className="comments-section">
        <input name="comments" rows={3} placeholder="Placeholder" />
        <label htmlFor="comments">Comments</label>
      </div>
      <div className="image-section">
        <input name="image" placeholder="Placeholder" />
        <label htmlFor="image">Image URL</label>
      </div>
      <div className="date-section">
        <input
          name="visitDate"
          type="date"
          className="visit-date-input"
          placeholder="Placeholder"
        />
        <label htmlFor="visitDate" className="visit-date-label" required>
          Visit Date
        </label>
        <div className="button-div">
          <button className="icon-btn add-btn">
            <div className="add-icon"></div>
            <div className="btn-txt">Add</div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default LogEntryForm;
