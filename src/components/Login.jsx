import React, { useContext } from "react";
import { UserContext } from "../context/User";

const users = [
  {
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  },
  {
    username: "grumpy19",
    name: "Paul Grump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  },
  {
    username: "happyamy2016",
    name: "Amy Happy",
    avatar_url:
      "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
  },
  {
    username: "cooljmessy",
    name: "Peter Messy",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002",
  },
  {
    username: "weegembump",
    name: "Gemma Bump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553",
  },
  {
    username: "jessjelly",
    name: "Jess Jelly",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
  },
];

export default function Login() {
  const { loggedInUser, login, logout } = useContext(UserContext);

  return (
    <div>
      {loggedInUser ? (
        <div>
          <h2>Welcome, {loggedInUser.name}!</h2>
          <img
            src={loggedInUser.avatar_url}
            alt={`${loggedInUser.name}'s avatar`}
            style={{ width: "100px", height: "auto" }}
          />
          <br />
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Select a user to log in:</h2>
          <div>
            {users.map((user) => (
              <button key={user.username} onClick={() => login(user)}>
                {user.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
