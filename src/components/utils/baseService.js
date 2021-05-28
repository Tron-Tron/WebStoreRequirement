export const baseService = (model) => {
  const findOne = async (options, select = null, populate = null) => {
    try {
      const item = await model.findOne(options, select).populate(populate);
      return item;
    } catch (error) {
      throw error;
    }
  };
  const create = async (data, option = null) => {
    try {
      const item = new model(data);
      return item.save(option);
    } catch (error) {
      throw error;
    }
  };
  const findOneAndUpdate = async (...options) => {
    try {
      console.log(options);
      const item = await model.findOneAndUpdate(...options);
      return item;
    } catch (errors) {
      throw errors;
    }
  };
  const findByIdAndDelete = async (...options) => {
    try {
      console.log(options);
      const item = await model.findByIdAndDelete(...options);
      return item;
    } catch (errors) {
      throw errors;
    }
  };
  const getById = async (id, select = null, populate = null) => {
    try {
      console.log(id);
      console.log(select);
      const item = await model.findById(id, select).populate(populate);
      console.log(item);
      return item;
    } catch (errors) {
      throw errors;
    }
  };
  const getAll = async (condition = null, select = null, populate = null) => {
    const item = model.find(condition, select).populate(populate);
    return item;
  };
  return {
    getById,
    findOneAndUpdate,
    findByIdAndDelete,
    create,
    findOne,
    getAll,
  };
};
