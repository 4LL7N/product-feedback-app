import React from "react";
import styled from "styled-components";
import { Form } from "react-router-dom";

const NewFeedback: React.FC = () => {
  return (
    <InputField className="border-2">
      <img
        src="team-1/public/assets/shared/icon-arrow-left.svg"
        alt="icon-arrow-left"
      />{" "}
      go back
      <div className="relative border-spacing-2">
        <img
          className="absolute"
          src="team-1/public/assets/shared/icon-new-feedback.svg"
          alt="icon-new-feedback"
        />
        <h1>Create New Feedback</h1>
        <form method="post" action="/events">
          <label htmlFor=""> Feedback Title</label>
          <p>Add a short, descriptive headline</p>
          <input type="text" name="title" />
        </form>
        <form method="get" action=""></form>
        <label htmlFor=""> Category</label>
        <p>Choose acategory for your feedback</p>
        <select name="sort" id="">
          <option value="">Feature</option>
          <option value="">UI</option>
          <option value="">UX</option>
          <option value="">Enhancement</option>
          <option value="">Bug</option>
        </select>
        <form method="post" action="/events">
          <label htmlFor=""> Feedback Detail</label>
          <p>
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <input type="text" name="detail" />
        </form>
      </div>
    </InputField>
  );
};

export default NewFeedback;

const InputField = styled.div`
  p {
    font-size: 13px;
    color: #647196;
  }
`;
