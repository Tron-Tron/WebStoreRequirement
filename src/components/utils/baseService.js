export const baseService = (model) => {
  // const findById = async (...options) => {
  //   try {
  //     const item = await model.findById(...options);
  //     return item;
  //   } catch (e) {}
  // };
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
  const findById = async (populate, ...condition) => {
    try {
      console.log(condition);
      console.log(...populate);
      const item = await model.findById(condition).populate(...populate);
      return item;
    } catch (errors) {
      throw errors;
    }
  };
  return { findById, findOneAndUpdate, findByIdAndDelete };
};
