import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

const schemaStaff = {
  postStaff: Joi.object({
    staffName: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    address: Joi.string().required(),
    phone: Joi.string()
      .trim()
      .pattern(/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im)
      .required(),
    dateOfBirth: Joi.date().required(),
  }).unknown(true),
  paramStaff: Joi.object({
    staffId: myJoiObjectId().trim().required(),
  }),
};
export default schemaStaff;
