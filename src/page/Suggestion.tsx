import { useEffect, useState } from "react";
import { Context } from "./Context";
import Header from "./Header";
import Select, { components } from "react-select";

function Suggestion() {
  const context = Context();
  const [filterInfo, setFilterInfo] = useState<any>();
  const [selectedOption, setSelectedOption] = useState<string>("Most Upvotes");
  useEffect(() => {
    const filteredData = context.dataInfo.productRequests.filter((item: any) =>
      item.category.includes(context.filterCategory.toLowerCase())
    );
    setFilterInfo(filteredData);
  }, [context.filterCategory, context.dataInfo.productRequests]);

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
          <div style={{ marginRight: "16px" }}>{props.data.label}</div>
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
  useEffect(() => {
    let filteredData = [...context.dataInfo.productRequests];

    switch (selectedOption) {
      case "Most Upvotes":
        filteredData = filteredData.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "Least Upvotes":
        filteredData = filteredData.sort((a, b) => a.upvotes - b.upvotes);
        break;
      case "Most Comments":
        filteredData = filteredData.sort(
          (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
        );
        break;
      case "Least Comments":
        filteredData = filteredData.sort(
          (a, b) => (a.comments?.length || 0) - (b.comments?.length || 0)
        );
        break;
      default:
        break;
    }

    setFilterInfo(filteredData);
  }, [selectedOption, context.dataInfo.productRequests]);

  return (
    <article className=" md:flex md:flex-col md:justify-center md:items-center  lg:flex-row  lg:items-start lg:mt-14 lg:gap-[30px]">
      <Header />
      <div className="flex flex-col items-center">
        <section className="bg-[#373f68] px-6 py-2 flex flex-row items-center justify-between w-full md:w-[700px] md:rounded-[10px]">
          <div className="flex flex-row items-center justify-between">
            <div className="hidden md:flex flex-row items-center justify-between gap-4 mr-8">
              <img src="./assets/suggestions/icon-suggestions.svg" alt="" />
              <div className=" flex flex-row items-center justify-between gap-1 text-[18px] font-normal tracking-[-0.25px] text-white">
                <p>{filterInfo?.length}</p> <p>Suggestions</p>
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
          <button className="text-[13px] font-bold text-[#f2f4fe] px-4 py-[10.5px] bg-[#ad1fea;] rounded-[10px]">
            + Add Feedback
          </button>
        </section>
        {(filterInfo ?? []).length > 0 ? (
          <section className="flex flex-col items-center justify-between gap-4  p-6 md:w-[700px] md:px-0  ">
            {filterInfo?.map((item: any) => (
              <div
                className="w-[327px] p-6 flex flex-col items-start justify-between gap-4 rounded-[10px] bg-white md:w-full md:flex-row md:items-center md:justify-between "
                key={item.id}
              >
                <>
                  <div className="flex flex-row items-center justify-between gap-10">
                    <div className="hidden md:flex flex-col items-center  gap-2.5 py-1.5 pl-4 pr-[13px] bg-[#f2f4fe] rounded-[10px]">
                      <img src="./assets/shared/icon-arrow-up.svg" alt="" />
                      <p className="text-[13px] tracking-[-0.18px] font-bold ">
                        {item.upvotes}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <p className=" font-bold  tracking-[-0.18px] text-[#3a4374] text-[13px] md:text-[18px] ">
                        {item.title}
                      </p>
                      <p className=" text-[#647196] text-[13px] md:text-[16px] ">
                        {item.description}
                      </p>
                      <button className="px-4 py-[5px] bg-[#f2f4ff] rounded-[10px] text-[13px] font-semibold text-[#4661e6] ">
                        {item.category}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between  w-full md:w-8">
                    <div className="flex flex-row items-center  gap-2.5 py-1.5 pl-4 pr-[13px] bg-[#f2f4fe] rounded-[10px] md:hidden">
                      <img src="./assets/shared/icon-arrow-up.svg" alt="" />
                      <p className="text-[13px] tracking-[-0.18px] font-bold ">
                        {item.upvotes}
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-1">
                      <img src="./assets/shared/icon-comments.svg" alt="" />
                      <p className="text-[#3a4374] text-[13px] tracking-[0.18px] font-bold">
                        {Array.isArray(item.comments)
                          ? item.comments.length
                          : 0}
                      </p>
                    </div>
                  </div>
                </>
              </div>
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
