import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Suggestion from "./page/Suggestion";
import FeedbackDetails from "./page/FeedbackDetails";
import NewFeedback from "./page/NewFeedback";
import EditFeedback from "./page/EditFeedback";
import RoadMap from "./page/RoadMap";
import { Productfeedback } from "./page/Context";

const router = createBrowserRouter([
    {
      path:"/",
      element:<Suggestion/>
    },
    {
      path:"/:feedbackdetails",
      element:<FeedbackDetails/>
    },
    {
      path:"/newfeedback",
      element:<NewFeedback/>
    },
    {
      path:"/editfeedback",
      element:<EditFeedback/>
    },
    {
      path:"/roadmap",
      element:<RoadMap/>
    }
  ]);

function App() {
 
  

  return (
    <>
      <Productfeedback.Provider value={{}} >
          <RouterProvider router={router} />
      </Productfeedback.Provider>
    </>
  )
}

export default App
