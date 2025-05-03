import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];

  create(createCategoryDto: CreateCategoryDto) {
    const newCategory = {
      id: this.categories.length + 1,
      ...createCategoryDto,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories.find(category => category.id === id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryIndex = this.categories.findIndex(category => category.id === id);
    if (categoryIndex !== -1) {
      this.categories[categoryIndex] = {
        ...this.categories[categoryIndex],
        ...updateCategoryDto,
      };
      return this.categories[categoryIndex];
    }
    return null;
  }

  remove(id: number) {
    const categoryIndex = this.categories.findIndex(category => category.id === id);
    if (categoryIndex !== -1) {
      const deletedCategory = this.categories[categoryIndex];
      this.categories.splice(categoryIndex, 1);
      return deletedCategory;
    }
    return null;
  }
}
