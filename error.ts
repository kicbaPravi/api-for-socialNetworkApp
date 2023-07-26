export interface Errors extends Error {
  status: any;
}

export const createError = (status: number, message: string) => {
  const err = new Error() as Errors;

  err.status = status;
  err.message = message;

  return err;
};
