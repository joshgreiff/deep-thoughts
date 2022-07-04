import React from 'react';
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERYTHOUGHT } from '../utils/queries'

import ReactionList from '../components/ReactionList'

const SingleThought = props => {
  const { id: thoughtId } = useParams()
  
  const { loading, data } = useQuery(QUERYTHOUGHT, {
    variables: { id: thoughtId }
  })

  const thought = data?.thought || {}

  if(loading){
    return <div>loading...</div>
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            { thought.username }
          </span>{' '}
          thought on { thought.createdAt }
        </p>
        <div className="card-body">
          <p>{ thought.thoughtText}</p>
        </div>
      </div>

      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
    </div>
  );
};

export default SingleThought;
