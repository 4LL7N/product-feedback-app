import { useParams } from "react-router-dom";
// import { Productfeedback } from "./Context";
import { useEffect, useState } from "react";
import { Comment, ProductRequest, dataStyle, replies } from "./style";
import Replies from "../Components/Replies";
import React from "react";

function FeedbackDetails() {
  // const data =localStorage.getItem("data")
  const params = useParams<{ feedbackdetails: string }>();

  const [feedback, setFeedback] = useState<ProductRequest>();
  const [upVote, setUpVote] = useState<boolean>(false);

  // console.log(data);
  useEffect(() => {
    let votes = feedback?.upvotes;

    console.log(votes);
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
              console.log(index, feedback?.comments?.length);

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
                      <p className="text-[#4661e6] text-[13px] font-semibold ">
                        Reply
                      </p>
                    </div>
                    <div className="mt-[16px]">
                      <p className="text-[13px] text-[#647196] ">
                        {item.content}
                      </p>
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
            })}
          </div>
          <div className="bg-[#ffffff] p-[24px] mt-[24px]">
            <h2 className="text-[#3a4374] text-[18px] font-bold ">
              Add Comment
            </h2>
            <textarea
              placeholder="Type your comment here"
              maxLength={250}
              className="bg-[#f7f8fd] p-[16px] text-[#3a4374] text-[15px] focus:outline-[#4661e6] focus:border-solid focus:border-[#4661e6] mt-[24px] w-[100%] rounded-[5px] "
            ></textarea>
            <div className="flex items-center justify-between mt-[16px] ">
              <p className="text-[#647196] text-[13px] ">250 Characters left</p>
              <button className="px-[16px] py-[10.5px] bg-[#ad1fea] rounded-[10px] ">
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
