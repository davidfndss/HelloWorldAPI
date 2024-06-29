import { UserDto } from 'src/user/dto/user.dto'
import { LikeDto } from 'src/like/dto/like.dto'

export class CommentDto {
  id: string;
  body: string;
  postId: string;
  userId?: string;
  user?: UserDto;
  likes?: [] | LikeDto[];
}