import { useState } from "react";
import { Context } from "./Context";

function Header() {
  const context = Context();
  const [categorySearch, setCategorySearch] = useState<string>("ALL");
  const findCategory = ["ALL", "UX", "UI", "Enhancement", "Bug", "Feature"];

  const counts = context.dataInfo.productRequests.reduce(
    (
      acc: { planned: number; inProgress: number; live: number },
      item: { status: string }
    ) => {
      const status = item.status.toLowerCase();

      if (status === "planned") {
        acc.planned++;
      } else if (status === "in-progress") {
        acc.inProgress++;
      } else if (status === "live") {
        acc.live++;
      }
      return acc;
    },
    { planned: 0, inProgress: 0, live: 0 }
  );

  return (
    <div
      className=" relative w-[375px]  h-full
    "
    >
      <img src="./assets/suggestions/mobile/background-header.png" alt="" />
      <div className=" absolute top-7 right-8 ">
        {context.close ? (
          <img
            onClick={() => {
              context.setClose(false);
            }}
            src="./assets/shared/mobile/icon-close.svg"
            alt=""
          />
        ) : (
          <img
            onClick={() => {
              context.setClose(true);
            }}
            src="./assets/shared/mobile/icon-hamburger.svg"
            alt=""
          />
        )}
      </div>
      <div className=" absolute top-5 left-8  text-white">
        <p className="text-[16px] font-bold">Frontend Mentor</p>
        <p className=" text-[12px] font-normal">Feedback Board</p>
      </div>

      {context.close && (
        <article className=" flex flex-col items-center justify-between  gap-6  w-[271px] absolute right-0 bg-[#f7f8fd] p-6 z-10 ">
          <section className=" bg-white rounded-2xl flex flex-row flex-wrap gap-3.5 text-[13px] px-5 pt-6 pb-9 text-blue-600 font-bold ">
            {findCategory.map((item: string) => {
              return (
                <button
                  onClick={() => {
                    if (item === "ALL") {
                      context.setFilterCategory("");
                    } else {
                      context.setFilterCategory(item);
                    }
                    setCategorySearch(item);
                  }}
                  className={`  px-4 pt-[5px] pb-1.5 rounded-[10px] ${
                    categorySearch === item
                      ? " text-white bg-[#4661e6]"
                      : "bg-[#f2f4ff] text-[#4661e6]"
                  }`}
                  key={item}
                >
                  {item}
                </button>
              );
            })}
          </section>
          <section className=" flex flex-col items-center justify-between bg-white p-6 rounded-[10px] w-full  gap-6 ">
            <div className="flex flex-row items-center justify-between w-full">
              <h3 className="text-[#3a4374] font-bold leading-[-0.25px]">
                Roadmap
              </h3>
              <p>View</p>
            </div>
            <div className="flex flex-col items-center justify-between gap-2 w-full">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row items-center justify-between gap-4">
                  <p className=" bg-[#f49f85] w-2 h-2 rounded-full"></p>
                  <p className="text-[#647196] text-[16px] font-normal">
                    Planned
                  </p>
                </div>
                <p>{counts.planned}</p>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row items-center justify-between gap-4">
                  <p className=" bg-[#ad1fea] w-2 h-2 rounded-full"></p>
                  <p className="text-[#647196] text-[16px] font-normal">
                    In-Progress
                  </p>
                </div>
                <p>{counts.inProgress}</p>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row items-center justify-between gap-4">
                  <p className=" bg-[#62bcfa] w-2 h-2 rounded-full"></p>
                  <p className="text-[#647196] text-[16px] font-normal">Live</p>
                </div>
                <p>{counts.live}</p>
              </div>
            </div>
          </section>
        </article>
      )}
      {context.close && (
        <div className="absolute left-0 w-[104px] opacity-75 bg-transparent h-full z-10">
          <div className="bg-black "></div>
        </div>
      )}
    </div>
  );
}

export default Header;
