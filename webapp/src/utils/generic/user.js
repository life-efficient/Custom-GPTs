import User from "@/models/User";
import { getServerSession } from "next-auth";
import connectMongo from "./mongoose";

const getUser = async () => {
    await connectMongo();
    const session = await getServerSession()
    let user
    user = await User.findOne({ email: session.user.email });
    if (!user) {
        user = { email: session.user.email}
    }
    return user;
}

const updateUser = async (newUserData) => {
    await connectMongo();
    const session = await getServerSession()
    const user = await User.findOne({ email: session.user.email });
    if (user) {
      user.set(newUserData);
      await user.save();
      return user;
    }
    return null;
}

export { getUser, updateUser }