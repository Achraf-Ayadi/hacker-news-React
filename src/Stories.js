import React from 'react'

import { useGlobalContext } from './context'

const Stories = () => {
  const { loading, hits, remove } = useGlobalContext()
  if (loading) {
    return <div className='loading'></div>
  } else {
    return (
      <section className='stories'>
        {hits.map((story) => {
          const {
            objectID: id,
            num_comments,
            points,
            title,
            url,
            author,
          } = story
          return (
            <article key={id} className='story'>
              <h4 className='title'>{title}</h4>
              <p className='info'>
                {' '}
                {points} points by
                <span>{author} | </span>
                {num_comments} comments
              </p>
              <div>
                <a
                  href={url}
                  className='read-link'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  read more
                </a>
                <button className='remove-btn' onClick={() => remove(id)}>
                  remove
                </button>
              </div>
            </article>
          )
        })}
      </section>
    )
  }
}

export default Stories
