module.exports = (err, req, res, next) => {
  console.log(err);

  if(err instanceof TokemExpiredError){
    return res.status(419).send('Tokem expired');
  }
  if(err instanceof JsonWebTokemError){
    return res.status(401).send('Invalid Token');
  }

  if (!err.message || !err.status) {
    res.status(500).send('Server Error');
  } else {
    res.status(err.status).send(err.message);
  }

};
