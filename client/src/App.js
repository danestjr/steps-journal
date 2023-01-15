import Walking from "./components/Walking";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import Header from "./components/Header"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";

const router = createBrowserRouter ([ 
  {
    path: "/",
    element: <Walking />
  },
  {
    path: "/add",
    element: <AddForm />
  },
  {
    path: "/edit",
    element: <EditForm />
  }
  ])

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <Header user={user} color="dark" dark={true} expand='sm' />
        <div className="content">
          <h3>{user.given_name}'s Walking Log</h3>
          <RouterProvider router={router} />
        </div>
      </div>
  )
}
  return (
    <div>
      <Header user={false} color="dark" dark="true" expand='sm' />
      <div className="content">
        <p> Please login above </p>
      </div>
    </div>
  )

}
export default App;
