import { UserDto } from 'src/user/dto/user.dto'
import { CommentDto } from 'src/comment/dto/comment.dto'
import { LikeDto } from 'src/like/dto/like.dto'

export class PostDto {
  id: string;
  body: string;
  user: UserDto;
  userId?: string;
  comments: CommentDto[] | [];
  likes: LikeDto[] | [];
}