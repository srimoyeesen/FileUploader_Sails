const fs = require('fs-extra');
const path = require('path');
const http = require('http');

const uploadLocation = path.join(__dirname, '../../.tmp/uploads');
console.log(uploadLocation);
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

    var uploadFile = req.file('uploadFile');
    console.log(uploadFile);
    uploadFile.upload(function onUploadComplete(err, files) {
      //  Files will be uploaded to .tmp/uploads
      if (err) return res.serverError(err);
      console.log(files);
      res.json({ status: 200, file: files });
    });
  },

  getFiles: function(req, res) {
    fs.readdir(uploadLocation, function(err, files) {
      if (err) {
        res.json({
          'message': err
        });
      }
      else {
        // res.json({
        //   'data': files
        // });
        res.render('pages/file_list.ejs', {data: files,clickHandler:"func1();"});
      }
    });
  },

  download : function (req,res) {
    //res.send('user' + req.body.fileName);
    res.download(uploadLocation + '/' + req.body.fileName,req.body.fileName, function (err) {
      if (err) {
        return res.serverError(err)
      }
    })

  }
};
