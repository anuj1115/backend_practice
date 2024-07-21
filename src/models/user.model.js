import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,   // to make it searchable
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
        },
        fullname: {
            type: String,
            required: true,
            trim: true, 
            index: true,
        },
        avatar: {
            type: String,  // cloudinary url
            required: true, 
        },
        conerImage: {
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

// this is used to encrypt password just before saving using mongoose inbuilt hook (pre)
// bcrypt, jwt node package

userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } else {
        return next()
    }
})

// to check whether the encrypt password is matched with
// original password (comparison)

userSchema.methods.isPasswordCorrect = async function(password) {
   return await bcrypt.compare(password, this.password)
}

// to generate access token

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}



export const User = mongoose.model("User", userSchema)