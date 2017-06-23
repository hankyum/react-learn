import Counter from "./Counter";
import FluxDemo from "../flux/app";
import Hello from "./Hello";
import Home from "./Home";
import { increment, test as testAction } from "../redux/actions/counter-actions";

export default [
  {
    path: "/counter/:num",
    component: Counter,
    actions: [
      ({ num }) => increment({ 'num': num * 1 }),
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
    exact: true,
    path: "/",
    component: Home,
    actions: []
  }
];
