// import { useState } from "react";
// import { useGlobalContext } from "../context/context";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loginImg from "../images/login-img.svg";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  /*
  const { getAccessTokenSilently } = useAuth0();
  const [githubUsername, setGithubUsername] = useState("");
  // const { searchGithubUser } = useGlobalContext();

  // console.log(useAuth0());

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (githubUsername) {
    //   // console.log(githubUsername);
    // searchGithubUser(githubUsername);
    // setGithubUsername("");
    // }
  };

  const handleClick = async () => {
    const token = await getAccessTokenSilently({
      audience: "https://dev-xqb7g47wh6xadx45.us.auth0.com/api/v2/",
      scope: "read:products write:products",
      context: {
        productId: githubUsername,
      },
    });

    const response = await fetch(
      "https://dev-xqb7g47wh6xadx45.us.auth0.com/api/v2/products",
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };
  */

  return (
    <Wrapper>
      <div className="container">
        <img src={loginImg} alt="github-user" />
        <h1>github user</h1>
        {/*         
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="enter your github username"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            required
          />
        </form> */}
        <button className="btn" onClick={loginWithRedirect}>
          Log In / Sign Up
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
  form {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  input {
    flex: 1;
    border-color: transparent;
    outline-color: var(--clr-grey-10);
    letter-spacing: var(--spacing);
    color: var(--clr-grey-3);
    padding: 0.25rem 0.5rem;
  }
  input::placeholder {
    color: var(--clr-grey-3);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
  }
`;

export default Login;
