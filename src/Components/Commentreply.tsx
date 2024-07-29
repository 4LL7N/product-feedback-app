import { useEffect, useRef, useState } from "react";
import { Comment, CommentReplyStyle, replies } from "../page/style";
import { useParams } from "react-router-dom";
import axios from "axios";

function Commentreply({
  item,
  index,
  feedback,
  setFeedback,
  user,
  productRequests,
  reply
}: CommentReplyStyle) {
  const [commnetReply, setCommnetReply] = useState<boolean>(false);
  const [replyTo, setReplyTo] = useState<string>();
  const replyText = useRef<HTMLTextAreaElement>(null);
  const [comId, setComId] = useState<number>(0);
  const params = useParams<{ feedbackdetails: string }>();
  const [comErr, setComErr] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);
  
  
  
  // console.log(comId);

  // async function addReply(body:object) {
  //   try {
  //     const response = await axios.post(
  //       `https://product-feedback-app-backend-sy6o.onrender.com/api/v1/replies`,
  //       body
  //     );
  //     console.log(await response.data.data.doc);
  //     return await response.data.data.doc
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  
  // const reply =async () => {

  //   if(replyText.current?.value == ""){

  //     setComErr(true)

  //   }else{

  //   // let newComments: Comment[] | undefined = [...(feedback.comments ?? [])];

  //   // let Com: Comment | undefined = feedback?.comments?.find((item) => {
  //   //   return item.id == comId;
  //   // });

  //   let newReply = {
  //     content:replyText.current?.value,
  //     replyingTo:replyTo,
  //     commentOn:comId.toString()
  //   }
  //   console.log(newReply);
    
  //   const replyDoc = await addReply(newReply)
  //   console.log(replyDoc);
    
  //   // console.log(comId);
  //   // console.log(feedback);
    
  //   let newFeedback = feedback
  //   // console.log(newFeedback);
  //   let newComments = feedback.comments
  //   // console.log(newComments);
  //   let newReplies = feedback.comments?.replies || []
  //   // console.log(newReplies);
    

  //   // let newReplies: replies[] = [...(Com?.replies ?? [])];

  //   newReplies?.push(newReply);
  //   newComments.forEach((item:Comment) => {
  //     if(item.id == comId){
  //       item.replies = newReplies
  //     }
  //   })
  //   newFeedback.comments = newComments
  //   console.log(newFeedback);
    
  //   setFeedback(newFeedback)
  //   // new
    

  //   // if (feedback?.comments) {
  //   //   for (let i = 0; i < feedback?.comments?.length; i++) {
  //   //     if (feedback.comments[i].id == comId) {
  //   //       // newComments[i]["replies"] = newReplies;
  //   //     }
  //   //   }
  //   // }

  //   // let newFeedback = {
  //   //   id: feedback.id,
  //   //   title: feedback.title,
  //   //   category: feedback.category,
  //   //   upvotes: feedback.upvotes,
  //   //   status: feedback.status,
  //   //   description: feedback.description,
  //   //   // comments: [...(newComments ?? [])],
  //   // };

  //   // setFeedback(newFeedback);
  //   // if (productRequests) {
  //   //   for (let i = 0; i < productRequests?.length; i++) {
  //   //     if(productRequests[i].id === Number(params.feedbackdetails)){
  //   //       let posts = productRequests
  //   //          newFeedback? posts[i] = newFeedback:null
  //   //         let newdata = {
  //   //           currentUser:user,
  //   //           productRequests:posts
  //   //         }
  //   //         localStorage.setItem("data",JSON.stringify(newdata))
  //   //     }
  //   //   }
  //   // }
  //   setComErr(false)
    
  //   }
  // };

  return (
    <>
      <div
        className={` mt-[24px] pb-[24px] md:relative overflow-hidden ${
          index + 1 === feedback?.comments?.length
            ? ""
            : "border-b border-b-solid border-b-[#8c92b338]"
        } `}
      >
        <div className="flex items-center justify-between w-[100%] ">
          <div className="flex gap-[16px] md:gap-[32px] ">
            <img
              className="w-[40px] h-[40px] rounded-[50%] cursor-pointer "
              src={item?.user?.image}
              alt=""
            />
            <div>
              <h3 className="text-[#3a4374] hover:text-[#3a437480] text-[13px] font-bold cursor-pointer ">
                {item.user?.name}
              </h3>
              <p className="text-[#647196] hover:text-[#3a437480] text-[13px] cursor-pointer ">
                @{item.user?.username}
              </p>
            </div>
          </div>
          <p
            className="text-[#4661e6] hover:text-[#4661e680] text-[13px] font-semibold cursor-pointer "
            onClick={() => {
              setCommnetReply(!commnetReply);
              commnetReply?setComErr(false):null
              setReplyTo(item?.user?.username);
              item.id ? setComId(item?.id) : null;
            }}
          >
            Reply
          </p>
        </div>
        <div className="mt-[16px] md:ml-[70px] ">
          <p className="text-[13px] text-[#647196] ">{item.content}</p>
        </div>
        <div className={`${item.replies ? "flex w-[100%] " : ""} `}>
          <div
            className={
              item.replies
                ? ` bg-[#8c92b338] w-[1px] h-[216px] mt-[24px] md:absolute md:top-[63px] md:left-[18px] md:mt-0 `
                : "hidden"
            }
          />
          <div className="ml-[23px] md:ml-[43px] md:mt-[8px] w-[100%] ">
            {item.replies?.map((items: replies,i:number) => {
              
              
              return (
                <>
                  <div key={i} className="flex items-center justify-between w-[100%]  mt-[24px]">
                    <div className="flex gap-[16px] md:gap-[32px] ">
                      <img
                        className="w-[40px] h-[40px] rounded-[50%] cursor-pointer "
                        src={items.user?.image}
                        alt=""
                      />
                      <div>
                        <h3 className="text-[#3a4374] hover:text-[#3a437480] text-[13px] font-bold cursor-pointer ">
                          {items.user?.name}
                        </h3>
                        <p className="text-[#647196] hover:text-[#3a437480] text-[13px] cursor-pointer ">
                          @{items.user?.username}
                        </p>
                      </div>
                    </div>
                    <p
                      className="text-[#4661e6] #4661e680 text-[13px] font-semibold cursor-pointer  "
                      onClick={() => {
                        setCommnetReply(!commnetReply);
                        commnetReply?setComErr(false):null
                        setReplyTo(items.user?.username);
                        item.id ? setComId(item?.id) : null;
                      }}
                    >
                      Reply
                    </p>
                  </div>
                  <div className="mt-[16px] md:ml-[72px]">
                    <p className="text-[13px] text-[#647196] ">
                      <a className="text-[13px] text-[#ad1fea] hover:text-[rgba(173,31,234,0.5)] font-bold cursor-pointer ">
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
            commnetReply ? "flex mt-[24px] justify-start gap-[16px] md:ml-[112px] " : "hidden"
          }
        >
          <div className="w-[100%]" >
          <textarea
            ref={replyText}
            placeholder="Type your comment here "
            maxLength={250}
            className={`bg-[#f7f8fd] p-[16px] text-[#3a4374] text-[15px] focus:outline-[#4661e6] focus:border-solid focus:border-[#4661e6] w-[100%] rounded-[5px] max-h-[80px] resize-none ${
              comErr ? "border border-solid border-[#d73737]" : ""
            }  `}
          ></textarea>
          <p className={`text-[14px] text-[#d73737] ${comErr?"":"hidden"}`} >Can’t be empty</p>
          </div>
          <button
            className="px-[16px] py-[10.5px] bg-[#ad1fea] hover:bg-[#ad1fea80] rounded-[10px] h-fit "
            onClick={()=>{
              reply(replyText,comId,replyTo,comErr,setComErr)
              // setComErr(false)
              setTimeout(() => {setRender(!render),console.log("render");
              },1500)
            }}
          >
            <p className="text-[#f2f4fe] text-[13px] font-bold ">Reply</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default Commentreply;
