import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async find(query?: object) {
    let data: Array<object> = [];

    if (query) {
      const searchQuery = Object.keys(query)[0];

      if (searchQuery.trim().length < 3) {
        return {
          message: 'You must enter at least 3 characters in the search.',
        };
      }

      switch (searchQuery) {
        case 'title':
          data = await this.todoRepository.find({
            where: { title: Like(`%${Object.values(query)[0]}%`) },
          });
          break;

        case 'description':
          data = await this.todoRepository.find({
            where: { description: Like(`%${Object.values(query)[0]}%`) },
          });
          break;

        case 'category':
          data = await this.todoRepository.find({
            where: { category: Object.values(query)[0] },
          });
          break;

        case 'isCompleted':
          if (Object.values(query)[0] === 'true') {
            data = await this.todoRepository.find({
              where: { isCompleted: true },
            });
          } else {
            data = await this.todoRepository.find({
              where: { isCompleted: false },
            });
          }
          break;

        default:
          return {
            message: `${data.length}` + ' Note/s obtained correctly from DB.',
            data: data,
          };
      }
    } else {
      data = await this.todoRepository.find();
    }

    if (data.length === 0) return { message: 'No notes found in DB.' };

    return {
      message: `Data obtained ok from DB. Listing ${data.length} notes.`,
      data: data,
    };
  }

  async create(title: string, description: string, category: string) {
    const todo = new Todo();
    todo.title = title;
    todo.description = description;
    todo.category = category;

    if (
      title === undefined ||
      description === undefined ||
      category === undefined
    )
      return { message: 'Error: missing title, description, or category.' };

    return {
      message: `Note with title: '${todo.title}' entered ok into DB`,
      data: await this.todoRepository.save(todo),
    };
  }

  async update(
    id: number,
    isCompleted?: boolean,
    title?: string,
    description?: string,
    category?: string,
  ) {
    const todo = await this.todoRepository.findOne({ where: { id: id } });

    if (todo) {
      if (isCompleted !== undefined) {
        todo.isCompleted = isCompleted;
      }
      if (title !== undefined) {
        todo.title = title;
      }
      if (description !== undefined) {
        todo.description = description;
      }
      if (category !== undefined) {
        todo.category = category;
      }
      return {
        message: `Note with id: ${todo.id} and title: '${todo.title}' updated into DB`,
        data: await this.todoRepository.save(todo),
      };
    } else {
      return {
        message: `Error - id: ${id} not found in DB`,
      };
    }
  }

  async delete(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id: id } });
    if (todo) {
      this.todoRepository.delete(id).then(() => {});
      return {
        message: `Note with id: ${todo.id} and title: '${todo.title}' deleted ok into DB`,
        data: await this.todoRepository.find(),
      };
    } else {
      return {
        message: `Error - id: ${id} not found in DB`,
      };
    }
  }
}
