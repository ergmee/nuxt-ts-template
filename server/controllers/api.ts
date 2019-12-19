const fs = require('fs')
import express from 'express';
let router = express.Router();
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json({ limit: '50mb' });

var productsFilePath = "./data/products.json"
var receptsFilePath = "./data/recepts.json"

router.post('/createProduct', jsonParser, (req: any, res: any) => {
	if ("name" in req.body && "category" in req.body) {
		let productObj = JSON.parse(fs.readFileSync(productsFilePath, "UTF8"))
		productObj[req.body.name] = {
			name: req.body.name,
			avatar: req.body.avatar,
			category: req.body.category,
			protein: req.body.protein,
			fat: req.body.fat,
			carbohydrate: req.body.carbohydrate,
			kcal: req.body.kcal,
			metaData: {
				autor: req.body.metaData.autor, 
				timestamp: req.body.metaData.timestamp
			}
		}
		fs.writeFileSync(productsFilePath, JSON.stringify(productObj))
		res.json({ result: true })
	}
	else {
		res.json({ result: false })
	}
});
router.post('/removeProduct', jsonParser, (req: any, res: any) => {
	if ("product" in req.body) {
		let productObj = JSON.parse(fs.readFileSync(productsFilePath, "UTF8"))
		delete productObj[req.body.product.name]
		fs.writeFileSync(productsFilePath, JSON.stringify(productObj))
		res.json({ result: true })
	} else {
		res.json({ result: false })
	}
});
router.get('/getProducts', (req: any, res: any) => {
	let products = JSON.parse(fs.readFileSync(productsFilePath, "UTF8"))
	req;
	res.json({ status: 0, result: products })
})
router.post('/saveRecept', jsonParser, (req: any, res: any) => {
	console.log("SERVER saveRecept:", req.body)
	res.json({ result: true })

	// прежде чем это раскоменчивать, следует привести ингридиенты вподобающий вид 
	// if ("name" in req.body) {
	// 	let receptObj = JSON.parse(fs.readFileSync(receptsFilePath, "UTF8"))
	// 	receptObj[req.body.name] = {
	// 		name: req.body.name,
	// 		avatar: req.body.avatar,
  //     category: req.body.category,
  //     description :req.body.description,
  //     favoritesAdd: req.body.favoritesAdd,
  //     photo:req.body.photo,
  //     tags:req.body.tags,
  //     ingredientsList: req.body.ingredientsList,
  //     metaData: {
  //       autor: req.body.metaData.autor,
  //       timestamp: req.body.metaData.timestamp
  //     }
	// 	}
	// 	fs.writeFileSync(receptsFilePath, JSON.stringify(receptObj))
	// 	res.json({ result: true })
	// }
	// else {
	// 	res.json({ result: false })
	// }

});
// router.post('/removeRecept', (req: any, res: any) => {});
router.get('/getRecepts', (req: any, res: any) => {
	let recepts = JSON.parse(fs.readFileSync(receptsFilePath, "UTF8"))
	req;
	res.json({ status: 0, result: recepts })
});

export default router;