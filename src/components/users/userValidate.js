import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

const schemas = {
  postUser: Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    phone: Joi.string()
      .pattern(
        new RegExp("/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im")
      )
      .required(),
  }),
  paramUser: Joi.object({
    userId: myJoiObjectId().trim().required(),
  }),
};
export default schemas;
