import React from "react";
import { Routes, Route,useLocation } from "react-router-dom";
import Wizard from "../final-Form&Select/Wizard";
import Table from "../TanStack Table/Table";
import Forms from "../final-Form&Select/Form";
import Error from "../../Pages/Error";
import Home from "../../Pages/Home";
import NavBar from "../../Pages/Navbar";
import Privateroute from "../../ProtectedRoutes/privateroute";
import Publicroutes from "../../ProtectedRoutes/Publicroutes";
import Login from "../../Pages/Login";
import ClassComponent from "../LifeCycle/Class";
import FunctionalComponent from "../LifeCycle/Fuctional";
import AuseState from "../Hooks/AuseState";
import BuseEffect from "../Hooks/BuseEffect";
import CuseContext from "../Hooks/CuseContext";
import DuseRef from "../Hooks/DuseRef";
import EuseMemo from "../Hooks/EuseMemo";
import FuseReducer from "../Hooks/FuseReducer";
import GuseCallback from "../Hooks/GuseCallback";
import Counter from "../../Redux/displayRedux/Counter";
import Grouping from "../TanStack Table/Grouping";
import Virtualize from "../TanStack Table/Virtualize";
import Query from "../Tanstack Query/Query";
import GroupingData from "../Tanstack Query/GroupingData";
import Pokemon from "../../Redux/displayRedux/pokemon";
import TodoList from "../../Redux/displayRedux/TodoList";
import { SignUp } from "../../Pages/SignUp";


function Routing() {
  const location = useLocation();
  
  // Check if the current location is "/login"
  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";
  return (
    <div>
     
     {!isLoginPage && !isSignUpPage && <NavBar />}
     
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<Publicroutes />}>
          <Route  path="/signup" element={<SignUp />} />  
          <Route  path="/login" element={<Login />} />
         
        </Route>
      
        {/* PRIVATE ROUTES */}
        <Route element={<Privateroute />}>
          <Route path="/"            element={<Home />}/>
          {/* LifeCycle */}
          <Route path="/class"       element={<ClassComponent />} />
          <Route path="/functional"  element={<FunctionalComponent />} />
          {/* Hooks */}
          <Route path="/useState"    element={<AuseState/>} />
          <Route path="/useEffect"   element={<BuseEffect />} />
          <Route path="/useContext"  element={<CuseContext />} />
          <Route path="/useRef"      element={<DuseRef />} />
          <Route path="/useMemo"     element={<EuseMemo />} />
          <Route path="/useReducer"  element={<FuseReducer />} />
          <Route path="/useCallback" element={<GuseCallback />} />
          {/* React-FinalForm and React-Select */}
          <Route path="/form"        element={<Forms />} />
          <Route path="/wizard"      element={<Wizard />} />
          {/* TanStack */}
          <Route path="/table"       element={<Table />} />
          <Route path="/grouping"       element={<Grouping/>} />
          <Route path="/virtualize"       element={<Virtualize />} />
          <Route path="/query"       element={<Query />} />
          <Route path="/groupingdata"       element={<GroupingData />} />
         
          {/* Redux */}
          <Route path="/redux"       element={<Counter />} />
          <Route path="/pokemon"       element={<Pokemon />} />
          <Route path="/todoSlice"       element={<TodoList />} />
        </Route>
        {/* Error Page */}
        <Route path="*"              element={<Error />}  />
      </Routes>
    </div>
  );
}

export default Routing;

