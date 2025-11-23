import bcrypt from "bcryptjs";
import { UserModel } from "../../models/User";
import { signJwt } from "../../utils/jwt";
import { message } from "../../helper/messages";

export class AuthService {
    private userModel: typeof UserModel;
    private bcrypt: typeof bcrypt;

    constructor() {
        this.userModel = UserModel;
        this.bcrypt = bcrypt;
    }

    async register(name: string, email: string, password: string) {
        const existing = await this.userModel.findOne({ email });
        if (existing) throw { status: 400, message: message.auth.Email_already_registered };

        const hashPassword = await this.bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            name,
            email,
            password: hashPassword,
        });

        return user;
    }

    async login(email: string, password: string) {
        const user = await this.userModel.findOne({ email });
        if (!user) throw { status: 400, message: message.auth.Invalid_credentials };

        const ok = await this.bcrypt.compare(password, user.password);
        if (!ok) throw { status: 400, message: message.auth.Invalid_credentials };

        const token = signJwt({
            sub: user._id.toString(),
            role: user.role,
        });

        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
}
