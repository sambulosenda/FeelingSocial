// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Like, User, Post, Comment, UserFollow, UserFeedPost } = initSchema(schema);

export {
  Like,
  User,
  Post,
  Comment,
  UserFollow,
  UserFeedPost
};