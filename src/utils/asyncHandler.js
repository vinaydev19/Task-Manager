const asyncHandler = (requestHandler) => {
  (req, resp, next) => {
    Promise.resolve(requestHandler()).catch((error) => next(error));
  };
};

export { asyncHandler };
