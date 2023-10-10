import { IFilterOptions } from 'src/helpers/interfaces/filter-options';
import { UserModel } from '../models/user';

export interface FilterUser extends IFilterOptions<Partial<UserModel>, { pageNumber: string; limit: string; searchParam: string }> {}

export abstract class IUserRepository {
    abstract create(user: UserModel): Promise<UserModel>;
    abstract update(userId: number, user: Partial<UserModel>): Promise<UserModel>;
    abstract delete(userId: number): Promise<void>;
    abstract findOne(filter: Partial<UserModel>): Promise<UserModel | null>;
    abstract findMany(filter: FilterUser): Promise<UserModel[] | null>;
    abstract findAll(): Promise<UserModel[] | null>;
}
