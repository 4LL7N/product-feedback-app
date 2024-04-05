import { useState } from "react";

function Replies({items}:any) {

    const [reply, setReply] = useState<boolean>(false)
    console.log(items);
    
  return (
    <>
      <div className="flex items-center justify-between w-[100%]  mt-[24px]">
        <div className="flex gap-[16px] ">
          <img
            className="w-[40px] h-[40px] rounded-[50%] "
            src={items.user.image}
            alt=""
          />
          <div>
            <h3 className="text-[#3a4374] text-[13px] font-bold ">
              {items.user.name}
            </h3>
            <p className="text-[#647196] text-[13px] ">
              @{items.user.username}
            </p>
          </div>
        </div>
        <p
          className="text-[#4661e6] text-[13px] font-semibold "
          onClick={() => setReply(!reply)}
        >
          Reply
        </p>
      </div>
      <div className="mt-[16px]">
        <p className="text-[13px] text-[#647196] ">
          <a className="text-[13px] text-[#ad1fea] font-bold ">
            @{items.user.username}{" "}
          </a>
          {items.content}
        </p>
      </div>
      <div className={reply ? "flex mt-[24px] justify-start gap-[16px] " : "hidden"}>
        <textarea
          placeholder="Type your comment here"
          maxLength={250}
          className="bg-[#f7f8fd] p-[16px] text-[#3a4374] text-[15px] focus:outline-[#4661e6] focus:border-solid focus:border-[#4661e6] w-[100%] rounded-[5px] max-h-[80px] resize-none "
        ></textarea>
        <button className="px-[16px] py-[10.5px] bg-[#ad1fea] rounded-[10px] h-fit ">
          <p className="text-[#f2f4fe] text-[13px] font-bold ">Reply</p>
        </button>
      </div>
    </>
  );
}

export default Replies;
