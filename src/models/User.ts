import {Schema, model} from "mongoose";
import {compare, genSalt, hash} from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {versionKey: false, timestamps: true}
);

userSchema.statics.encryptPassword = async (password: string) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

userSchema.statics.comparePassword = async (
  password: string,
  receivedPassword: string
) => await compare(password, receivedPassword);

export default model("User", userSchema);
