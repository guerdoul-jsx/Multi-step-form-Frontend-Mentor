import "./App.css";
import FormContainer from "./Components/FormContainer";
import { StepsProvider } from "./Context/StepsContext";

function App() {
  return (
    <div className="w-full flex-1 items-center justify-center">
      <StepsProvider>
        <FormContainer />
      </StepsProvider>
    </div>
  );
}

export default App;
