import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductRequest, dataStyle } from "../page/style";

function RodaFeedback({
  item,
  setDataInfo,
  dataInfo,
  setFilterInfo,
  filterInfo
}: any) {
  const [upVote, setUpVote] = useState<boolean>(false);

  let filterdata: ProductRequest[] = filterInfo;
  let data: dataStyle = dataInfo;
  
  function UpVote() {
    let votes = item?.upvotes;

    if (!upVote) {
      votes += 1;
    } else if (votes > 0) {
      votes -= 1;
    }

    if (window.screen.width < 767) {
      const index = filterdata.findIndex((items: any) => items.id === item.id);

      filterdata[index].upvotes = votes;
    }

    const dataIndex = data.productRequests.findIndex(
      (items: any) => items.id === item.id
    );
    data.productRequests[dataIndex].upvotes = votes;

    setFilterInfo(filterdata);
    setDataInfo(data);
    localStorage.setItem("data", JSON.stringify(data));
  }

  let dotColor = "#f49f85";
  if (item.status.toLowerCase() == "planned") {
    dotColor = "#f49f85"; // Use Tailwind CSS color class
  } else if (item.status.toLowerCase() == "in-progress") {
    dotColor = "#ad1fea"; // Use Tailwind CSS color class
  } else if (item.status.toLowerCase() == "live") {
    dotColor = "#62bcfa"; // Use Tailwind CSS color class
  }

  return (
    <div
      key={item.id}
      className={`flex flex-col items-center justify-between   gap-[20px]  w-[327px] md:w-[100%] md:h-[251px] bg-white rounded-b-[10px] mt-[24px] md:mt-[0] pb-6   `}
    >
      <div className={` h-[6px] w-[100%] rounded-t-[10px] bg-[${dotColor}]   `}>
        .
      </div>
      <div className="flex flex-col items-start justify-start md:justify-between px-6  gap-4 md:h-[100%] ">
        <div className="flex items-center ">
          <p
            className={` bg-[${dotColor}] w-[8px] h-[8px] rounded-full inline-block mr-2 `}
          ></p>
          <p className=" text-[13px] lg:text-[16px] text-[#647196] font-normal ">
            {item.status}
          </p>
        </div>
        <div className="flex flex-col items-start justify-start  gap-2">
          <Link to={`/${item.id}`}>
            <h1 className="text-[13px] lg:text-[18px] font-bold tracking-[-0.18px] text-[#3a4374]  hover:text-[#3a437480]">
              {item.title}
            </h1>
          </Link>
          <p className="text-[#647196] text-[13px] lg:text-[16px] font-normal">
            {" "}
            {item.description}
          </p>
          <div className="px-4 py-[5px] bg-[#f2f4ff] rounded-[10px] text-[13px] font-semibold text-[#4661e6] ">
            {item.category}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between  w-full ">
          <div
            className={`flex flex-row items-center  gap-2.5 py-1.5 pl-4 pr-[13px] ${
              upVote ? "bg-[#cfd7ff]" : "bg-[#f2f4fe] hover:bg-[#f2f4fe80] "
            } rounded-[10px] `}
            onClick={() => {
              window.screen.width<767? (setUpVote(!upVote), UpVote()):null;
            }}
          >
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
    </div>
  );
}

export default RodaFeedback;
