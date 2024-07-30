import { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ProductRequest, dataStyle } from "./style";
import RodaFeedback from "../Components/RodaFeedback";
import axios from "axios";

function RoadMap() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<string>("Planned");
  const [filterInfo, setFilterInfo] = useState<any[]>([]);
  const [dataInfo, setDataInfo] = useState<dataStyle>();

  const [planed, setPlaned] = useState<ProductRequest[] | undefined>([]);
  const [inProgress, setInProgress] = useState<ProductRequest[] | undefined>();
  const [live, setLive] = useState<ProductRequest[] | undefined>();

  useEffect(() => {
    let data:any
    (async function getFeedback() {
      try {
        const response = await axios.get(
          `https://product-feedback-app-backend-sy6o.onrender.com/api/v1/feedbacks`
        );;
        setDataInfo(response.data.data.doc);
        data = response.data.data.doc        
      } catch (error) {
        console.error(error);
      }
    })()
    setTimeout(()=>{
    let filterData = data?.filter(
      (items: ProductRequest) => {
        return items.status.toLowerCase() === selectedItem.toLowerCase();
      }
    );
    setFilterInfo(filterData);

    let Planed = data?.filter(
      (items: ProductRequest) => {
        return items.status.toLowerCase() == "planned";
      }
    );
    setPlaned(Planed);
    

    let in_progres = data?.filter(
      (items: ProductRequest) => {
        return items.status.toLowerCase() == "in-progress";
      }
    );
    setInProgress(in_progres);
    
    let Live = data?.filter(
      (items: ProductRequest) => {
        return items.status.toLowerCase() == "live";
      }
    );
    setLive(Live);
  },1500)
  }, []);

  useEffect(() => {
    let filterData = dataInfo?.productRequests?.filter(
      (items: ProductRequest) => {
        return items.status.toLowerCase() === selectedItem.toLowerCase();
      }
    );
    filterData ? setFilterInfo(filterData) : null;

  }, [selectedItem]);

  return (
    <article className="flex flex-col items-center justify-start bg-[#f7f8fd] min-h-screen mb-[98px] md:px-[40px] md:py-[56px] lg:px-[165px] lg:py-[78px] ">
      <header className="bg-[#373f68] w-[100%] h-[100px] px-[24px] py-[27px] flex items-center justify-between  md:px-[32px] md:rounded-[10px] ">
        <div className="flex flex-col items-start justify-between">
          <div className="flex flex-row items-center justify-center gap-2">
            <MdArrowBackIos className="text-white" />
            <button
              onClick={() => {navigate('/')}}
              className="text-[13px] lg:text-[14px] text-white font-normal"
            >
              Go Back
            </button>
          </div>
          <p className="text-[18px] lg:text-[24px] text-white leading-[-0.25] font-normal">
            Roadmap
          </p>
        </div>
        <button
          className="custom-button"
          onClick={() => navigate("/newfeedback")}
        >
          + Add Feedback
        </button>
      </header>
      <section className="flex flex-col items-center justify-between w-full pt-4  md:px-10  lg:w-[1110px] border-b border-b-solid border-b-[#8c92b340] md:hidden  ">
        <div className="flex flex-row items-center justify-between w-full  ">
          <div>
            <button
              className={`${
                selectedItem === "Planned"
                  ? " text-[#3a4374]"
                  : "mb-[20px] text-[#3a437480]"
              } w-[125px] flex items-center justify-center text-[13px] font-bold tracking-[-0.18px] gradient-border `}
              onClick={() => setSelectedItem("Planned")}
            >
              Planned
            </button>
            <div
              className={selectedItem === "Planned" ? "custom-line" : ""}
            ></div>
          </div>
          <div>
            <button
              className={`${
                selectedItem === "In-Progress"
                  ? "text-[#3a4374]"
                  : "mb-[20px]  text-[#3a437480]"
              } w-[125px] flex items-center justify-center text-[13px] font-bold tracking-[-0.18px]`}
              onClick={() => setSelectedItem("In-Progress")}
            >
              In-Progress
            </button>
            <div
              className={selectedItem === "In-Progress" ? "custom-line" : ""}
            ></div>
          </div>
          <div>
            <button
              className={`${
                selectedItem === "Live"
                  ? " text-[#3a4374]"
                  : "mb-[20px] text-[#3a437480]"
              } w-[125px] flex items-center justify-center text-[13px] font-bold tracking-[-0.18px]`}
              onClick={() => setSelectedItem("Live")}
            >
              Live
            </button>
            <div className={selectedItem === "Live" ? "custom-line" : ""}></div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-start w-full px-6 md:w-[768px] md:px-10 lg:w-[1110px] mt-[24px] md:hidden ">
        <div>
          <p className="text-[18px] font-bold tracking-[-0.25px] text-[#3a4374]">
            {selectedItem}
          </p>
          <p className="text-[13px] text-[#647196] font-normal">
            Features currently being{" "}
            {selectedItem ? selectedItem.toLowerCase() : "shown"}
          </p>
        </div>
      </section>
      <section
        className="flex flex-col items-center justify-between md:flex-row md:flex-wrap md:w-[768px] md:px-10 lg:w-[1110px] md:justify-start md:gap-10 lg:p-0
      "
      >
        {selectedItem && window.screen.width < 768 ? (
          filterInfo.map((item: any) => {
            return (
              <RodaFeedback
                item={item}
                filterInfo={filterInfo}
                setFilterInfo={setFilterInfo}
                dataInfo={dataInfo}
                setDataInfo={setDataInfo}
              />
            );
          })
        ) : (
          <div className="md:flex mt-[32px] lg:mt-[48px] gap-[8px] lg:gap-[30px] hidden ">
            <div className="w-[223px] lg:w-[350px] " >
              <h1 className="text-[14px] lg:text-[18px] text-[#3a4374] font-bold mb-[4px] ">
                Planned ({planed?.length})
              </h1>
              <p className="text-[14px] lg:text-[16px] text-[#647196] mb-[24px]">
                Ideas prioritized for research
              </p>
              <div className="flex flex-col gap-[16px] " >
                {planed?.map((item) => {
                  return (
                  <>
                  <RodaFeedback
                item={item}
                filterInfo={filterInfo}
                setFilterInfo={setFilterInfo}
                dataInfo={dataInfo}
                setDataInfo={setDataInfo}
              />
                  </>
                  )
                })}
              </div>
            </div>
            <div className="w-[223px] lg:w-[350px] " >
              <h1 className="text-[14px] lg:text-[18px] text-[#3a4374] font-bold mb-[4px] ">
                In-Progress ({inProgress?.length})
              </h1>
              <p className="text-[14px] lg:text-[16px] text-[#647196] mb-[24px]">
                Currently being developed
              </p>
              <div className="flex flex-col gap-[16px] ">
                {inProgress?.map((item) => {
                  
                  return (
                  <>
                  <RodaFeedback
                item={item}
                filterInfo={filterInfo}
                setFilterInfo={setFilterInfo}
                dataInfo={dataInfo}
                setDataInfo={setDataInfo}              
              />
                  </>
                  )
                })}
              </div>
            </div>
            <div className="w-[223px] lg:w-[350px]" >
              <h1 className="text-[14px] lg:text-[18px] text-[#3a4374] font-bold mb-[4px] ">
                Live ({live?.length})
              </h1>
              <p className="text-[14px] lg:text-[16px] text-[#647196] mb-[24px]">
                Released features
              </p>
              <div className="flex flex-col gap-[16px] ">
                {live?.map((item) => {
                  return (
                    <>
                    <RodaFeedback
                  item={item}
                  filterInfo={filterInfo}
                  setFilterInfo={setFilterInfo}
                  dataInfo={dataInfo}
                  setDataInfo={setDataInfo}
                />
                    </>
                    )
                })}
              </div>
            </div>
          </div>
        )}
        {/* filterInfo.map((item: any) => {
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
              } */}
      </section>
    </article>
  );
}

export default RoadMap;
