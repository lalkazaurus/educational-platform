import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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

  async findUniqueUser(email: string, username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: [
        { email },
        { username }
      ]
    })
  }

  async createUser(username: string, email: string,  password: string): Promise<User | null> {
    const newUser =  this.userRepository.create({ username, email, password })
    return await this.userRepository.save(newUser)
  }

  async setLoginEntry(id: number): Promise<void> {
    this.userRepository.update(
      id, {
        lastLogin: new Date()
      })
  }
}
