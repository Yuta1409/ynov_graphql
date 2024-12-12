const { users, posts, comments, likes } = require('./data');

const root = {
  user: ({ id }) => users.find(user => user.id === id),
  usersByName: ({ name }) => users.filter(user => user.name.includes(name)),
  post: ({ id }) => posts.find(post => post.id === id),
  posts: () => posts,
  followers: ({ userId }) => {
    const user = users.find(user => user.id === userId);
    return user ? user.followers : [];
  },
  following: ({ userId }) => {
    const user = users.find(user => user.id === userId);
    return user ? user.following : [];
  },
  addPost: ({ title, content, authorId }) => {
    const post = { id: `${posts.length + 1}`, title, content, authorId, comments: [], likes: [] };
    posts.push(post);
    return post;
  },
  addUser: ({ name, email }) => {
    const user = { id: `${users.length + 1}`, name, email, posts: [], followers: [], following: [] };
    users.push(user);
    return user;
  },
  followUser: ({ userId, followId }) => {
    const user = users.find(user => user.id === userId);
    const followUser = users.find(user => user.id === followId);
    if (user && followUser) {
      user.following.push(followUser);
      followUser.followers.push(user);
    }
    return user;
  },
  addComment: ({ postId, content, authorId }) => {
    const comment = { id: `${comments.length + 1}`, content, authorId, postId };
    comments.push(comment);
    const post = posts.find(post => post.id === postId);
    if (post) {
      post.comments.push(comment);
    }
    return comment;
  },
  addLike: ({ postId, userId }) => {
    const like = { id: `${likes.length + 1}`, userId, postId };
    likes.push(like);
    const post = posts.find(post => post.id === postId);
    if (post) {
      post.likes.push(like);
    }
    return like;
  }
};

module.exports = root;