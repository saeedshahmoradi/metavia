import Home from "./pages/home/Home";
import Members from "./pages/members/Members";
import Resume from "./pages/resume/Resume";
import Portfolio from "./pages/portfolio/Portfolio";
import Contact from "./pages/contact/Contact";
import Blogs from "./pages/blogs/Blogs";
import Blog from "./pages/blog/Blog";
import NotFound from "./pages/notFound/NotFound";


const routes = [
  {path: '/', element: <Home />},
  {path: '/members', element: <Members />},
  {path: '/resume/:slug', element: <Resume />},
  {path: '/portfolio', element: <Portfolio />},
  {path: '/contact', element: <Contact />},
  {path: '/blogs', element: <Blogs />},
  {path: '/blog/:slug', element: <Blog />},
  {path: '*', element: <NotFound />},
];

export default routes;