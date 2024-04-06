import { useEffect, useState } from "react";
import { Context } from "./Context";
import Header from "./Header";
import Select from "react-select";

function Suggestion() {
  const context = Context();
  const [filterInfo, setFilterInfo] = useState<any>();
  useEffect(() => {
    const filteredData = context.dataInfo.productRequests.filter((item: any) =>
      item.category.includes(context.filterCategory.toLowerCase())
    );
    setFilterInfo(filteredData);
  }, [context.filterCategory, context.dataInfo.productRequests]);

  const options = [
    { value: "Most Upvotes", label: "Most Upvotes" },
    { value: "Least Upvotes", label: "Least Upvotes" },
    { value: "Most Comments", label: "Most Comments" },
    { value: "Least Comments", label: "Least Comments" },
  ];

  const [selectedOption, setSelectedOption] = useState<string>("Most Upvotes");
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
  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption.value);
  };

  return (
    <article>
      <Header />
      <section className="bg-[#373f68] px-6 py-2 flex flex-row items-center justify-between w-full">
        <p className=" text-[13px] font-light text-[#f2f4fe]">Sort by : </p>
        <Select
          onChange={handleSelectChange}
          defaultValue={{ value: "Most Upvotes", label: "Most Upvotes" }}
          className="text-[13px] w-[130px] "
          options={options}
        />
        <button className="text-[13px] font-bold text-[#f2f4fe] px-4 py-[10.5px] bg-[#ad1fea;] rounded-[10px]">
          + Add Feedback
        </button>
      </section>
      {(filterInfo ?? []).length > 0 ? (
        <section className="flex flex-col items-center justify-between gap-4   p-6">
          {filterInfo?.map((item: any) => (
            <div
              className="w-[327px] p-6 flex flex-col items-start justify-between gap-4 rounded-[10px] bg-white"
              key={item.id}
            >
              <>
                <div className="flex flex-col items-start gap-2">
                  <p className=" font-bold  tracking-[-0.18px] text-[#3a4374] text-[13px]">
                    {item.title}
                  </p>
                  <p className=" text-[#647196] text-[13px] ">
                    {item.description}
                  </p>
                  <button className="px-4 py-[5px] bg-[#f2f4ff] rounded-[10px] text-[13px] font-semibold text-[#4661e6] ">
                    {item.category}
                  </button>
                </div>
                <div className="flex flex-row items-center justify-between  w-full">
                  <div className="flex flex-row items-center  gap-2.5 py-1.5 pl-4 pr-[13px] bg-[#f2f4fe] rounded-[10px]">
                    {" "}
                    <img src="./assets/shared/icon-arrow-up.svg" alt="" />
                    <p className="text-[13px] tracking-[-0.18px] font-bold ">
                      {item.upvotes}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-1">
                    <img src="./assets/shared/icon-comments.svg" alt="" />
                    <p className="text-[#3a4374] text-[13px] tracking-[0.18px] font-bold">
                      {Array.isArray(item.comments) ? item.comments.length : 0}
                    </p>
                  </div>
                </div>
              </>
            </div>
          ))}
        </section>
      ) : (
        <section className="flex flex-col items-center justify-between gap-[50px] m-10 rounded-[10px] py-10 px-2 bg-white">
          <img src="public/assets/suggestions/illustration-empty.svg" alt="" />
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
    </article>
  );
}

export default Suggestion;
