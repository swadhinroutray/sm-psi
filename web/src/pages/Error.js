import React from "react";

const Error404 = () => {
  return (
    <div>
      <h1>Oops, looks like you're lost!</h1>
      <p>The page you're looking for doesn't exist.</p>
      <p>Maybe you took a wrong turn somewhere?</p>
      <img
        src="https://i.imgur.com/lyOXn9y.png"
        alt="Lost dog with a sign saying '404 Error: Page not found'"
      />
      <p>Don't worry though, you can always start again:</p>
      <ul>
        <li>
          <a href="/">Go back to the homepage</a>
        </li>
        <li>
          <a href="/about">Learn more about us</a>
        </li>
        <li>
          <a href="/contact">Get in touch with us</a>
        </li>
      </ul>
    </div>
  );
};

export default Error404;
