import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

const schemas = {
  paramCategory: Joi.object({
    idOrder: myJoiObjectId().trim().required(),
  }),
};
export default schemas;
