import { Schema, model } from "mongoose";


const refreshTokenSchema = new Schema({ 
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    RefreshToken: {
        type: String,
        required: true,
    }
 });

 const RefreshToken = model('RefreshToken', refreshTokenSchema);
 export default RefreshToken;
