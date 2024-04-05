import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Suggestion from "./page/Suggestion";
import FeedbackDetails from "./page/FeedbackDetails";
import NewFeedback from "./page/NewFeedback";
import EditFeedback from "./page/EditFeedback";
import RoadMap from "./page/RoadMap";
import { Productfeedback } from "./page/Context";
import { useEffect, useState } from "react";
import data from "../data.json";
import { dataStyle } from "./page/style";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suggestion />,
  },
  {
    path: "/:feedbackdetails",
    element: <FeedbackDetails />,
  },
  {
    path: "/newfeedback",
    element: <NewFeedback />,
  },
  {
    path: "/editfeedback",
    element: <EditFeedback />,
  },
  {
    path: "/roadmap",
    element: <RoadMap />,
  },
]);

function App() {
  // const [Data, setData] = useState<dataStyle>(data);
  // console.log(data);
  // useEffect(() => {
  //   setData(data);
  // }, []);
  const [close, setClose] = useState<boolean>(false);
  const [dataInfo, setDataInfo] = useState<dataStyle>(data);
  const [filterCategory, setFilterCategory] = useState<string>("");
  useEffect(() => {
    setDataInfo(data);
  }, []);
  return (
    <>
      <Productfeedback.Provider
        value={{
          close,
          setClose,
          dataInfo,
          setDataInfo,
          filterCategory,
          setFilterCategory,
        }}
      >
        <RouterProvider router={router} />
      </Productfeedback.Provider>
    </>
  );
}

export default App;
