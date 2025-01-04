import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
//import Posts from "./pages/Posts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPasssword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreatePhotoPost from "./pages/Admin/CreatePhotoPost";
import CreateVideoPost from "./pages/Admin/CreateVideoPost";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import PostsAdmin from "./pages/Admin/PostsAdmin";
import UpdatePost from "./pages/Admin/UpdatePost";
import Search from "./pages/Search";
import PostDetails from "./pages/PostDetails";
import Categories from "./pages/Categories";
import CategoryPost from "./pages/CategoryPost";
import CartPage from "./pages/CartPage";
import AdminProfil from "./pages/Admin/AdminProfil";
import VideoPage from "./pages/VideoPage";
import FotoPage from "./pages/FotoPage";


function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/foto" element={<FotoPage/>} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:name" element={<CategoryPost />} />
        <Route path="/search" element={<Search />} />

        <Route path="/auth" element={<PrivateRoute />}>
        
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />

        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-photopost" element={<CreatePhotoPost />} />
          <Route path="admin/create-videopost" element={<CreateVideoPost />} />
          <Route path="admin/post/:id" element={<UpdatePost />} />
          <Route path="admin/posts" element={<PostsAdmin />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/profil" element={<AdminProfil />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />

      </Routes>
    </>
  );
}

export default App;