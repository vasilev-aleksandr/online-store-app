import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  async create(username: string, email: string, password: string): Promise<User> {
    const existingUser = this.users.find(
      (u) => u.username === username || u.email === email,
    );

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      id: this.idCounter++,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.users.push(user);
    return user;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: number): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}