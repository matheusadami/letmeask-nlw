import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeContextProvider, ThemeContextType } from './contexts/ThemeContext';

import { Home } from "./pages/Home/index";
import { NewRoom } from "./pages/NewRoom/index";
import { Room } from "./pages/Room/index";
import { AdminRoom } from "./pages/AdminRoom/index";

import { GlobalStyles } from './styles/global';

function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        {(props: ThemeContextType) =>
        <>
          <GlobalStyles theme={props.theme} />
          <AuthContextProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/rooms/new" component={NewRoom} />
              <Route exact path="/rooms/:id" component={Room} />

              <Route exact path="/admin/rooms/:id" component={AdminRoom} />
            </Switch>
          </AuthContextProvider>
        </>
        }
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
