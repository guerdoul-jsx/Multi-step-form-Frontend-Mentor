import { Toaster } from "react-hot-toast";
import "./App.css";
import FormContainer from "./Components/FormContainer";
import { StepsProvider } from "./Context/StepsContext";

function App() {
  return (
    <div className="items-center justify-center w-full h-screen bg-magnolia md:bg-none">
      <StepsProvider>
        {/* <TestContainer /> */}
        <Toaster />
        <FormContainer />
      </StepsProvider>
    </div>
  );
}

export default App;
