import { useEffect, useState } from "react";
import { Context } from "./Context";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

function Header() {
  const context = Context();
  const [categorySearch, setCategorySearch] = useState<string>("ALL");
  const findCategory = ["ALL", "UX", "UI", "Enhancement", "Bug", "Feature"];

  const isMobile = useMediaQuery({ minWidth: 767 });

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
  useEffect(() => {
    if (context.close) {
      document.documentElement.classList.add("no-scroll");
    } else {
      document.documentElement.classList.remove("no-scroll");
    }
  }, [context.close]);

  return (
    <div
      className=" relative   md:flex md:flex-row md:justify-center md:items-center lg:flex-col
    "
    >
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  w-full h-[72px] md:w-[233px] md:h-[178px] md:rounded-[10px] md:mt-14 md:mb-10  md:mr-2.5 lg:w-[255px] lg:mb-6 lg:mr-0 lg:mt-0">
        <div className="  pl-6 pt-4  text-white md:pt-[103px]">
          <p className="text-[16px] font-bold md:text-[20px]">
            Frontend Mentor
          </p>
          <p className=" text-[12px] font-normal md:text-[15px]">
            Feedback Board
          </p>
        </div>
      </div>

      <div className=" absolute top-7 right-8 md:hidden ">
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

      {(isMobile || context.close) && (
        <article className=" flex flex-col items-center  gap-6  w-[271px] absolute right-0 bg-[#f7f8fd] p-6 z-20  min-h-screen  md:relative  md:flex-row md:items-center md:p-0 md:gap-2.5  md:w-[456px] md:min-h-[176px] md:mt-4 lg:flex-col lg:gap-6 lg:mt-0 lg:w-full">
          <section className=" bg-white rounded-2xl flex flex-row flex-wrap gap-3.5 text-[13px] px-5 pt-6 pb-9 text-blue-600 font-bold md:w-[223px]  lg:w-[255px] ">
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
                      : "bg-[#f2f4ff] text-[#4661e6] hover:bg-[#cfd7ff]"
                  }`}
                  key={item}
                >
                  {item}
                </button>
              );
            })}
          </section>
          <section className=" flex flex-col items-center justify-between bg-white p-6 rounded-[10px] w-full  gap-6  md:w-[223px]  lg:w-[255px]">
            <div className="flex flex-row items-center justify-between w-full">
              <h3 className="text-[#3a4374] font-bold leading-[-0.25px] text-[18px]">
                Roadmap
              </h3>
              <Link
                className="text-[#4661e6] text-[13px] underline underline-offset-2 cursor-pointer hover:text-[#4661e67f]  "
                to={"/roadmap"}
              >
                View
              </Link>
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
        <div className="absolute left-0 w-full opacity-75 bg-transparent h-full z-10 md:hidden">
          <div
            onClick={() => {
              context.setClose(false);
            }}
            className="bg-black min-h-screen "
          ></div>
        </div>
      )}
    </div>
  );

}

export default Header;
