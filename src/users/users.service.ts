import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable() // attach metadata that declares that we're about the create our user.
export class UsersService {
    private users = [
        {   
            id: 1, 
            name: 'Ashley',
            email: 'ashty@example.com',
            role: 'STUDENT',
        },
        {   
            id: 2, 
            name: 'Albert',
            email: 'alıslnd@example.com',
            role: 'ADMIN',
        },
        {   
            id: 3, 
            name: 'Christopher',
            email: 'chrslynn@example.com',
            role: 'ADMIN',
        },
        {   
            id: 4, 
            name: 'Alex',
            email: 'alexc@example.com',
            role: 'STUDENT',
        },
        {   
            id: 5, 
            name: 'Sky',
            email: 'sky@example.com',
            role: 'INTERN',
        },
    ]

    findAll(role?: 'INTERN' | 'ADMIN' | 'STUDENT') {
        if (role) {
            /* return*/ const rolesArray = this.users.filter(user => user.role === role)
            if(rolesArray.length === 0) throw new NotFoundException('User role not found')
            return rolesArray
       }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        // when we add the NotFoundException we should add the if condition for the getting that error
        if(!user) throw new NotFoundException('User not found')

        return user
    }

    create(CreateUserDto: CreateUserDto) {// user: {name: string, email: string, role: 'INTERN' | 'ADMIN' | 'STUDENT'}) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id) // sort users by highest id
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...CreateUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, UpdateUserDto: UpdateUserDto) {// updatedUser: {name?: string, email?: string, role?: 'INTERN' | 'ADMIN' | 'STUDENT'}) { // with ? make each one of them optional.
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    ...UpdateUserDto
                }
            }
            return user
        })

        return this.findOne(id)
    }
    

    delete(id: number) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id) // that will exclude that user that needs to be removed and will no longer be in this user

        return removedUser
    }
    
}
