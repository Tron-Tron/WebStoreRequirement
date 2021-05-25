import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

const schemaAuth = {
  registerAuth: Joi.object({
    authName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().trim(),
  }),
  loginAuth: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
export default schemaAuth;
