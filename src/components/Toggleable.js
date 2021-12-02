import React, { useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";


const Toggleable = React.forwardRef((props, ref) => {
    const [loginVisible, setLoginVisible] = useState(false);

    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    const toggleVisibility = () => {
        setLoginVisible(!loginVisible);
    };
    useImperativeHandle(ref, () => {
        return { toggleVisibility };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => setLoginVisible(true)}>
                    {props.buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible} className="toggleableContent">
                {props.children}
                <button onClick={() => setLoginVisible(false)}>cancel</button>
            </div>
        </div>
    );
});


Toggleable.displayName = "Toggleable";

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
};


export default Toggleable;