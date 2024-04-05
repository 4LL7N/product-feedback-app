import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Comment, ProductRequest, User, dataStyle } from "./style";
import Commentreply from "../Components/Commentreply";

function FeedbackDetails() {
  const params = useParams<{ feedbackdetails: string }>();

  const [feedback, setFeedback] = useState<ProductRequest>();
  const [upVote, setUpVote] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const NewComment = useRef<HTMLTextAreaElement>(null);

  const post = () => {
    let Comments = feedback?.comments;
    let id = 0;
    let rightnum = false;
    if (Comments) {
      while (!rightnum) {
        id = Math.floor(Math.random() * 10) + 1;
        for (let i = 0; i < Comments?.length; i++) {
          console.log(id, Comments[i].id, i);

          if (id == Comments[i].id) {
            break;
          }
          if (i == Comments?.length - 1) {
            rightnum = true;
          }
        }
      }
    }
    Comments ? console.log(Comments[0]) : null;
    let Com = {
      content: NewComment.current?.value,
      id: id,
      user: {
        image: user?.image,
        name: user?.name,
        username: user?.username,
      },
    };
    Comments?.push(Com);console.log(feedback);

    let newfeedback: ProductRequest | undefined;

    if (feedback) {
      newfeedback = {
        id: feedback?.id,
        title: feedback?.title,
        category: feedback?.category,
        upvotes: feedback?.upvotes,
        status: feedback?.status,
        description: feedback?.description,
        comments: [...(Comments ?? [])],
      };
    }

    setFeedback(newfeedback);
  };

  useEffect(() => {
    let votes = feedback?.upvotes;

    if (upVote && votes) {
      votes += 1;
    } else if (votes) {
      votes -= 1;
    }
    let newfeedback: any = {
      id: feedback?.id,
      title: feedback?.title,
      category: feedback?.category,
      upvotes: votes,
      status: feedback?.status,
      description: feedback?.description,
      comments: [...(feedback?.comments ?? [])],
    };
    setFeedback(newfeedback);
  }, [upVote]);

  useEffect(() => {
    let datastr = localStorage.getItem("data");
    let data: dataStyle = datastr ? JSON.parse(datastr) : null;
    setUser(data.currentUser);
    const post = data?.productRequests.find((item) => {
      return item.id === Number(params.feedbackdetails);
    });

    setFeedback(post);
  }, []);

  return (
    <>
      <main className="bg-[#f7f8fd] w-[100vw] min-h-[100vh] p-[24px] ">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <img
              className="h-[10px]"
              src="/assets/shared/icon-arrow-left.svg"
              alt=""
            />
            <p className="text-[16px] text-[#647196] font-bold  ">Go Back</p>
          </div>
          <button className="px-[16px] py-[10.5px] bg-[#4661e6] rounded-[10px] ">
            <p className="text-[13px] text-[#f2f4fe] font-bold ">
              Edit Feedback
            </p>
          </button>
        </header>
        <section className="mt-[24px]">
          <div className="rounded-[10px] p-[24px] bg-[#ffffff] ">
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
                className={`flex items-center gap-[10px] ${
                  upVote ? "bg-[#cfd7ff]" : "bg-[#f2f4fe]"
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
              <div className="flex items-center gap-[7px]">
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
          <div className="rounded-[10px] p-[24px] bg-[#ffffff] mt-[24px] ">
            <h2 className="text-[#3a4374] text-[18px] font-bold ">
              {feedback?.comments?.length}{" "}
              {feedback?.comments?.length && feedback?.comments?.length > 1
                ? "Comments"
                : "Comment"}{" "}
            </h2>
            {feedback?.comments?.map((item: Comment, index: number) => {
              return (
                <>
                  <Commentreply
                    key={index}
                    user={user}
                    item={item}
                    index={index}
                    feedback={feedback}
                    setFeedback={setFeedback}
                  />
                </>
              );
            })}
          </div>
          <div className="bg-[#ffffff] p-[24px] mt-[24px]">
            <h2 className="text-[#3a4374] text-[18px] font-bold ">
              Add Comment
            </h2>
            <textarea
              ref={NewComment}
              placeholder="Type your comment here"
              maxLength={250}
              className="bg-[#f7f8fd] p-[16px] text-[#3a4374] text-[15px] focus:outline-[#4661e6] focus:border-solid focus:border-[#4661e6] mt-[24px] w-[100%] rounded-[5px] "
            ></textarea>
            <div className="flex items-center justify-between mt-[16px] ">
              <p className="text-[#647196] text-[13px] ">250 Characters left</p>
              <button
                className="px-[16px] py-[10.5px] bg-[#ad1fea] rounded-[10px] "
                onClick={post}
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
