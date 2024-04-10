import { useEffect, useState } from "react";
import { Context } from "./Context";
import Header from "./Header";
import Select, { components } from "react-select";
import { Link } from "react-router-dom";
import { ProductRequest, dataStyle } from "./style";
import Feedback from "../Components/Feedback";

function Suggestion() {
  const context = Context();
  const [filterInfo, setFilterInfo] = useState<ProductRequest[]>();
  const [selectedOption, setSelectedOption] = useState<string>("Most Upvotes");
  const [dataInfo, setDataInfo] = useState<dataStyle>()


  useEffect(() => {
    let LocalStorageData: any = localStorage.getItem("data");
    setDataInfo(JSON.parse(LocalStorageData));
  },[])

  useEffect(() => {
    const filteredData = dataInfo?.productRequests.filter((item: any) =>
      item.category.includes(context.filterCategory.toLowerCase())
    );

    let updatedData = [...(filteredData ?? [])];

    switch (selectedOption) {
      case "Most Upvotes":
        updatedData = updatedData.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "Least Upvotes":
        updatedData = updatedData.sort((a, b) => a.upvotes - b.upvotes);
        break;
      case "Most Comments":
        updatedData = updatedData.sort(
          (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
        );
        break;
      case "Least Comments":
        updatedData = updatedData.sort(
          (a, b) => (a.comments?.length || 0) - (b.comments?.length || 0)
        );
        break;
      default:
        break;
    }

    setFilterInfo(updatedData);
  }, [
    selectedOption,
    context.filterCategory,
    dataInfo?.productRequests,
  ]);

  const options: any[] = [
    {
      value: "Most Upvotes",
      label: "Most Upvotes",
      image: "./assets/shared/icon-check.svg",
    },
    {
      value: "Least Upvotes",
      label: "Least Upvotes",
      image: "./assets/shared/icon-check.svg",
    },
    {
      value: "Most Comments",
      label: "Most Comments",
      image: "./assets/shared/icon-check.svg",
    },
    {
      value: "Least Comments",
      label: "Least Comments",
      image: "./assets/shared/icon-check.svg",
    },
  ];
  const CustomOption = (props: any) => {
    return (
      <components.Option {...props}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "60px" }}>{props.data.label}</div>
          {props.isSelected && (
            <img src={props.data.image} alt={props.data.label} />
          )}
        </div>
      </components.Option>
    );
  };

  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption.value);
  };

  const getOptionLabel = (option: any) => option.label;
  const customStyles = {
    option: (provided: any) => ({
      //list
      ...provided,
      backgroundColor: "none",

      color: "none",
      "&:hover": {
        color: "#ad1fea",
        border: "none",
      },
    }),
    singleValue: (provided: any) => ({
      //main text color
      ...provided,
      color: "#f2f4fe",
    }),
    control: (provided: any, state: { isFocused: any }) => ({
      //main
      ...provided,
      backgroundColor: "#373f68",
      border: "none",
      outline: state.isFocused ? "none" : "none",
      "&:hover": {
        color: "#ad1fea",
        border: "none",
      },
    }),
    menu: (provided: any) => ({
      // Adjust the width of the dropdown list
      ...provided,
      width: "200px",
      // "@media (min-width: 768px)": {
      //   width: "255px", // Tablet version width
      // },
    }),
  };

  

  return (
    <article className=" md:flex md:flex-col md:justify-center md:items-center  lg:flex-row  lg:items-start lg:mt-14 lg:gap-[30px] ">
      <Header />
      <div className="flex flex-col items-center">
        <section className="bg-[#373f68] px-6 py-2 flex flex-row items-center justify-between w-full md:w-[700px] md:rounded-[10px]">
          <div className="flex flex-row items-center justify-between">
            <div className="hidden md:flex flex-row items-center justify-between gap-4 mr-8">
              <img src="./assets/suggestions/icon-suggestions.svg" alt="" />
              <div className=" flex flex-row items-center justify-between gap-1 text-[18px] font-normal tracking-[-0.25px] text-white">
                <p className="w-4">{filterInfo?.length}</p> <p>Suggestions</p>
              </div>
            </div>
            <p className=" text-[13px] font-light text-[#f2f4fe]">Sort by : </p>
            <Select
              onChange={handleSelectChange}
              components={{ Option: CustomOption }}
              defaultValue={{ value: "Most Upvotes", label: "Most Upvotes" }}
              options={options}
              getOptionLabel={getOptionLabel}
              styles={customStyles}
              className="text-[13px] w-[130px] m-0 p-0 md:w-[160px]"
            />
          </div>

          <Link to={"/newfeedback"}>
            <button className="custom-button"> + Add Feedback</button>
          </Link>
        </section>

        {(filterInfo ?? []).length > 0 ? (
          <section className="flex flex-col items-center justify-between gap-4  p-6 md:w-[700px] md:px-0  ">
            {filterInfo?.map((item: any) => (
              <Feedback item={item} filterInfo={filterInfo} setFilterInfo={setFilterInfo} dataInfo={dataInfo} setDataInfo={setDataInfo} />
            ))}
          </section>
        ) : (
          <section className="flex flex-col items-center justify-between gap-[50px] m-10 rounded-[10px] py-10 px-2 bg-white">
            <img
              src="public/assets/suggestions/illustration-empty.svg"
              alt=""
            />
            <div className="flex flex-col items-center justify-between gap-4">
              <h1 className="text-[24px]">There is no feedback yet.</h1>
              <span className="text-[16px] font-normal text-center text-[#647196] max-w-[410px]">
                Got a suggestion? Found a bug that needs to be squashed? We love
                hearing about new ideas to improve our app.
              </span>
            </div>
            <button className="px-6 py-3 bg-[#ad1fea] text-[#f2f4fe] rounded-[10px] text-[14px] font-bold">
              + Add Feedback
            </button>
          </section>
        )}
      </div>
    </article>
  );
}

export default Suggestion;
