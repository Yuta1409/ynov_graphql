const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    user(id: ID!): User
    usersByName(name: String!): [User]
    post(id: ID!): Post
    posts: [Post]
    followers(userId: ID!): [User]
    following(userId: ID!): [User]
  }

  type Mutation {
    addPost(
      title: String!, 
      content: String!, 
      authorId: ID!
    ): Post
    addUser(
      name: String!, 
      email: String!
    ): User
    followUser(
      userId: ID!, 
      followId: ID!
    ): User
    addComment(
      postId: ID!, 
      content: String!, 
      authorId: ID!
    ): Comment
    addLike(
      postId: ID!, 
      userId: ID!
    ): Like
  }

  type User {
    id: ID!
    name: String
    email: String
    posts: [Post]
    followers: [User]
    following: [User]
  }

  type Post {
    id: ID!
    title: String
    content: String
    author: User
    comments: [Comment]
    likes: [Like]
  }

  type Comment {
    id: ID!
    content: String
    author: User
    post: Post
  }

  type Like {
    id: ID!
    user: User
    post: Post
  }
`);

module.exports = schema;