import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Movies from "./Pages/Movies/Movies";
import Trending from "./Pages/Trending/Trending";
import TVSeries from "./Pages/TvSeries/TVSeries";
import NavbarComponet from "./components/Navbar/NavbarComponet";

function App() {
  return (
    <Router>
      <NavbarComponet />
      <Switch>
        <Route exact path="/" component={Movies} />
        <Route exact path="/trending" component={Trending} />
        <Route exact path="/series" component={TVSeries} />
      </Switch>
    </Router>
  );
}

export default App;
