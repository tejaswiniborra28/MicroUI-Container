import "./App.css";

import React, { lazy, Suspense } from "react";

const CounterComponent = lazy(async () => await import("app1/CounterApp"));
// const Counter1Component = lazy(async () => await import("app1/CounterApp1"));

function App(): JSX.Element {
  return (
    <div className="App">
      <h1>Main Application</h1>
      <Suspense fallback={<div>loading...</div>}>
        <CounterComponent />
        {/* <Counter1Component /> */}
      </Suspense>
    </div>
  );
}

export default App;
