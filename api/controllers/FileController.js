/**
 * FileController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  upload: function(req, res) {
    if (req.method === 'GET')
      return res.json({ 'status': 'GET not allowed' });
    //	Call to /upload via GET is error

    var uploadFile = req.file('uploadFile');
    console.log(uploadFile);

    uploadFile.upload(function onUploadComplete(err, files) {
      //	Files will be uploaded to .tmp/uploads

      if (err) return res.serverError(err);
      //	IF ERROR Return and send 500 error with error

      console.log(files);
      res.json({ status: 200, file: files });
    });
  },

  download: function(req, res) {
    var fs = require('fs');
    var files = fs.readdirSync('../../.tmp/uploads');
    res.json({message: files}) // let's first check that the route exists
  }

};

