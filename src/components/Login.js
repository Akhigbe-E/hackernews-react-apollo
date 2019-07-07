import React, { useState } from "react";
import { AUTH_TOKEN } from "../constants";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const Login = props => {
  const [login, setLogin] = useState(true);
  let nameObj = useValueChange("");
  let emailObj = useValueChange("");
  let passwordObj = useValueChange("");
  const name = nameObj.value;
  const email = emailObj.value;
  const password = passwordObj.value;

  const _confirm = async data => {
    const { token } = login ? data.login : data.signup;
    _saveUserData(token);
    props.history.push("/");
  };

  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  const SIGNUP_MUTATION = gql`
    mutation SignupMutation(
      $email: String!
      $password: String!
      $name: String!
    ) {
      signup(email: $email, password: $password, name: $name) {
        token
      }
    }
  `;

  const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `;

  return (
    <div>
      <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!login && <input {...nameObj} type="text" placeholder="Your name" />}
        <input {...emailObj} type="text" placeholder="Your email address" />
        <input
          {...passwordObj}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={data => _confirm(data)}
        >
          {(mutation, { error }) => (
            <div>
              <div className="pointer mr2 button" onClick={mutation}>
                {login ? "login" : "create account"}
              </div>
              {error ? "Wrong User Credentials" : ""}
            </div>
          )}
        </Mutation>
        <div className="pointer button" onClick={() => setLogin(!login)}>
          {login ? "need to create an account?" : "already have an account?"}
        </div>
      </div>
    </div>
  );
};

const useValueChange = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange
  };
};

export default Login;
