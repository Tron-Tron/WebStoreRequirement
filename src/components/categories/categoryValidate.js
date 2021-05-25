import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

const schemas = {
  postCategory: Joi.object({
    categoryName: Joi.string().trim().required(),
    descriptionCategory: Joi.string().required(),
  }),
  paramCategory: Joi.object({
    categoryId: myJoiObjectId().trim().required(),
  }),
};
export default schemas;
