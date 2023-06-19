import "./App.css";
import FormContainer from "./Components/FormContainer";
import TestContainer from "./Components/TestContainer";
import { StepsProvider } from "./Context/StepsContext";

function App() {
  return (
    <div className="items-center justify-center flex-1 w-full">
      <StepsProvider>
        {/* <TestContainer /> */}
        <FormContainer />
      </StepsProvider>
    </div>
  );
}

export default App;
