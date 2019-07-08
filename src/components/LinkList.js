import React from "react";
import Link from "./Link";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const LinkList = props => {
  const FEED_QUERY = gql`
    {
      feed {
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
  return (
    <div>
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching...</div>;
          if (error) return <div>Something Went wrong...</div>;
          const linksToRender = data.feed.links;

          return (
            <div>
              {linksToRender.map((link, index) => (
                <Link key={link.id} link={link} index={index} />
              ))}
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default LinkList;
