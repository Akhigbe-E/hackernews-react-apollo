import React from "react";
import Link from "./Link";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export const FEED_QUERY = gql`
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
export const LinkList = props => {
  const _updateCacheAfterVote = (store, createdVote, id) => {
    const data = store.readQuery({ query: FEED_QUERY });
    const votedLink = data.feed.links.find(link => link.id === id);
    votedLink.votes = createdVote.link.votes;
    data.feed.links = [votedLink, ...data.feed.links];
    console.log(data);
    store.writeQuery({ query: FEED_QUERY, data });
  };
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
                <Link
                  key={link.id}
                  link={link}
                  updateStoreAfterVote={_updateCacheAfterVote}
                  index={index}
                />
              ))}
            </div>
          );
        }}
      </Query>
    </div>
  );
};
