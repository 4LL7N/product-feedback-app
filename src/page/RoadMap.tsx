import { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
function RoadMap() {
  const [selectedItem, setSelectedItem] = useState<string>("In-Progress");
  return (
    <article className="flex flex-col items-center  justify-start bg-[#f7f8fd]  min-h-screen">
      <header className="bg-[#373f68] w-full h-[100px] px-6 py-5 flex flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-between  ">
          <div className="flex flex-row items-center  justify-center gap-2">
            <MdArrowBackIos className=" text-white" />
            <button
              onClick={() => window.history.back()}
              className="text-[13px] text-white font-normal"
            >
              Go Back
            </button>
          </div>
          <p className="text-[18px] text-white leading-[-0.25]font-normal">
            Roadmap
          </p>
        </div>
        <button className="custom-button">+ Add Feedback</button>
      </header>
      <section className="flex flex-col items-center justify-between w-full    py-4">
        <div className="flex flex-row items-center justify-between w-full">
          <button
            className={` ${
              selectedItem === "Planned" ? "text-[#3a4374]" : "text-[#3a437480]"
            }
             w-[125px] flex items-center justify-center text-[13px] font-bold tracking-[-0.18px]`}
            onClick={() => setSelectedItem("Planned")}
          >
            Planned (2)
          </button>
          <div
            className={` ${
              selectedItem === "In-Progress"
                ? "text-[#3a4374]"
                : "text-[#3a437480]"
            }
             w-[125px] flex items-center justify-center text-[13px] font-bold tracking-[-0.18px]`}
            onClick={() => setSelectedItem("In-Progress")}
          >
            <p> In-Progress (3)</p>
          </div>

          <p
            className={` ${
              selectedItem === "Live" ? "text-[#3a4374]" : "text-[#3a437480]"
            }
              w-[125px] flex items-center justify-center text-[13px] font-bold tracking-[-0.18px]`}
            onClick={() => setSelectedItem("Live")}
          >
            Live (1)
          </p>
        </div>
        <div className="flex flex-row items-center justify-between w-full px-6">
          <div
            className={selectedItem === "Planned" ? "custom-line" : ""}
          ></div>
          <div
            className={selectedItem === "In-Progress" ? "custom-line" : ""}
          ></div>
          <div className={selectedItem === "Live" ? "custom-line" : ""}></div>
        </div>
        <div className="h-[1px] bg-[#8c92b3] w-full"></div>
      </section>
      <section>
        <div>
          <p className="text-[18px] font-bold tracking-[-0.25px] text-[#3a4374]">
            {selectedItem}
          </p>
          <p className="text-[13px] text-[#647196] font-normal">
            Features currently being developed
          </p>
        </div>
      </section>
    </article>
  );
}

export default RoadMap;
