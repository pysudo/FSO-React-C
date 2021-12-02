import React from "react";


const Hello = ({ name, age }) => {

    const bornYear = () => new Date().getFullYear() - age;

    return (
        <div>
            <p>
                Hello, {name}! You are {age} years old.
            </p>
            <p>
                So you were porbably born in {bornYear()}
            </p>
        </div>
    );
};



const Greetings = () => {
    const name = "Sven";
    const age = 30;

    return (
        <>
            <h1>Greetings</h1>
            <Hello name={name} age={age} />
            <Hello name="Lang" age={age + 30} />
        </>
    );
};

export default Greetings;
