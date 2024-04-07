import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import type {
  SubmitHandler
} from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProductRequest, dataStyle, Inputs } from "./style";

const EditFeedback: React.FC = () => {
  const [localStorageData, setLocalStorageData] = useState<dataStyle>();
  const [feedbackParams, setfeedbackParams] = useState<ProductRequest>();
  const navigate = useNavigate();

  const params = useParams();
  console.log(params);

  useEffect(() => {
    let LocalStorageData: any = localStorage.getItem("data");
    setLocalStorageData(JSON.parse(LocalStorageData));

    let findFeedback: ProductRequest = JSON.parse(
      LocalStorageData
    ).productRequests?.find((item: ProductRequest) => {
      return item.id == Number(params.feedbackdetails);
    });
    console.log(findFeedback);

    setfeedbackParams(findFeedback);
  }, []);
  // console.log(localStorageData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data);

    if (!localStorageData?.productRequests) {
      console.error("Product requests data is undefined or null.");
      return;
    }

    const newFeedback = [...localStorageData.productRequests]; // Create a copy of the array

    const indexToUpdate = newFeedback.findIndex(
      (item) => item.id === Number(params.feedbackdetails)
    ); // Find the index of the item to update

    if (indexToUpdate !== -1) {
      // Update the item if it exists in the array
      newFeedback[indexToUpdate] = {
        ...newFeedback[indexToUpdate],
        title: data.title,
        category: data?.category?.value,
        description: data.description,
        status: data.status.value,
      };

      // Update localStorage with the updated array
      localStorage.setItem(
        "data",
        JSON.stringify({
          productRequests: newFeedback,
          currentUser: localStorageData?.currentUser,
        })
      );
      setLocalStorageData({
        ...localStorageData,
        productRequests: newFeedback,
      }); // Update state with current user
    } else {
      console.error("Item not found in product requests array.");
    }
    navigate("/");
  };

  const handleCancel = () => {
    // Reset the form to its initial values
    reset({
      title: "",
      category: {value:"",label:""},
      description: "",
    });
  };

  const handleDelete = () => {
    // Implement logic to delete the current feedback
    // For example, you can remove the feedback from localStorageData.productRequests

    const updatedFeedbacks = localStorageData?.productRequests.filter(
      (feedback) => feedback.id !== feedbackParams?.id
    );

    // Update the local storage with the updated feedbacks array
    localStorage.setItem(
      "data",
      JSON.stringify({ productRequests: updatedFeedbacks })
    );

    localStorage.setItem("title", "");
    localStorage.setItem("description", "");
    localStorage.setItem("category", "");
    localStorage.setItem("status", "");

    // After deletion, navigate back to the suggestion page
    // navigate("/");
  };

  console.log(watch("title")); // watch input value by passing the name of it
  // console.log(watch("category"));

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
    <InputField className="h-screen p-10 m-0 flex flex-col items-center justify-center">
      <div className="">
        <div
          onClick={() => window.history.back()}
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
          <h1 className="">Editing '{feedbackParams?.title}'</h1>

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
                      { value: "Feature", label: "Feature" },
                      { value: "UI", label: "UI" },
                      { value: "UX", label: "UX" },
                      { value: "Enhancement", label: "Enhancement" },
                      { value: "Bug", label: "Bug" },
                    ]}
                    isClearable
                  />
                )}
                name="category"
                control={control}
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
                  onClick={handleCancel}
                  className="cancel hover:opacity-50"
                >
                  Cancel
                </button>
                <button
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
