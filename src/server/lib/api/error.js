export default function (err, res) {
  if(err) {
    if(err.errors !== undefined){
      return res.status(400).json(err.errors);
    } else {
      return res.status(400).json( {"error": err.message });
    }
  }
}