import { Context } from "./Context";

function Header() {
  const context = Context();
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
        <article className="  w-[300px] absolute right-0 bg-red-500 px-10 py-10">
          <section className=" bg-white rounded-2xl flex flex-row flex-wrap gap-3 text-[14px] px-5 py-5 text-blue-600 font-bold ">
            <button className=" bg-slate-300  px-3 rounded-2xl">ALL</button>
            <button className=" bg-slate-300  px-3 rounded-2xl">UL</button>
            <button className=" bg-slate-300  px-3 rounded-2xl">UX</button>
            <button className=" bg-slate-300  px-3 rounded-2xl">
              Enhancement
            </button>
            <button className=" bg-slate-300  px-3 rounded-2xl">Bug</button>
            <button className=" bg-slate-300  px-3 rounded-2xl">feature</button>
          </section>
        </article>
      )}
      {context.close && (
        <div className="absolute left-0 w-[75px] opacity-75 bg-transparent h-full">
          <div className="bg-black h-full"></div>
        </div>
      )}
    </div>
  );
}

export default Header;
