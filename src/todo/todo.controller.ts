import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Post()
  create(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('category') category: string,
  ) {
    return this.todoService.create(title, description, category);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('isCompleted') isCompleted: boolean) {
    return this.todoService.update(id, isCompleted);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.todoService.delete(id);
  }
}
