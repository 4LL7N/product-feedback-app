import { useState } from "react";
import { CommnetReplyStyle, replies} from "../page/style";
import Replies from "./Replies";

function Commentreply({item,index,feedback}:CommnetReplyStyle) {

    const [commnetReply,setCommnetReply] = useState<boolean>(false)

  return (
    <>
      <div
        className={` mt-[24px] pb-[24px] ${
          index + 1 === feedback?.comments?.length
            ? ""
            : "border-b border-b-solid border-b-[#8c92b338]"
        } `}
      >
        <div className="flex items-center justify-between w-[100%] ">
          <div className="flex gap-[16px] ">
            <img
              className="w-[40px] h-[40px] rounded-[50%] "
              src={item.user.image}
              alt=""
            />
            <div>
              <h3 className="text-[#3a4374] text-[13px] font-bold ">
                {item.user.name}
              </h3>
              <p className="text-[#647196] text-[13px] ">
                @{item.user.username}
              </p>
            </div>
          </div>
          <p className="text-[#4661e6] text-[13px] font-semibold " onClick={() => setCommnetReply(!commnetReply)} >Reply</p>
        </div>
        <div className="mt-[16px]">
          <p className="text-[13px] text-[#647196] ">{item.content}</p>
        </div>
        <div className={`${item.replies ? "flex" : ""} `}>
          <div
            className={
              item.replies
                ? ` bg-[#8c92b338] w-[1px] h-[216px] mt-[24px]`
                : "hidden"
            }
          />
          <div className="ml-[23px] ">
            {item.replies?.map((items: replies) => {
              return (
                <>
                  <Replies items={items} />
                </>
              );
            })}
          </div>
        </div>
        <div className={commnetReply ? "flex mt-[24px] justify-start gap-[16px] " : "hidden"}>
        <textarea
          placeholder="Type your comment here "
          maxLength={250}
          className="bg-[#f7f8fd] p-[16px] text-[#3a4374] text-[15px] focus:outline-[#4661e6] focus:border-solid focus:border-[#4661e6] w-[100%] rounded-[5px] max-h-[80px] resize-none "
        ></textarea>
        <button className="px-[16px] py-[10.5px] bg-[#ad1fea] rounded-[10px] h-fit ">
          <p className="text-[#f2f4fe] text-[13px] font-bold ">Reply</p>
        </button>
      </div>
      </div>
    </>
  );
}

export default Commentreply;
