import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Portfolio from "./pages/portfolio/Portfolio";
import Contact from "./pages/contact/Contact";
import Members from "./pages/members/Members";
import NotFound from "./pages/notFound/NotFound";


const routes = [
  {path: '/', element: <Home />},
  {path: '/members', element: <Members />},
  {path: '/portfolio', element: <Portfolio />},
  {path: '/contact', element: <Contact />},
  {path: '/about', element: <About />},
  {path: '*', element: <NotFound />},
];

export default routes;