import { useState } from "react";
import { Context } from "./Context";

function Header() {
  const context = Context();
  const [categorySearch, setCategorySearch] = useState<boolean>(false);
  const findCategory = ["ALL", "UX", "UI", "Enhancement", "Bug", "Feature"];

  return (
    <div
      className=" relative w-[375px] 
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
        <article className="  w-[271px] absolute right-0 bg-[#f7f8fd] px-10 py-10">
          <section className=" bg-white rounded-2xl flex flex-row flex-wrap gap-3 text-[13px] p-6 text-blue-600 font-bold ">
            {findCategory.map((item: string) => {
              return (
                <button
                  onClick={() => {
                    if (item === "ALL") {
                      context.setFilterCategory("");
                    } else {
                      context.setFilterCategory(item);
                    }
                    // setCategorySearch(!categorySearch);
                  }}
                  className={` bg-slate-300  px-4 pt-[5px] pb-1.5 rounded-[10px] ${
                    categorySearch
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
        </article>
      )}
      {context.close && (
        <div className="absolute left-0 w-[104px] opacity-75 bg-transparent h-full">
          <div className="bg-black h-full"></div>
        </div>
      )}
    </div>
  );
}

export default Header;
