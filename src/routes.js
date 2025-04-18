import Home from "./pages/home/Home";
import Members from "./pages/members/Members";
import Resume from "./pages/resume/Resume";
import Portfolio from "./pages/portfolio/Portfolio";
import ContactUs from "./pages/contactUs/ContactUs";
import Blogs from "./pages/blogs/Blogs";
import Blog from "./pages/blog/Blog";
import NotFound from "./pages/notFound/NotFound";
// TEST
import Loading from "./components/loading/Loading";
// TEST

const generateLangRoutes = (lang) => [
  // TEST
  { path: `/`, element: <Loading /> },
  // TEST
  { path: `/${lang}`, element: <Home /> },
  { path: `/${lang}/members`, element: <Members /> },
  { path: `/${lang}/resume/:slug`, element: <Resume /> },
  { path: `/${lang}/portfolio`, element: <Portfolio /> },
  { path: `/${lang}/contactUs`, element: <ContactUs /> },
  { path: `/${lang}/blogs`, element: <Blogs /> },
  { path: `/${lang}/blog/:slug`, element: <Blog /> },
  { path: `/${lang}/*`, element: <NotFound /> },
];

const routes = [
  ...generateLangRoutes('fa'),
  ...generateLangRoutes('en'),
  { path: '*', element: <NotFound /> },
];

export default routes;