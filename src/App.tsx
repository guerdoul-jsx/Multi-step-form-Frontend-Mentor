import { Toaster } from "react-hot-toast";
import "./App.css";
import FormContainer from "./Components/FormContainer";
import { StepsProvider } from "./Context/StepsContext";
import { AppContainer } from "./main.style";

function App() {
  return (
    <AppContainer>
      <StepsProvider>
        <Toaster />
        <FormContainer />
      </StepsProvider>
    </AppContainer>
  );
}

export default App;
