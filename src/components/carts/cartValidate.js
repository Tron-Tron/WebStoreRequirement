import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

const schemas = {
  updateCart: Joi.object({
    productId: myJoiObjectId().trim().required(),
    amountCart: Joi.number().required(),
  }),
  paramCart: Joi.object({
    cartId: myJoiObjectId().trim().required(),
  }),
};
export default schemas;
