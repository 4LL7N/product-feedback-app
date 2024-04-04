import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Suggestion from "./page/Suggestion";
import FeedbackDetails from "./page/FeedbackDetails";
import NewFeedback from "./page/NewFeedback";
import EditFeedback from "./page/EditFeedback";
import RoadMap from "./page/RoadMap";
import { Productfeedback } from "./page/Context";
import { useEffect, useState } from "react";
import data from "../data.json"

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
 
  const [Data ,setData] = useState<any>()
  console.log(data)
  useEffect(() => {
    setData(data)
  },[])

  return (
    <>
      <Productfeedback.Provider value={{
        data,
        setData
      }} >
          <RouterProvider router={router} />
      </Productfeedback.Provider>
    </>
  )
}

export default App
