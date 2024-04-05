import { useParams } from "react-router-dom";
// import { Productfeedback } from "./Context";
import { useEffect, useState } from "react";
import { ProductRequest, dataStyle } from "./style";

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
          <div className="rounded-[10px] p-[24px] bg-[#ffffff] " >
            {feedback?.comments?.map(() => {

              return(
                <>
                </>
              )
            })}

          </div>
        </section>
      </main>
    </>
  );
}

export default FeedbackDetails;
