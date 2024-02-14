import mongoose, { Model, Document } from "mongoose";

interface IUser extends Document {
  teamName: string;
  password: string;
  profitLoss: number;
  description: string;
  location: string;
  imageLink:string;
  isVerified: boolean;
  createdAt: Date;
  totalMoney: number;
  // Define other properties here
}

const userSchema = new mongoose.Schema<IUser>({
  teamName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profitLoss: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imageLink:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isVerified:{
    type:Boolean,
    default: false,
  },
  totalMoney:{
    type:Number,
    default:100,
  }
  // Define other properties here
});



let User: Model<IUser>;

if (mongoose.models.User) {
  User = mongoose.model<IUser>("User");
} else {
  User = mongoose.model<IUser>("User", userSchema);
}

export { User };
