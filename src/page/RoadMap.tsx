import { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Context } from "./Context";

function RoadMap() {
  const context = Context();
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [filterInfo, setFilterInfo] = useState<any[]>([]);
  const displayedStatuses: string[] = [];
  const [statusCounts, setStatusCounts] = useState<{ [key: string]: number }>({
    Planned: 0,
    "In-Progress": 0,
    Live: 0,
  });

  useEffect(() => {
    const filteredData = context.dataInfo.productRequests.filter((item: any) =>
      item.status.includes(context.filterCategory.toLowerCase())
    );

    const counts: { [key: string]: number } = {
      Planned: 0,
      "In-Progress": 0,
      Live: 0,
    };

    filteredData.forEach((item: any) => {
      counts[item.status] = (counts[item.status] || 0) + 1;
    });

    setStatusCounts(counts);
    setFilterInfo(filteredData); // Update filtered data state
  }, [context.filterCategory, context.dataInfo.productRequests]);

  const CountStatus = (status: string) => {
    // Normalize the status value to lowercase
    const normalizedStatus = status.toLowerCase();
    return statusCounts[normalizedStatus] !== undefined
      ? statusCounts[normalizedStatus]
      : 0;
  };

  return (
    <article className="flex flex-col items-center justify-start bg-[#f7f8fd] min-h-screen">
      <header className="bg-[#373f68] w-full h-[100px] px-6 py-5 flex flex-row items-center justify-between">
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
        <button className="custom-button">+ Add Feedback</button>
      </header>
      <section className="flex flex-col items-center justify-between w-full py-4">
        <div className="flex flex-row items-center justify-between w-full">
          <button
            className={`${
              selectedItem === "Planned" ? "text-[#3a4374]" : "text-[#3a437480]"
            } w-[125px] flex items-center justify-center text-[13px] font-bold tracking-[-0.18px]`}
            onClick={() => setSelectedItem("Planned")}
          >
            Planned ({CountStatus("Planned")})
          </button>
          <button
            className={`${
              selectedItem === "In-Progress"
                ? "text-[#3a4374]"
                : "text-[#3a437480]"
            } w-[125px] flex items-center justify-center text-[13px] font-bold tracking-[-0.18px]`}
            onClick={() => setSelectedItem("In-Progress")}
          >
            In-Progress ({CountStatus("In-Progress")})
          </button>
          <button
            className={`${
              selectedItem === "Live" ? "text-[#3a4374]" : "text-[#3a437480]"
            } w-[125px] flex items-center justify-center text-[13px] font-bold tracking-[-0.18px]`}
            onClick={() => setSelectedItem("Live")}
          >
            Live ({CountStatus("Live")})
          </button>
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
            {selectedItem ? selectedItem : "All Items"}
          </p>
          <p className="text-[13px] text-[#647196] font-normal">
            Features currently being{" "}
            {selectedItem ? selectedItem.toLowerCase() : "shown"}
          </p>
        </div>
      </section>
      <section>
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
                  <div key={item.id}>
                    <p
                      className={`${dotColor} w-2 h-2 rounded-full inline-block mr-2`}
                    ></p>
                    {item.status}
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
                  <div key={item.id}>
                    <p
                      className={`${dotColor} w-4 h-4 rounded-full inline-block mr-2`}
                    ></p>
                    {item.status}
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
