let count = 0;
function requestCounter(req, res, next) {
  count++;
  console.log(`totalt inkommande requests: ${count}`);
  next();
}

export default requestCounter;
