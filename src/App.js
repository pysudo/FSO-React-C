import React from "react";
import Notes from "./components/Notes";
import Counters from "./components/Counters";
import Greetings from "./components/Greetings";



const App = () => {

    return (
        <>
            <Counters />
            <Greetings />
            <Notes />
        </>
    );
};

export default App;
