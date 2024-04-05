import { useEffect, useState } from "react";
import { Context } from "./Context";
import Header from "./Header";

function Suggestion() {
  const context = Context();
  const [filterInfo, setFilterInfo] = useState<any>();

  useEffect(() => {
    const filteredData = context.dataInfo.productRequests.filter((item: any) =>
      item.category.includes(context.filterCategory.toLowerCase())
    );
    setFilterInfo(filteredData);
    console.log(filteredData);
  }, [context.filterCategory, context.dataInfo.productRequests]);

  return (
    <article>
      <Header />
      <section className="bg-[#373f68] px-6 py-2 flex flex-row items-center justify-between w-full">
        <p className=" text-[13px] font-light text-[#f2f4fe]">
          Sort by : <strong>Most Upvotes</strong>
        </p>
        <button className="text-[13px] font-bold text-[#f2f4fe] px-4 py-[10.5px] bg-[#ad1fea;] rounded-[10px]">
          + Add Feedback
        </button>
      </section>
      <section className="flex flex-col items-center justify-between gap-4   p-6">
        {filterInfo?.map((item: any) => (
          <div
            className="w-[327px] p-6 flex flex-col items-start justify-between gap-4 rounded-[10px] bg-white"
            key={item.id}
          >
            <div className="flex flex-col items-start gap-2">
              <p className=" font-bold  tracking-[-0.18px] text-[#3a4374] text-[13px]">
                {item.title}
              </p>
              <p className=" text-[#647196] text-[13px] ">{item.description}</p>
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
          </div>
        ))}
      </section>
    </article>
  );
}

export default Suggestion;
