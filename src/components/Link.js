import React from "react";
import { AUTH_TOKEN } from "../constants";
import { timeDifferenceForDate } from "../utils";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
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

const Link = props => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        {authToken && (
          <Mutation
            mutation={VOTE_MUTATION}
            variables={{ linkId: props.link.id }}
            update={(store, { data: { vote } }) => {
              console.log(vote);
              props.updateStoreAfterVote(store, vote, props.link.id);
            }}
          >
            {vote => {
              return (
                <div className="ml1 gray f11" onClick={vote}>
                  ▲
                </div>
              );
            }}
          </Mutation>
        )}
      </div>
      <div className="ml1">
        <div>
          {props.link.description} ({props.link.url})
        </div>
        <div className="f6 lh-copy gray">
          {props.link.votes.length} votes | by{" "}
          {props.link.postedBy ? props.link.postedBy.name : "Unknown"}{" "}
          {props.link.createdAt
            ? timeDifferenceForDate(props.link.createdAt)
            : undefined}
        </div>
      </div>
    </div>
  );
};

export default Link;
