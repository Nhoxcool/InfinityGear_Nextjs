import { Document, Model, Schema, model, models } from "mongoose";

interface UserDocument extends Document {
    email: string;
    name: string;
    password: string;
    role: "admin" | "user";
    avatar: {url: string; id: string};
    verified: boolean;
}

const userSchema = new Schema<UserDocument>({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true, trim: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'user'], default: 'user'},
    avatar: {type: Object, url: String, id: String},
    verified: {type: Boolean, default: false},
}, {timestamps: true});

const UserModel = models.User || model('User', userSchema);

export default UserModel as Model<UserDocument>