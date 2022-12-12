import React, { useState, useEffect, useContext } from "react";
import mockUser from "./mockData/mockUser";
import mockRepos from "./mockData/mockRepos";
import mockFollowers from "./mockData/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

// we get access to "Provider, Consumer - GithubContext.Provider" by using React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  //request loading
  const [requests, setRequests] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { followers_url, repos_url } = response.data;
      const reposResponse = axios(`${repos_url}?per_page=100`);
      const followersReponse = axios(`${followers_url}?per_page=100`);

      // promise.allsetted will return only when we get all the data from the promises.
      await Promise.allSettled([reposResponse, followersReponse])
        .then((results) => {
          console.log(results);
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) setRepos(repos.value.data);
          if (followers.status === status) setFollowers(followers.value.data);
        })
        .catch((err) => console.log(err));
    } else {
      toggleError(true, "there is no user with that username!");
    }
    checkRequests();
    setIsLoading(false);
  };

  // check rate limit
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then((data) => {
        let {
          rate: { remaining, limit },
        } = data.data;

        setRequests((oldRequests) => {
          return { ...oldRequests, remaining, limit };
        });
        if (remaining === 0)
          toggleError(true, "sorry, you have exceeded your hourly rate limit!");
      })
      .catch((err) => console.log(err));
  };

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

// instead of import useContext and GithubContext in each file, we can use the following custom hook which will return "useContext(GithubContext)"
const useGlobalContext = () => {
  return useContext(GithubContext);
};

export { GithubProvider, GithubContext, useGlobalContext };
