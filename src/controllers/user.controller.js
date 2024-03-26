import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadONCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body
  console.log("email", email);
  if ([fullName, email, username, password].some((field) => field?.trim() === "")) {

  } {
    throw new ApiError(400, "All field are required")
  }
  const existedUser = User.find({
    $or: [{ username }, { email }]
  })
  if (existedUser) {
    throw new ApiError(409, "user with email or  username already exist")
  }
  const avatarLocalPath = req.files.avatar[0].path;
  const coverImageLocalpath = req.fields.coverImage[0].path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  }
  const avatar = await uploadONCloudinary(avatarLocalPath)

  const coverImage = await uploadONCloudinary(coverImageLocalpath)
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required")
  }
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email, 
    password,
    username: username.toLowerCase(),
  })
  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user")
  }
  return res.status(201).json(
    new ApiResponse(200,createdUser, "User Register Successfully")
  )
});

export { registerUser };