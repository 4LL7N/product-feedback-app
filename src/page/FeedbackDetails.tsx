import { useNavigate, useParams } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import { Comment, ProductRequest } from "./style";
import axios from "axios";
import CommentReply from "../Components/Commentreply";

function FeedbackDetails() {
  const params = useParams<{ feedbackdetails: string }>();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<ProductRequest>();
  const [upVote, setUpVote] = useState<boolean>(false);
  const [comErr, setComErr] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false)
  const [text, setText] = useState("");
  
  async function getFeedback() {
    try {
      const response = await axios.get(
        `https://product-feedback-app-backend-sy6o.onrender.com/api/v1/feedbacks/${params.feedbackdetails}`
      );
      setFeedback(await response.data.data.doc);
    } catch (error) {
      console.error(error);
    }
  }
  
  async function updateFeedback(body:object) {
    try {
      await axios.patch(
        `https://product-feedback-app-backend-sy6o.onrender.com/api/v1/feedbacks/${params.feedbackdetails}`,
        body
      );
    } catch (error) {
      console.error(error);
    }
  }
  
  async function addReply(body:object) {
    try {
      const response = await axios.post(
        `https://product-feedback-app-backend-sy6o.onrender.com/api/v1/replies`,
        body
      );
      console.log(await response.data.data.doc);
      return await response.data.data.doc
    } catch (error) {
      console.error(error);
    }
  }
  
  async function addComment(body:object) {
    try {
      const response = await axios.post(
        `https://product-feedback-app-backend-sy6o.onrender.com/api/v1/comments`,
        body
      );
      return await response.data.data.doc
    } catch (error) {
      console.error(error);
    }
  }


  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setText(event.target.value);
  };

  async function post(feedbackId:number|undefined){
    if (text == "") {
      setComErr(true);
    } else {
      let Com = {
        content: text,
        feedback:feedbackId
      };
      console.log(Com);
      
      const newComment = await addComment(Com)
      console.log(newComment);
      
      let newFeedback = feedback
      let newComments = feedback?.comments

      newComments.push(newComment)
      newFeedback? newFeedback.comments = newComments : null

      setFeedback(newFeedback)
      setText("");
      setComErr(false)
    }
  };

    const vote = () => {
      let votes: number|any = feedback?.upvotes;

      if (!upVote && votes) {
        votes += 1;
      } else if (votes) {
        votes -= 1;
      }

      let Feedback = feedback
      Feedback ? Feedback['upvotes'] = votes:null
      
      updateFeedback({upvotes:votes})
      setFeedback(Feedback)
    }


  
  async function reply(replyText:React.RefObject<HTMLTextAreaElement>,comId:number,replyTo:string|undefined,setComErr:(comErr:boolean)=> void){

    if(replyText.current?.value == ""){

      setComErr(true)

    }else{

    let newReply = {
      content:replyText.current?.value,
      replyingTo:replyTo,
      commentOn:comId.toString()
    }
    
    const replyDoc = await addReply(newReply)    
    
    let newFeedback = feedback
    let newComments = feedback?.comments
    let oneComment:Comment|undefined 
    newComments.forEach((item:Comment) => {if(item.id == comId) oneComment = item })      
    let newReplies = oneComment?.replies || []

    newReplies?.push(replyDoc);
    newComments.forEach((item:Comment) => {
      if(item.id == comId){
        item.replies = newReplies
      }
    })
    newFeedback?newFeedback.comments = newComments : null
    replyText.current? replyText.current.value = "" :null
    setFeedback(newFeedback)
    setComErr(false)
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <>
      <main className="flex flex-col items-center bg-[#f7f8fd] w-[100vw] min-h-[100vh] py-[24px]  md:py-[56px] lg:py-[80px] ">
        <header className="flex items-center justify-between w-[327px] md:w-[689px] lg:w-[730px] ">
          <div
            className="flex items-center gap-[16px] cursor-pointer "
            onClick={() => navigate('/')}
          >
            <img
              className="h-[10px] cursor-pointer "
              src="/assets/shared/icon-arrow-left.svg"
              alt=""
            />
            <p className="text-[16px] text-[#647196] font-bold cursor-pointer ">
              Go Back
            </p>
          </div>
          <button
            className="px-[16px] py-[10.5px] bg-[#4661e6] hover:bg-[#4661e680] rounded-[10px] "
            onClick={() => {
              navigate(`editfeedback`),
                localStorage.setItem("title", JSON.stringify(feedback?.title)),
                localStorage.setItem(
                  "description",
                  JSON.stringify(feedback?.description)
                ),
                localStorage.setItem(
                  "category",
                  JSON.stringify(feedback?.category)
                ),
                localStorage.setItem(
                  "status",
                  JSON.stringify(feedback?.status)
                );
            }}
          >
            <p className="text-[13px] text-[#f2f4fe] font-bold ">
              Edit Feedback
            </p>
          </button>
        </header>
        <section className="mt-[24px] w-[327px] md:w-[689px] lg:w-[730px] ">
          <div className="rounded-[10px] p-[24px] bg-[#ffffff] md:flex md:gap-[40px] md:relative ">
            <button
              className={`hidden md:flex items-center gap-[10px] ${
                upVote ? "bg-[#cfd7ff]" : "bg-[#f2f4fe] hover:bg-[#f2f4fe80] "
              } rounded-[10px] pl-[16px] pr-[13px] py-[7px] h-fit `}
              onClick={() => {setUpVote(!upVote),vote()}}
            >
              <img
                className="w-[8px] h-[6px] "
                src="/assets/shared/icon-arrow-up.svg"
                alt=""
              />
              <p className="text-[13px] text-[#3a4374] font-bold ">
                {feedback?.upvotes}
              </p>
            </button>
            <div>
              <h1 className=" text-[13px] text-[#3a4374] font-bold ">
                {feedback?.title}
              </h1>
              <p className="text-[#647196] text-[13px] mt-[9px] ">
                {feedback?.description}
              </p>
              <div className=" w-min flex px-[16px] py-[6px] bg-[#f2f4ff] mt-[10px] rounded-[10px] ">
                <p className="text-[13px] text-[#4661e6] font-semibold ">
                  {feedback?.category}
                </p>
              </div>
              <div className=" flex items-center justify-between mt-[14px] ">
                <button
                  className={`md:hidden flex items-center gap-[10px] ${
                    upVote
                      ? "bg-[#cfd7ff]"
                      : "bg-[#f2f4fe] hover:bg-[#f2f4fe80]"
                  } rounded-[10px] pl-[16px] pr-[13px] py-[7px] `}
                  onClick={() => setUpVote(!upVote)}
                >
                  <img
                    className="w-[8px] h-[6px] "
                    src="/assets/shared/icon-arrow-up.svg"
                    alt=""
                  />
                  <p className="text-[13px] text-[#3a4374] font-bold ">
                    {feedback?.upvotes}
                  </p>
                </button>
                <div className="flex items-center gap-[7px] md:absolute md:top-[64px] md:right-[32px] ">
                  <img
                    className="w-[18px] h-[16px] mb-[-3px] "
                    src="/assets/shared/icon-comments.svg"
                    alt=""
                  />
                  <p className="text-[13px] text-[#3a4374] font-bold ">
                    {feedback?.comments?.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[10px] p-[24px] md:p-[34px] md:pt-[34px]  bg-[#ffffff] mt-[24px] ">
            <h2 className="text-[#3a4374] text-[18px] font-bold ">
              {feedback?.comments?.length}{" "}
              {feedback?.comments?.length && feedback?.comments?.length > 1
                ? "Comments"
                : "Comment"}{" "}
            </h2>
            {feedback?.comments?.map((item: Comment, index: number) => {
              
              
              return (
                <>
                  <CommentReply
                    key={index * 14}
                    item={item}
                    index={index}
                    feedback={feedback}
                    reply={reply}
                  />
                </>
              );
            })}
          </div>
          <div className="bg-[#ffffff] p-[24px] mt-[24px] md:p-[34px] md:pt-[24px] ">
            <h2 className="text-[#3a4374] text-[18px] font-bold ">
              Add Comment
            </h2>
            <div>
              <textarea
                value={text}
                onChange={handleChange}
                placeholder="Type your comment here"
                maxLength={250}
                className={`bg-[#f7f8fd] p-[16px] text-[#3a4374] text-[15px] focus:outline-[#4661e6] focus:border-solid focus:border-[#4661e6] mt-[24px] w-[100%] rounded-[5px] resize-none ${
                  comErr ? "border border-solid border-[#d73737]" : ""
                } `}
              ></textarea>
              <p
                className={`text-[14px] text-[#d73737] ${
                  comErr ? "" : "hidden"
                }`}
              >
                Can’t be empty
              </p>
            </div>
            <div className="flex items-center justify-between mt-[16px] ">
              <p className="text-[#647196] text-[13px] ">250 Characters left</p>
              <button
                className="px-[16px] py-[10.5px] bg-[#ad1fea] hover:bg-[#ad1fea80] rounded-[10px] "
                onClick={() => {
                  post(feedback?.id)
                  setTimeout(() => {setRender(!render)
                  },2000)
                }}
              >
                <p className="text-[#f2f4fe] text-[13px] font-bold ">
                  Post Comment
                </p>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default FeedbackDetails;
