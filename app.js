const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs')
const axios = require('axios')
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));


async function query(filename) {
	const data = fs.readFileSync(filename);
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: data,
		}
	);
	const result = await response.json();
	return result;
}

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {

console.log(__dirname)
        query(__dirname+`/public/uploads/${req.file.filename}`).then((response) => {
          console.log(JSON.stringify(response));
          res.send({
              status:"successfull",
              captipn : response,
          })
      }).catch(error=>{
        console.log(error);
          res.send({
              status:"unsuccessfull",error
          })
      });



        // res.render('index', {
        //   msg: 'File Uploaded!',
        //   file: `uploads/${req.file.filename}`
        // });
      }
    }
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));