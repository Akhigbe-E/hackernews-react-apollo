import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(url: $url, description: $description) {
      id
      url
      description
    }
  }
`;

const CreateLink = props => {
  const [input, setInput] = useState({
    url: "google.com",
    description: "a search engine"
  });
  let { url, description } = input;

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={e => setInput({ ...input, description: e.target.value })}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={e => setInput({ ...input, url: e.target.value })}
          type="text"
          placeholder="The URL for the link"
        />
      </div>

      <Mutation mutation={POST_MUTATION} variables={{ description, url }}>
        {postMutation => <button onClick={postMutation}>Submit</button>}
      </Mutation>
    </div>
  );
};

export default CreateLink;
