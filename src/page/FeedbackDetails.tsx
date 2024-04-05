import { Context } from "./Context";


function FeedbackDetails() {

  const data = Context().Data
  console.log(data);
  

  return (
    <>
      <main className="bg-[#f7f8fd] w-[100vw] min-h-[100vh] p-[24px] " >
        <header className="flex items-center justify-between" >
          <div className="flex items-center gap-[16px]" >
            <img className="h-[10px]" src="/assets/shared/icon-arrow-left.svg" alt="" />
            <p className="text-[16px] text-[#647196] font-bold  " >Go Back</p>
          </div>
          <button className="px-[16px] py-[10.5px] bg-[#4661e6] rounded-[10px] " >
              <p className="text-[13px] text-[#f2f4fe] font-bold " >Edit Feedback</p>
          </button>
        </header>
        <section className="rounded-[10x] p-[24px] bg-[#ffffff] " >

        </section>
      </main>
    </>
  );
}

export default FeedbackDetails;