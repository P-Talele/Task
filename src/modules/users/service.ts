import { UserModel } from './../../models/User';
import { Role } from '../../config';

export class UserService {
    private userModel: typeof UserModel;

    constructor() {
        this.userModel = UserModel;
    }

    async list(page = 1, limit = 20) {
        const skip = (page - 1) * limit;

        const users = await this.userModel
            .find()
            .skip(skip)
            .limit(limit)
            .select('-password');

        const total = await this.userModel.countDocuments();

        return { users, total };
    }

    async getById(id: string) {
        return this.userModel.findById(id).select('-password');
    }

    async updateRole(id: string, role: Role.Admin | Role.Member) {
        return this.userModel
            .findByIdAndUpdate(id, { role }, { new: true })
            .select('-password');
    }
}
