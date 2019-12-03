import React, { useContext, useEffect } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import RecipeSearchPage from "./components/RecipeSearchPage/RecipeSearchPage";
import RecipePage from "./components/RecipePage/RecipePage";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "@material-ui/core";
import theme from "./contexts/MuiTheme";
import { Switch, withRouter } from "react-router-dom";
import RedirectRoute from "./utils/RedirectRoute";
import { UserContext } from "./contexts/UserContext";
import ls from "local-storage";
import { LOGIN } from "./contexts/types";
import UserSearchPage from "./components/UserSearchPage/UserSearchPage";

const App = props => {
  const [user, dispatchToUser] = useContext(UserContext);

  useEffect(() => {
    // if nothing, check localstorage to see if user is saved
    const userFromLocalStorage = ls.get("user");
    if (userFromLocalStorage) {
      dispatchToUser({ type: LOGIN, payload: userFromLocalStorage });
    } else {
      dispatchToUser({ type: LOGIN, payload: null });
    }
  }, [dispatchToUser]);

  return (
    <ThemeProvider theme={theme}>
      {props.location.pathname !== "/" && <NavBar></NavBar>}
      <Switch>
        <RedirectRoute
          exact
          path="/"
          condition={user !== null}
          redirect="/home"
        >
          <LandingPage></LandingPage>
        </RedirectRoute>
        <RedirectRoute condition={user === null} redirect="/" path="/home">
          <RecipeSearchPage></RecipeSearchPage>
        </RedirectRoute><RedirectRoute condition={user === null} redirect="/" path="/recipes/:id">
          <RecipePage></RecipePage>
        </RedirectRoute>
        <RedirectRoute condition={user === null} redirect="/" path="/profiles">
          <UserSearchPage></UserSearchPage>
        </RedirectRoute>
      </Switch>
    </ThemeProvider>
  );
};

export default withRouter(App);
