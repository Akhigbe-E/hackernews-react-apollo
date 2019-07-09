import React, { useState } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import Link from "./Link";

const Search = props => {
  const FEED_SEARCH_QUERY = gql`
    query FeedSearchQuery($filter: String!) {
      feed(filter: $filter) {
        links {
          id
          url
          description
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
            }
          }
        }
      }
    }
  `;
  const [filter, setFilter] = useState("");
  const [links, setLinks] = useState([]);
  const _executeSearch = async () => {
    const result = await props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    });
    let links = result.data.feed.links;
    setLinks(links);
  };
  return (
    <div>
      <div>
        Search
        <input type="text" onChange={e => setFilter(e.target.value)} />
        <button onClick={() => _executeSearch()}>OK</button>
      </div>
      {links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  );
};

export default withApollo(Search);
