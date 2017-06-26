import Counter from "./Counter";
import FluxDemo from "../flux/app";
import Hello from "./Hello";
import Home from "./Home";
import Users from "./Users/Users";
import { increment, test as testAction, fetchUser } from "../redux/actions/counter-actions";

export default [
  {
    path: "/counter/:num",
    component: Counter,
    actions: [
      ({ num }) => increment(num),
      ({ test }) => test && testAction(test * 1)
    ]
  },
  {
    path: "/todo",
    component: FluxDemo,
    actions: []
  },
  {
    path: "/hello",
    component: Hello,
    actions: []
  },
  {
    path: "/users",
    component: Users,
    actions: [() => {
      console.log("Server execute fetchUser");
      return fetchUser();
    }]
  },
  {
    exact: true,
    path: "/",
    component: Home,
    actions: []
  }
];
