import React, { useState } from "react";


const Display = ({ counter }) => <p>{counter}</p>;

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <p>the app is used by pressing the buttons</p>
        );
    }
    else {
        return (
            <p>button press history: {props.allClicks.join(" ")}</p>
        );
    }
};

const Counters = () => {
    const [counter, setCounter] = useState(0);
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    // Using single state object
    const [clicks, setClicks] = useState({
        left: 0,
        right: 0
    });
    const [allClicks, setAll] = useState([]);

    const changeByOne = (counter) => () => {
        setCounter(counter);
    };
    const setValue = (value) => () => {
        setCounter(value);
    };
    const handleLeftClick = () => {
        setLeft(clicks.left + 1);
        // Using single state object
        setClicks({
            ...clicks,
            left: left + 1
        });

        setAll(allClicks.concat("L"));
    };

    const handleRightClick = () => {
        setRight(right + 1);
        // Using single state object
        setClicks({
            ...clicks,
            right: right + 1
        });

        setAll(allClicks.concat("R"));
    };

    const hello = (name) => () => {
        console.log("Hello", name);
    };

    return (
        <>
            <Display counter={counter} />
            <Button
                handleClick={changeByOne(counter + 1)}
                text="plus"
            />
            <Button
                handleClick={changeByOne(counter - 1)}
                text="minus"
            />
            <Button
                handleClick={setValue(0)}
                text="reset"
            />
            <div>
                <Display counter={left} />
                <Button
                    handleClick={handleLeftClick}
                    text="left"
                />
                <Display counter={right} />
                <Button
                    handleClick={handleRightClick}
                    text="right"
                />
            </div>
            <History allClicks={allClicks} text="right" />

            <Button
                handleClick={hello("Sven")}
                text="hello"
            />
        </>
    );
};


export default Counters;