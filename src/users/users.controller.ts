/* eslint-disable no-unused-vars */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') 
// localhost:3000/users
export class UsersController {
    /*
        GET /users
        GET /users/:id
        POST /users
        PATCH /users/:id
        DELETE /users/:id
    */

    // const UsersService = new UsersService() //nest handling this line for us but it's doing a little bit more than that it is also sayin that 'hey if we created this elsewhere it's going to find that and pull it in'.
    constructor(private readonly usersService: UsersService) {}

    @Get() // GET /users or /users?role=value //&age=number
    findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'STUDENT') {
        return this.usersService.findAll(role) // []
    }

    /*
        @Get('interns') // GET /users/interns
        findInterns() {
            return []
        }
    */

    @Get(':id') // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number   ) {
        return this.usersService.findOne(id) // { id }
    }

    /*
        // if we put the 'interns' after '/:id' it won't work because order is important so put '/interns' after '/:id'
        @Get('interns') // GET /users/interns
        findInterns() {
            return []
        }
    */

    @Post() // POST /users
    create(@Body() user: {name: string, email: string, role: 'INTERN' | 'ADMIN' | 'STUDENT'}) {
        return this.usersService.create(user) // user
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: {name?: string, email?: string, role?: 'INTERN' | 'ADMIN' | 'STUDENT'}) {
        return this.usersService.update(id, userUpdate) // { id, ...userUpdate }
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id) // { id }
    }
}
