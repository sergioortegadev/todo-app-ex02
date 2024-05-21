import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Request, Response } from 'express';

@Controller('/v1/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async find(
    @Query() query,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    let data;

    (async () => {
      if (query.title !== undefined) {
        data = await this.todoService.find(query);
      }
      if (query.description !== undefined) {
        data = await this.todoService.find(query);
      }
      if (query.category !== undefined) {
        data = await this.todoService.find(query);
      }
      if (query.isCompleted !== undefined) {
        data = await this.todoService.find(query);
      }

      if (data) {
        if (data.message === 'No notes found in DB.') {
          response.status(207).json(data);
        } else {
          response.status(200).json(data);
        }
        return data;
      }
      data = await this.todoService.find();
      response.status(200).json(data);
      return data;
    })();
  }

  @Post()
  create(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('category') category: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    (async () => {
      const data = await this.todoService.create(title, description, category);
      if (data.data) {
        response.status(201).json(data);
      } else {
        response.status(207).json(data);
      }
    })();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response,
    @Body('isCompleted') isCompleted?: boolean,
    @Body('title') title?: string,
    @Body('description') description?: string,
    @Body('category') category?: string,
  ) {
    (async () => {
      const data = await this.todoService.update(
        id,
        isCompleted,
        title,
        description,
        category,
      );

      if (data.data) response.status(201).json(data);
      else response.status(207).json(data);
    })();
  }

  @Delete(':id')
  delete(
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    (async () => {
      const data = await this.todoService.delete(id);

      if (data.data) response.status(200).json(data);
      else response.status(207).json(data);
    })();
  }
}

/* console.log(
      `  > ${request.method} a ${request.url} desde: ${request.connection.remoteAddress}`,
    ); */
