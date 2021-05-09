import gql from "graphql-tag"

export const getUsers = (query, limit = 10) => ({
  query: gql`
    query ($limit: Int) {
      users (pagination: { limit: $limit }) {
        data {
          ${query}
        }
      }
    }
  `,
  variables: {
    limit
  },
  skip: () => true
})

export const getUser = (query, id) => ({
  query: gql`
    query ($id: Int!) {
      user (userId: $id) {
        ${query}
      }
    }
  `,
  variables: {
    id
  },
  skip: () => true
})

export const addPost = (query, { userId, title, body }) => ({
  mutation: gql`
    mutation ($userId: Int!, $title: String!, $body: String!) {
      addPost (data: { userId: $userId, title: $title, body: $body }) {
        ${query}
      }
    }
  `,
  variables: {
    userId, title, body
  }
})