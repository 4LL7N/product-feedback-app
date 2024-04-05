import { Context } from "./Context";
import Header from "./Header";

function Suggestion() {
  const context = Context();
  const dataInfo = context.dataInfo as string[];

  console.log(dataInfo);
  return (
    <div>
      <Header />
      {context.dataInfo.productRequests.map((item: any) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>{item.description}</p>
          <p>{item.category}</p>
          <p>{item.upvotes}</p>

          {Array.isArray(item.comments) ? item.comments.length : 0}
        </div>
      ))}
    </div>
  );
}

export default Suggestion;
