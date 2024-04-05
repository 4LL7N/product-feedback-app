import { useRef, useState } from "react";
import { Comment, CommnetReplyStyle, replies } from "../page/style";

function Commentreply({
  item,
  index,
  feedback,
  setFeedback,
  user,
}: CommnetReplyStyle) {
  const [commnetReply, setCommnetReply] = useState<boolean>(false);
  const [replyTo, setReplyTo] = useState<string>();
  const replyText = useRef<HTMLTextAreaElement>(null);
  const [comId, setComId] = useState<number>(0);
  const reply = () => {
    let newComments: Comment[] | undefined = [...(feedback.comments ?? [])];

    let Com: Comment | undefined = feedback?.comments?.find((item) => {
      return item.id == comId;
    });

    let newReplies: replies[] = [...(Com?.replies ?? [])];

    newReplies?.push({
      content: replyText.current?.value,
      replyingTo: replyTo,
      user: {
        image: user?.image,
        name: user?.name,
        username: user?.username,
      },
    });

    if (feedback?.comments) {
      for (let i = 0; i < feedback?.comments?.length; i++) {
        if (feedback.comments[i].id == comId) {
          newComments[i]["replies"] = newReplies;
        }
      }
    }

    let newFeedback = {
      id: feedback.id,
      title: feedback.title,
      category: feedback.category,
      upvotes: feedback.upvotes,
      status: feedback.status,
      description: feedback.description,
      comments: [...(newComments ?? [])],
    };

    setFeedback(newFeedback);
  };

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
              src={item?.user?.image}
              alt=""
            />
            <div>
              <h3 className="text-[#3a4374] text-[13px] font-bold ">
                {item.user?.name}
              </h3>
              <p className="text-[#647196] text-[13px] ">
                @{item.user?.username}
              </p>
            </div>
          </div>
          <p
            className="text-[#4661e6] text-[13px] font-semibold "
            onClick={() => {
              setCommnetReply(!commnetReply);
              setReplyTo(item?.user?.username);
              item.id ? setComId(item?.id) : null;
            }}
          >
            Reply
          </p>
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
                  <div className="flex items-center justify-between w-[100%]  mt-[24px]">
                    <div className="flex gap-[16px] ">
                      <img
                        className="w-[40px] h-[40px] rounded-[50%] "
                        src={items.user?.image}
                        alt=""
                      />
                      <div>
                        <h3 className="text-[#3a4374] text-[13px] font-bold ">
                          {items.user?.name}
                        </h3>
                        <p className="text-[#647196] text-[13px] ">
                          @{items.user?.username}
                        </p>
                      </div>
                    </div>
                    <p
                      className="text-[#4661e6] text-[13px] font-semibold "
                      onClick={() => {
                        setCommnetReply(!commnetReply);
                        setReplyTo(items.user?.username);
                        item.id ? setComId(item?.id) : null;
                      }}
                    >
                      Reply
                    </p>
                  </div>
                  <div className="mt-[16px]">
                    <p className="text-[13px] text-[#647196] ">
                      <a className="text-[13px] text-[#ad1fea] font-bold ">
                        @{items.replyingTo}{" "}
                      </a>
                      {items.content}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div
          className={
            commnetReply ? "flex mt-[24px] justify-start gap-[16px] " : "hidden"
          }
        >
          <textarea
            ref={replyText}
            placeholder="Type your comment here "
            maxLength={250}
            className="bg-[#f7f8fd] p-[16px] text-[#3a4374] text-[15px] focus:outline-[#4661e6] focus:border-solid focus:border-[#4661e6] w-[100%] rounded-[5px] max-h-[80px] resize-none "
          ></textarea>
          <button
            className="px-[16px] py-[10.5px] bg-[#ad1fea] rounded-[10px] h-fit "
            onClick={reply}
          >
            <p className="text-[#f2f4fe] text-[13px] font-bold ">Reply</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default Commentreply;
