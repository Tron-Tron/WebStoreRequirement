import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

const schemas = {
  postProduct: Joi.object({
    productName: Joi.string().trim().required(),
    price: Joi.number().required(),
    amount: Joi.number().required(),
    description: Joi.string().required(),
    distributor: Joi.string().required(),
    categoryId: myJoiObjectId().trim().required(),
  }),
  paramProduct: Joi.object({
    productId: myJoiObjectId().trim().required(),
  }),
};
export default schemas;
