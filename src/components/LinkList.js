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
const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
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
`;
const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
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
      user {
        id
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
  const _subscribeToNewLinks = subscribeToMore => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, dat) => {
        const subsciptionData = dat.subscriptionData;
        if (!subsciptionData.data) return prev;
        console.log(prev.feed.links);
        const newLink = subsciptionData.data.newLink;
        const exists = prev.feed.links.find(({ id }) => id === newLink.id);
        if (exists) return prev;
        return Object.assign({}, prev, {
          feed: {
            links: [newLink, ...prev.feed.links],
            count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename
          }
        });
      }
    });
  };
  const _subscribeToNewVotes = subscribeToMore => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION
    });
  };
  return (
    <div>
      <Query query={FEED_QUERY}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching...</div>;
          if (error) return <div>Something Went wrong...</div>;
          _subscribeToNewLinks(subscribeToMore);
          _subscribeToNewVotes(subscribeToMore);
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
