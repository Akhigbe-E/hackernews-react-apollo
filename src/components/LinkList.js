import React from "react";
import Link from "./Link";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const LinkList = props => {
  const FEED_QUERY = gql`
    {
      feed(filter: "", skip: 0, first: 7) {
        links {
          id
          url
          description
        }
      }
    }
  `;
  return (
    <div>
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching...</div>;
          if (error) return <div>Something Went wrong...</div>;
          console.log(data);
          const linksToRender = data.feed.links;

          return (
            <div>
              {linksToRender.map(link => (
                <Link key={link.id} link={link} />
              ))}
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default LinkList;
