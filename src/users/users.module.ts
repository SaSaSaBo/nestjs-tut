import { Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}

/*
    Wrote 'nest g service/controller/module name' to open those folders and name file.
*/

