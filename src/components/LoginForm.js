import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({
    username,
    handleUserNameChange,
    handlePasswordChange,
    password,
    handleLogin,
}) => {
    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={handleUserNameChange}
                />
            </div>
            <div>
                password
                <input
                    id="password"
                    type="text"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button id="login-button" type="submit">login</button>
        </form>
    );
};


LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleUserNameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,

};

export default LoginForm;