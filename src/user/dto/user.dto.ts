import { PostDto } from 'src/post/dto/post.dto'

export class UserDto{
  name: string
  username: string;
  avatar: string;
  background?: string;
  posts?: PostDto[];
}