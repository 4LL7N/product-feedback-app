import React from "react";
import styled from "styled-components";
import { Form } from "react-router-dom";
import { useSubmit } from "react-router-dom";

const NewFeedback: React.FC = () => {
  // const { value, handleSubmit } = useSubmit("initial Value");

  const handleClick = () => {
    // handleSubmit("New Value");
  };

  return (
    <InputField className="w-96 sm:w-450 md:w-550 h-full mx-auto items-center p-10">
      <div className="flex flex-row gap-4 ">
        <img
          src="/assets/shared/icon-arrow-left.svg"
          alt="icon-arrow-left"
          className="my-auto"
        />{" "}
        <span className="">Go Back</span>
      </div>

      <WhiteContainer className="relative border-spacing-2 py-10 px-5 mt-12 flex flex-col gap-5">
        <img
          className="absolute top-0 left-10 -translate-x-1/2 -translate-y-1/2 w-10 "
          src="/assets/shared/icon-new-feedback.svg"
          alt="icon-new-feedback"
        />
        <h1 className="">Create New Feedback</h1>

        <div className="">
          <form method="post" action="/events">
            <label htmlFor=""> Feedback Title</label>
            <p>Add a short, descriptive headline</p>
            <input type="text" name="title" />
          </form>
        </div>

        <div className="">
          <label htmlFor=""> Category</label>
          <p>Choose a category for your feedback</p>
          <select name="sort" id="" className="text-xs text-indigo-900">
            <option value="">Feature</option>
            <option value="">UI</option>
            <option value="">UX</option>
            <option value="">Enhancement</option>
            <option value="">Bug</option>
          </select>
        </div>

        <div className="">
          <form method="post" action="/events">
            <label htmlFor=""> Feedback Detail</label>
            <p>
              Include any specific comments on what should be improved, added,
              etc.
            </p>
            <input type="text" name="detail" className="last-child" />
          </form>
        </div>

        <button onClick={handleClick}> Add Feedback</button>
        <button>Cancel</button>
      </WhiteContainer>
    </InputField>
  );
};

export default NewFeedback;

const InputField = styled.div`
  background-color: #f7f8fd;
  font-family: Jost;

  span {
    color: #647196;
  }
  p {
    font-size: 13px;
    color: #647196;
  }
`;

const WhiteContainer = styled.div`
  background-color: #fff;
  border-radius: 15px;

  h1 {
    font-size: 18px;
    font-weight: bold;
    color: #3a4374;
    letter-spacing: -0.25px;
  }
  label {
    font-size: 13px;
    font-weight: bold;
    color: #3a4374;
  }
  input,
  select {
    width: 100%;
    height: 48px;
    flex-grow: 0;
    margin: 16px 0 0;
    border-radius: 5px;
    background-color: #f7f8fd;
  }
  .last-child {
    height: 100px;
  }
  button {
    margin-top: 25px;
    padding: 10.5px 32.8px 10.5px 37.5px;
    border-radius: 10px;
    background-color: #ad1fea;
    &:last-child {
      background-color: #3a4374;
      margin-top: 0px;
    }
    font-size: 13px;
    font-weight: bold;
    color: #f2f4fe;
  }
`;
