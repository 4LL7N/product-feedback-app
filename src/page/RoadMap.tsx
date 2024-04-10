import { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Context } from "./Context";
import { Link, useNavigate } from "react-router-dom";
import { dataStyle } from "./style";

function RoadMap() {
  const context = Context();
  const navigate =  useNavigate()
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [filterInfo, setFilterInfo] = useState<any[]>([]);
  
  const [dataInfo, setDataInfo] = useState<dataStyle>()

  useEffect(() => {
    let LocalStorageData: any = localStorage.getItem("data");
    setDataInfo(JSON.parse(LocalStorageData));
  },[])

  

  return (
    <article className="flex flex-col items-center justify-start bg-[#f7f8fd] min-h-screen   ">
      <header className="bg-[#373f68] w-full h-[100px] px-6 py-5 flex flex-row items-center justify-between md:w-[768px] md:px-10 md:rounded-[10px] lg:w-[1110px]">
        <div className="flex flex-col items-start justify-between">
          <div className="flex flex-row items-center justify-center gap-2">
            <MdArrowBackIos className="text-white" />
            <button
              onClick={() => window.history.back()}
              className="text-[13px] text-white font-normal"
            >
              Go Back
            </button>
          </div>
          <p className="text-[18px] text-white leading-[-0.25] font-normal">
            Roadmap
          </p>
        </div>
        <button className="custom-button" onClick={() => navigate("/newfeedback") } >+ Add Feedback</button>
      </header>
      <section className="flex flex-col items-center justify-between w-full py-4 md:w-[768px] md:px-10 lg:w-[1110px]">
        <div className="flex flex-row items-center justify-between w-full">
          <button
            className={`${
              selectedItem === "Planned" ? "text-[#3a4374]" : "text-[#3a437480]"
            } w-[125px] flex items-center justify-center text-[13px] font-bold tracking-[-0.18px]`}
            onClick={() => setSelectedItem("Planned")}
          >
            Planned 
          </button>
          <button
            className={`${
              selectedItem === "In-Progress"
                ? "text-[#3a4374]"
                : "text-[#3a437480]"
            } w-[125px] flex items-center justify-center text-[13px] font-bold tracking-[-0.18px]`}
            onClick={() => setSelectedItem("In-Progress")}
          >
            In-Progress 
          </button>
          <button
            className={`${
              selectedItem === "Live" ? "text-[#3a4374]" : "text-[#3a437480]"
            } w-[125px] flex items-center justify-center text-[13px] font-bold tracking-[-0.18px]`}
            onClick={() => setSelectedItem("Live")}
          >
            Live 
          </button>
        </div>
        <div className="flex flex-row items-center justify-between w-full px-6 ">
          <div
            className={
              selectedItem === "Planned" || selectedItem === ""
                ? "custom-line"
                : ""
            }
          ></div>
          <div
            className={
              selectedItem === "In-Progress" || selectedItem === ""
                ? "custom-line"
                : ""
            }
          ></div>
          <div
            className={
              selectedItem === "Live" || selectedItem === ""
                ? "custom-line"
                : ""
            }
          ></div>
        </div>

        <div className="h-[1px] bg-[#8c92b3] w-full"></div>
      </section>
      <section className="flex flex-col items-start w-full px-6 md:w-[768px] md:px-10 lg:w-[1110px]">
        <div>
          <p className="text-[18px] font-bold tracking-[-0.25px] text-[#3a4374]">
            {selectedItem ? selectedItem : "All Items"}
          </p>
          <p className="text-[13px] text-[#647196] font-normal">
            Features currently being{" "}
            {selectedItem ? selectedItem.toLowerCase() : "shown"}
          </p>
        </div>
      </section>
      <section
        className="flex flex-col items-center justify-between md:flex-row md:flex-wrap md:w-[768px] md:px-10 lg:w-[1110px] md:justify-start md:gap-10
      "
      >
        {selectedItem
          ? filterInfo.map((item: any) => {
              if (
                item.status.toLowerCase() === selectedItem.toLowerCase() &&
                item.status !== "suggestion"
              ) {
                let dotColor = "";
                if (item.status === "Planned") {
                  dotColor = "bg-orange-300"; // Use Tailwind CSS color class
                } else if (item.status === "In-Progress") {
                  dotColor = "bg-purple-400"; // Use Tailwind CSS color class
                } else if (item.status === "Live") {
                  dotColor = "bg-blue-400"; // Use Tailwind CSS color class
                }

                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-center justify-between  gap-4  w-[327px] bg-white rounded-[10px] mt-[24px] pb-6  "
                  >
                    <div className="flex flex-col items-start justify-start px-6  gap-4">
                      <p
                        className={`${dotColor} w-4 h-4 rounded-full inline-block mr-2`}
                      ></p>
                      <p className="text-[13px] text-[#647196]  font-normal">
                        {item.status}
                      </p>

                      <div className="flex flex-col items-start justify-start  gap-2">
                        <Link to={`/${item.id}`}>
                          <h1 className="text-[13px] font-bold tracking-[-0.18px] text-[#3a4374]  hover:text-[#3a437480]">
                            {item.title}
                          </h1>
                        </Link>
                        <p className="text-[#647196] text-[13px] font-normal">
                          {" "}
                          {item.description}
                        </p>
                        <div className="px-4 py-[5px] bg-[#f2f4ff] rounded-[10px] text-[13px] font-semibold text-[#4661e6] ">
                          {item.category}
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
                    </div>
                  </div>
                );
              }
              return null;
            })
          : filterInfo.map((item: any) => {
              if (item.status !== "suggestion") {
                let dotColor = "";
                if (item.status === "Planned") {
                  dotColor = "bg-[#f49f85]";
                } else if (item.status === "In-Progress") {
                  dotColor = "bg-[#ad1fea]";
                } else if (item.status === "Live") {
                  dotColor = "bg-[#62bcfa]";
                }

                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-center justify-between  gap-4  w-[327px] bg-white rounded-[10px] mt-[24px] pb-6 "
                  >
                    <div className="flex flex-col items-start justify-start px-6  gap-4">
                      <p
                        className={`${dotColor} w-4 h-4 rounded-full inline-block mr-2`}
                      ></p>
                      <p>{item.status}</p>

                      <div className="flex flex-col items-start justify-start gap-2">
                        <Link to={`/${item.id}`}>
                          <h1 className="text-[13px] font-bold tracking-[-0.18px] text-[#3a4374]  hover:text-[#3a437480]">
                            {item.title}
                          </h1>
                        </Link>
                        <p className="text-[#647196] text-[13px] font-normal">
                          {" "}
                          {item.description}
                        </p>
                        <div className=" px-4 py-[5px] bg-[#f2f4ff] rounded-[10px] text-[13px] font-semibold text-[#4661e6] ">
                          {item.category}
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
                    </div>
                  </div>
                );
              }
              return null;
            })}
      </section>
    </article>
  );
}

export default RoadMap;
