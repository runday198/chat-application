export function logErrorMiddleware(err, req, res, next) {
  console.log("Error Handler: ", err);
  return res.status(err.statusCode || 500).json({ success: false });
}
