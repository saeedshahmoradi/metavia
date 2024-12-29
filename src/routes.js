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
  {path: '/resume/:id', element: <Resume />},
  {path: '/portfolio', element: <Portfolio />},
  {path: '/contact', element: <Contact />},
  {path: '/blogs', element: <Blogs />},
  {path: '/blog/:id', element: <Blog />},
  {path: '*', element: <NotFound />},
];

export default routes;


// import { lazy } from 'react';

// const Home = lazy(() => import('./pages/home/Home'));
// const Members = lazy(() => import('./pages/members/Members'));
// const Profile = lazy(() => import('./pages/memberProfile/MemberProfile'));
// const Portfolio = lazy(() => import('./pages/portfolio/Portfolio'));
// const Contact = lazy(() => import('./pages/contact/Contact'));
// const About = lazy(() => import('./pages/blogs/Blogs'));
// const NotFound = lazy(() => import('./pages/notFound/NotFound'));

// const routes = [
//   { path: '/', element: <Home /> },
//   { path: '/members', element: <Members /> },
//   { path: '/Profile/:id', element: <Profile /> },
//   { path: '/portfolio', element: <Portfolio /> },
//   { path: '/contact', element: <Contact /> },
//   { path: '/about', element: <About /> },
//   { path: '*', element: <NotFound /> },
// ];

// export default routes;