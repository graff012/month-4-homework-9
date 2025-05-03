import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  create(createCommentDto: CreateCommentDto) {
    const newComment = {
      id: this.comments.length + 1,
      ...createCommentDto,
      date: new Date(),
    };
    this.comments.push(newComment);
    return newComment;
  }

  findAll() {
    return this.comments;
  }

  findOne(id: number) {
    return this.comments.find(comment => comment.id === id);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    const commentIndex = this.comments.findIndex(comment => comment.id === id);
    if (commentIndex !== -1) {
      this.comments[commentIndex] = {
        ...this.comments[commentIndex],
        ...updateCommentDto,
      };
      return this.comments[commentIndex];
    }
    return null;
  }

  remove(id: number) {
    const commentIndex = this.comments.findIndex(comment => comment.id === id);
    if (commentIndex !== -1) {
      const deletedComment = this.comments[commentIndex];
      this.comments.splice(commentIndex, 1);
      return deletedComment;
    }
    return null;
  }
}
