import { CommnetReplyStyle, replies} from "../page/style";
import Replies from "./Replies";

function CommnetReply({item,index,feedback}:CommnetReplyStyle) {
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
          <p className="text-[#4661e6] text-[13px] font-semibold ">Reply</p>
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
      </div>
    </>
  );
}

export default CommnetReply;
