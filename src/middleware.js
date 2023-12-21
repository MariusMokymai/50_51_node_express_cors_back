const firstMiddle = (req, res, next) => {
  console.log('Hello from middleware', new Date().toTimeString());
  next();
};

const bodyLooger = (req, res, next) => {
  // patikrinti ar route metodas yra put, post, patch
  console.log('req.method ===', req.method);
  // ['PUT', 'POST', 'PATCH'].includes(req.method);
  // if (req.method === 'PUT' || req.method === 'POST' || req.method === 'PATCH') {
  if (['PUT', 'POST', 'PATCH'].includes(req.method)) {
    console.log('req.body ===', req.body);
  }
  next();
};
module.exports = {
  firstMiddle,
  bodyLooger,
};
