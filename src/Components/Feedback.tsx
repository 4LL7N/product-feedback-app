
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { ProductRequest, dataStyle } from '../page/style';
import axios from 'axios';

function Feedback({item,setFilterInfo,filterInfo,dataInfo,setDataInfo}:any) {
    const [upVote, setUpVote] = useState<boolean>(false);
    
    let filterdata:ProductRequest[] = filterInfo
    let data:dataStyle = dataInfo

    function UpVote(){
        let votes = item?.upvotes;
    
        if (!upVote) {
          votes += 1;
        } else {
          votes -= 1;
        }

        const index = filterdata.findIndex(
            (items:any) => items.id === item.id
        )

        const dataIndex = data.productRequests.findIndex(
            (items:any) => items.id === item.id
        )

        filterdata[index].upvotes = votes
        
        data.productRequests[dataIndex].upvotes = votes

        setFilterInfo(filterdata);
        setDataInfo(data)
        localStorage.setItem("data", JSON.stringify(data));
          
      }

  return (
    <>
        <div
                className="w-[327px] p-6 flex flex-col items-start justify-between gap-4 rounded-[10px] bg-white md:w-full md:flex-row md:items-center md:justify-between  "
                key={item.id}
              >
                <>
                  <div className="flex flex-row items-center justify-between gap-10">
                    <div onClick={() => {setUpVote(!upVote),UpVote()} } className={`hidden md:flex flex-col items-center  gap-2.5 py-1.5 pl-4 pr-[13px] ${upVote ? "bg-[#cfd7ff]" : "bg-[#f2f4fe] hover:bg-[#f2f4fe80] "} rounded-[10px]`}>
                      <img src="./assets/shared/icon-arrow-up.svg" alt="" />
                      <p className="text-[13px] tracking-[-0.18px] font-bold ">
                        {item.upvotes}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <Link
                        to={`/${item.id}`}
                        className=" font-bold  tracking-[-0.18px] text-[#3a4374] text-[13px] md:text-[18px] hover:text-[#3a437480]  "
                      >
                        {item.title}
                      </Link>
                      <p className=" text-[#647196] text-[13px] md:text-[16px] ">
                        {item.description}
                      </p>
                      <div className="px-4 py-[5px] bg-[#f2f4ff] rounded-[10px] text-[13px] font-semibold text-[#4661e6] ">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between  w-full md:w-8">
                    <button onClick={() => {setUpVote(!upVote),UpVote()} } className={`flex flex-row items-center  gap-2.5 py-1.5 pl-4 pr-[13px] ${upVote ? "bg-[#cfd7ff]" : "bg-[#f2f4fe] hover:bg-[#f2f4fe80] "} rounded-[10px] md:hidden`}>
                      <img src="./assets/shared/icon-arrow-up.svg" alt="" />
                      <p className="text-[13px] tracking-[-0.18px] font-bold ">
                        {item.upvotes}
                      </p>
                    </button>
                    <div className="flex flex-row items-center justify-between gap-1">
                      <img src="./assets/shared/icon-comments.svg" alt="" />
                      <p className="text-[#3a4374] text-[13px] tracking-[0.18px] font-bold">
                        {item.commentNo}
                      </p>
                    </div>
                  </div>
                </>
              </div>
    </>
  )
}

export default Feedback