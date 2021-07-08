import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => {
      return user.id === id;
    });
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => {
      return user.email === email;
    });
  }

  turnAdmin(receivedUser: User): User {
    const userInRepository = this.findById(receivedUser.id);
    if (!userInRepository) {
      throw new Error("Could not find user");
    }

    userInRepository.admin = true;
    userInRepository.updated_at = new Date();

    return userInRepository;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
