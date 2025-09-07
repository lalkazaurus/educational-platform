import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Roles } from './types/roles';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username }
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email }
    })
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id }
    })
    return user
  }

  async findUniqueUser(email: string, username: string, phoneNumber: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: [
        { email },
        { username },
        { phoneNumber }
      ]
    })
  }

  async createUser(username: string, email: string,  password: string, phoneNumber: string): Promise<User | null> {
    const newUser =  this.userRepository.create({ username, email, password, phoneNumber })
    return await this.userRepository.save(newUser)
  }

  async setLoginEntry(id: number): Promise<void> {
    this.userRepository.update(
      id, {
        lastLogin: new Date()
      })
  }

  async addNewTeacher(id: number): Promise<string> {
    const user = await this.findById(id)

    if (!user) {
      return "User doesn't exist"
    }

    if (!user.roles.includes(Roles.TEACHER)) {
      user.roles.push(Roles.TEACHER)
      await this.userRepository.save(user)
      return "Teacher role added"
    }

    return "This user is already a teacher"
  }
}
