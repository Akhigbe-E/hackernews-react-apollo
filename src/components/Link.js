import React from "react";

const Link = props => {
  return (
    <div>
      {props.link.description} {props.link.url}
    </div>
  );
};

export default Link;
