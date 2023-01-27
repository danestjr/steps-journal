import Walking from "./components/Walking";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import Landing from "./components/Landing"
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter ([ 
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/journal",
    element: <Walking />
  },
  {
    path: "/journal/add",
    element: <AddForm />
  },
  {
    path: "/journal/edit",
    element: <EditForm />
  }
  ])

function App() {

  return (
    <div>
     <RouterProvider router={router} />
    </div>
  )

}
export default App;
