import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import type { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProductRequest, Inputs } from "./style";
import axios from "axios";

const EditFeedback: React.FC = () => {
  const [feedbackParams, setFeedbackParams] = useState<ProductRequest>();
  const navigate = useNavigate();

  const params = useParams();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  async function getFeedback() {
    try {
      const response = await axios.get(
        `https://product-feedback-app-backend-sy6o.onrender.com/api/v1/feedbacks/${params.feedbackdetails}`
      );
      setFeedbackParams(await response.data.data.doc);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateFeedback(body: object) {
    try {
      await axios.patch(
        `https://product-feedback-app-backend-sy6o.onrender.com/api/v1/feedbacks/${params.feedbackdetails}`,
        body
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteFeedback() {
    try {
      await axios.delete(
        `https://product-feedback-app-backend-sy6o.onrender.com/api/v1/feedbacks/${params.feedbackdetails}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFeedback();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    
    localStorage.setItem("title", "");
    localStorage.setItem("description", "");
    localStorage.setItem("category", "");
    localStorage.setItem("status", "");
    let category = data?.category?.value.replace(
      /^[\[\]"\\]+|[\[\]"\\]+$/g,
      ""
    );

    const body = {
      title: data.title.replace(/^\\?"|\\?"$/g, ""),
      category: [category],
      description: data.description.replace(/^\\?"|\\?"$/g, ""),
      status: data.status.value.replace(/^\\?"|\\?"$/g, ""),
    };
    updateFeedback(body);
    setTimeout(() => {
      navigate(`/${params.feedbackdetails}`);
    }, 3000);
  };

  const handleCancel = () => {
    // Reset the form to its initial values
    
    localStorage.setItem("title", "");
    localStorage.setItem("description", "");
    localStorage.setItem("category", "");
    localStorage.setItem("status", "");
    navigate(`/${params.feedbackdetails}`);
  };

  const handleDelete = async () => {
    // Implement logic to delete the current feedback

    await deleteFeedback();    
    localStorage.setItem("title", "");
    localStorage.setItem("description", "");
    localStorage.setItem("category", "");
    localStorage.setItem("status", "");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    let title: any = localStorage.getItem("title");
    if (title) setValue("title", title);

    let description: any = localStorage.getItem("description");
    if (description) setValue("description", description);

    let category: any = localStorage.getItem("category");
    let categoryObj = { value: category, label: category };
    if (category) setValue("category", categoryObj);

    let status: any = localStorage.getItem("status");
    let statusObj = { value: status, label: status };
    if (status) setValue("status", statusObj);
  }, []);

  useEffect(() => {
    localStorage.setItem("title", watch("title"));
  }, [watch("title")]);

  useEffect(() => {
    localStorage.setItem("description", watch("description"));
  }, [watch("description")]);

  useEffect(() => {
    localStorage.setItem("category", watch("category")?.value);
  }, [watch("category")?.value]);

  useEffect(() => {
    localStorage.setItem("status", watch("status")?.value);
  }, [watch("status")?.value]);

  return (
    <InputField className="min-h-screen p-10 m-0 flex flex-col items-center justify-center">
      <div className="">
        <div
          onClick={() => {
            localStorage.setItem("title", "");
            localStorage.setItem("description", "");
            localStorage.setItem("category", "");
            localStorage.setItem("status", "");
            window.history.back();
          }}
          className="flex flex-row gap-4 cursor-pointer"
        >
          <img
            src="/assets/shared/icon-arrow-left.svg"
            alt="icon-arrow-left"
            className="my-auto"
          />{" "}
          <span className="goback">Go Back</span>
        </div>

        <WhiteContainer className="mx-auto relative border-spacing-2 py-10 px-5 mt-12 flex flex-col gap-5">
          <img
            className="absolute top-0 left-10 -translate-x-1/2 -translate-y-1/2 w-10 "
            src="/assets/shared/icon-edit-feedback.svg"
            alt="icon-new-feedback"
          />
          <h1 className="">Editing '{localStorage.getItem("title")}'</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="">
              {/* <form method="post" action="/events"> */}
              <label htmlFor=""> Feedback Title</label>
              <p>Add a short, descriptive headline</p>
              <input
                {...register("title", {
                  required: true,
                  minLength: 4,
                  maxLength: 30,
                })}
                placeholder="input title of feedback"
              />
              {errors.title && (
                <span className="tex-red-800">
                  Can't be less than 4 letters & empty
                </span>
              )}
            </div>

            <div className="">
              <label htmlFor=""> Category</label>
              <p>Choose a category for your feedback</p>
              <Controller
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    options={[
                      { value: "feature", label: "Feature" },
                      { value: "UI", label: "UI" },
                      { value: "UX", label: "UX" },
                      { value: "enhancement", label: "Enhancement" },
                      { value: "bug", label: "Bug" },
                    ]}
                    isClearable
                  />
                )}
                name="category"
                control={control}
                defaultValue={{
                  value: feedbackParams?.category
                    ? feedbackParams?.category
                    : "",
                  label: feedbackParams?.category
                    ? feedbackParams?.category
                    : "",
                }}
              />
            </div>

            <div className="">
              <label htmlFor=""> Upload Status</label>
              <p>Change feedback state</p>
              <Controller
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    options={[
                      { value: "Planned", label: "Planned" },
                      { value: "Suggestion", label: "Suggestion" },
                      { value: "In-Progress", label: "In-Progress" },
                      { value: "Planned", label: "Planned" },
                    ]}
                    isClearable
                  />
                )}
                name="status"
                control={control}
                defaultValue={{
                  value: feedbackParams?.status ? feedbackParams?.status : "",
                  label: feedbackParams?.status ? feedbackParams?.status : "",
                }}
              />
            </div>

            <div className="">
              {/* <form method="post" action="/events"> */}
              <label htmlFor=""> Feedback Detail</label>
              <p>
                Include any specific comments on what should be improved, added,
                etc.
              </p>
              {/* include validation with required or other standard HTML validation rules */}
              <input
                className="last-child"
                placeholder="min 4 letters"
                {...register("description", {
                  required: true,
                  maxLength: 200,
                  minLength: {
                    value: 4,
                    message: "Min length is 4",
                  },
                })}
              />
              {/* errors will return when field validation fails  */}
              {errors.description && (
                <span className="tex-red-800">
                  Can't be less than 4 letters & empty
                </span>
              )}
            </div>

            <div className="buttons gap-2 flex justify-between items-center">
              <div>
                <button className="submit hover:opacity-50">
                  Save Changes
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cancel hover:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="delete bg-red-700 hover:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </WhiteContainer>
      </div>
    </InputField>
  );
};

export default EditFeedback;

const InputField = styled.div`
  background-color: #f7f8fd;
  font-family: Jost;

  span {
    color: #d73737;
  }
  .goback {
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
    padding-left: 15px;
  }
  .last-child {
    height: 100px;
    margin-bottom: 15px;
  }
  button {
    padding: 10.5px 32.8px 10.5px 37.5px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: bold;
    color: #f2f4fe;
  }
  .buttons {
  }
  .submit {
    background-color: #ad1fea;
  }
  .cancel {
    background-color: #3a4374;
  }
  @media (min-width: 600px) {
    width: 540px;

    .buttons {
      justify-content: space-between;
      flex-direction: row-reverse;
      align-items: end;
      /* justify-content: end; */
    }
  }
`;
