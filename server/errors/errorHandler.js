export function logErrorMiddleware(err, req, res, next) {
  console.log(err);
  return res.status(err.statusCode || 500).json();
}
