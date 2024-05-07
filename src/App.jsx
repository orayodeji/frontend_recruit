import { ToastContainer } from "react-toastify";
// import Routes from "./routes";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="colored"
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      Hello world
      {/* <Outlet /> */}
    </div>
  );
}

export default App;
