import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  private reviews: Review[] = [];

  create(createReviewDto: CreateReviewDto) {
    const newReview = {
      id: this.reviews.length + 1,
      ...createReviewDto,
      date: new Date(),
    };
    this.reviews.push(newReview);
    return newReview;
  }

  findAll() {
    return this.reviews;
  }

  findOne(id: number) {
    return this.reviews.find(review => review.id === id);
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    const reviewIndex = this.reviews.findIndex(review => review.id === id);
    if (reviewIndex !== -1) {
      this.reviews[reviewIndex] = {
        ...this.reviews[reviewIndex],
        ...updateReviewDto,
      };
      return this.reviews[reviewIndex];
    }
    return null;
  }

  remove(id: number) {
    const reviewIndex = this.reviews.findIndex(review => review.id === id);
    if (reviewIndex !== -1) {
      const deletedReview = this.reviews[reviewIndex];
      this.reviews.splice(reviewIndex, 1);
      return deletedReview;
    }
    return null;
  }
}
