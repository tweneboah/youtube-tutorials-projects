import CreatePost from "./components/Posts/CreatePost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostsList from "./components/PostsList";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import HomePage from "./components/Home/HomePage";
import UpdatePost from "./components/Posts/UpdatePost";
function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <PublicNavbar />
      <Routes>
        {/* create post */}
        <Route element={<HomePage />} path="/" />
        <Route element={<CreatePost />} path="/create-post" />
        <Route element={<PostsList />} path="/lists" />
        <Route element={<UpdatePost />} path="/posts/:postId" />
        {/* <CreatePost />
        <PostsList /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
