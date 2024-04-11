import styled from "styled-components";
import { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import ReactSelect from "react-select";
import { dataStyle, Inputs } from "./style"; // import data types/styles
import { useNavigate } from "react-router-dom";

function NewFeedback(): any {
  const [localStorageData, setLocalStorageData] = useState<dataStyle>();
  const navigate = useNavigate()
  useEffect(() => {
    let LocalStorageData: any = localStorage.getItem("data");
    setLocalStorageData(JSON.parse(LocalStorageData));
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let FeedbackData = localStorageData?.productRequests;

    let newFeedback = {
      id:FeedbackData?.length? FeedbackData?.length + 1:0,
      title: data.title,
      category: data?.category?.value,
      upvotes: 0,
      status: "suggestion",
      description: data.description,
      comments: [],
    };

    FeedbackData?.push(newFeedback);

    let newFeedbackdata: any = {
      currentUser: localStorageData?.currentUser,
      productRequests: FeedbackData,
    };
    if (localStorageData?.currentUser && newFeedback)
      setLocalStorageData(newFeedbackdata);

    localStorage.setItem("data", JSON.stringify(newFeedbackdata));

    localStorage.setItem("title", "")
    localStorage.setItem("description", "")
    localStorage.setItem("category", "")

    navigate("/")
  };

  function GoBack(){
    localStorage.setItem("title", "")
    localStorage.setItem("description", "")
    localStorage.setItem("category", "")
    window.history.back()
  }

  useEffect(() => {
    let title: any = localStorage.getItem("title");
    if (title) setValue("title", title);
    let description: any = localStorage.getItem("description");
    if (description) setValue("description", description);
    let category: any = localStorage.getItem("category");
    let categoryObj = { value: category, label: category };
    if (category) setValue("category", categoryObj);
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

  return (
    <InputField className=" min-h-screen p-10 m-0 flex flex-col items-center justify-center">
      <div className="  ">
        <div
          className="flex flex-row gap-4 "
          onClick={GoBack}
        >
          <img
            src="/assets/shared/icon-arrow-left.svg"
            alt="icon-arrow-left"
            className="my-auto"
          />{" "}
          <span className="goback">Go Back</span>
        </div>

        <WhiteContainer className="border-2 mx-auto relative border-spacing-2 py-10 px-5 mt-12 flex flex-col gap-5">
          <img
            className="absolute top-0 left-10 -translate-x-1/2 -translate-y-1/2 w-10 "
            src="/assets/shared/icon-new-feedback.svg"
            alt="icon-new-feedback"
          />
          <h1 className="">Create New Feedback</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="">
              {/* <form method="post" action="/events"> */}
              <label htmlFor=""> Feedback Title</label>
              <p>Add a short, descriptive headline</p>
              <input
                className={`px-[24px] py-[13px] focus:outline-none ${
                  errors.title ? "border border-solid border-[#d73737]" : null
                } `}
                {...register("title", {
                  required: true,
                  minLength: 4,
                })}
                placeholder="input title of feedback"
                maxLength={30}
              />
              {errors.title && (
                <span className="text-[#d73737]">
                  {errors.title.type == "required"
                    ? "Can't be empty"
                    : "minimum 4 symbols"}
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
                defaultValue={{ value: "Feature", label: "Feature" }}
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
              <textarea
                className={`md:h-[96px] h-[120px] w-[100%] px-[24px] py-[13px] bg-[#f7f8fd] focus:outline-none ${
                  errors.description
                    ? "border border-solid border-[#d73737]"
                    : null
                } rounded-[5px] mt-[16px] `}
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
                <span className="text-[#d73737]">
                  {errors.description.type == "required"
                    ? "Can't be empty"
                    : "minimum 4 symbols"}
                </span>
              )}
            </div>

            <div className="buttons flex flex-col gap-2">
              <button type="submit">Add Feedback</button>
              <button onClick={() => {
                localStorage.setItem("title", "")
                localStorage.setItem("description", "")
                localStorage.setItem("category", "")
                navigate("/")
              }} >Cancel</button>
            </div>
          </form>
        </WhiteContainer>
      </div>
    </InputField>
  );
}

export default NewFeedback;

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

  @media (min-width: 600px) {
    width: 540px;

    .buttons {
      flex-direction: row-reverse;
      align-items: end;
      justify-content: end;
    }
  }
`;
