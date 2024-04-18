import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      driver: require('@libsql/sqlite3'),
      flags: 0x0000040,
      database:
        'libsql://fullstackimplementation-mellamanadrian.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTMyOTAzOTIsImlkIjoiMGM1MDExNGMtZTIwMy00N2I4LTk2NmItMjI4MThlNzRiZmI4In0.oH0KqXINqpr3JedJsfUowuL2ITInuKnGG-akumata21ycihPXpXW03T_fE9lw1LVy-j6xbdHCAFu41FX6kNXCQ',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
