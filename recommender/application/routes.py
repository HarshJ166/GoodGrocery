import pandas as pd
from application import app
from flask import Flask, render_template, request, redirect, url_for,jsonify
from application.remommendationMethods.collaborativeFiltering import cf
from application.remommendationMethods.contentBasedFiltering import cbf
from application.remommendationMethods.pearsonsRCorrelation import prc
from application.remommendationMethods.products import prodList
from application.remommendationMethods.orders_products_df import ordersProducts


@app.route('/',methods=['POST','GET'])

def home():
    return render_template('home.html', items = prodList())

@app.route('/collaborativeFiltering',methods=['POST','GET'])

def collaborativeFiltering():
    products = prodList()
    products = pd.DataFrame(products, columns =['product_id', 'product_name', 'aisle_id', 'department_id', 'aisle', 'department'])
    orders_products_df = ordersProducts()
    finalProducts = pd.DataFrame(orders_products_df.index).merge(products, on='product_name')
    swap_list = ["product_id","product_name","aisle_id","department_id", "aisle", "department"]
    finalProducts = finalProducts.reindex(columns=swap_list)
    finalProductsList = finalProducts.to_numpy().tolist()
    if request.method == 'POST' and request.form.get('button') != "refresh":
        product = finalProducts.index[finalProducts['product_id'] == int(request.form.get('button'))]
        result = cf(product)
        item = result["product_name"][0]
        result = result[1:]
        return render_template('home.html', recommendation = result.to_numpy().tolist(), route = "/collaborativeFiltering", items = finalProductsList, cart = item)
    return render_template('home.html', recommendation = [], route = "/collaborativeFiltering", items = finalProductsList)

list = {
  1: "https://c.ndtvimg.com/2019-10/rgsj9oc_frozen-foods-_625x300_25_October_19.jpg",
  2: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/vegetarian-diet-plan-1296x728-feature.jpg?w=1155&h=1528",
  3: "https://etimg.etb2bimg.com/photo/92271034.cms",
  4: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/vegetarian-diet-plan-1296x728-feature.jpg?w=1155&h=1528",
  5: "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3ZpbmVnYXItdXNlcy5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOiIxMjAwIn19fQ==",
  6: "https://www.viralspices.com/wp-content/uploads/2018/07/Spices.jpg",
  7: "https://eu-images.contentstack.com/v3/assets/blta023acee29658dfc/blta9f158c45627aa62/651dbb742365a678d7ec7f18/AdobeStock_279692163_Editorial_Use_Only-Beverage-FTR-new.jpg?disable=upscale&width=1200&height=630&fit=crop",
  8: "https://www.cessnapetstore.in/pub/media/catalog/product/cache/afe255019165e4447f45946ff95a294a/6/1/61zjsdka2nl._sl1000__2.jpg",
  9: "https://4.imimg.com/data4/YB/HG/ANDROID-46803775/product-500x500.jpeg",
  10: "https://cdn-magazine.nutrabay.com/wp-content/uploads/2023/02/image7-13.png",
  11: "https://modernwomanagenda.com/wp-content/uploads/2016/08/Natural-skincare-new.jpg",
  12: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/vegetarian-diet-plan-1296x728-feature.jpg?w=1155&h=1528",
  13: "https://www.thespruceeats.com/thmb/D45ZZGtWGoe2cMKljb9r_x3oepc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-493239254-b4ee2820e10a4230a747154c88366f86.jpg",
  14: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/10/fruit-salad-best-breakfast-foods-1296x728-body.jpg?w=1155&h=1528",
  15: "https://www.thespruceeats.com/thmb/U_Jl4KSukouhfsmTyvpR0A8UGx8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cannedfoodsWarren_Price-2d07bf3a98814f7b8f061e800a509627.jpg",
  16: "https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg",
  17: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1684892024-91pN6z5C7yL.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
  18: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1684892024-91pN6z5C7yL.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
  19: "https://www.tastingtable.com/img/gallery/25-most-popular-snacks-in-america-ranked-worst-to-best/intro-1645492743.jpg",
  20: "https://www.tastingtable.com/img/gallery/25-most-popular-snacks-in-america-ranked-worst-to-best/intro-1645492743.jpg",
  21: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/vegetarian-diet-plan-1296x728-feature.jpg?w=1155&h=1528",
};

@app.route('/contentBasedFiltering',methods=['POST','GET'])

def contentBasedFiltering():
    if request.method == 'POST':
        print(request.form)
        print(request.json.get('button'))
        
        products = prodList()
        products = pd.DataFrame(products, columns =['product_id', 'product_name', 'aisle_id', 'department_id', 'aisle', 'department'])
        product = products["product_name"][int(request.json.get('button'))-1]
        result = cbf(product)
        print (result.to_dict(orient='records'))
        data= result.to_dict(orient='records')
        #adding price, description and image to the result
        for i in range(len(data)):
            data[i]['price'] = 50.0
            data[i]['description'] = "This is a description"
            data[i]['image'] = list[data[i]['department_id']]
            data[i]['category'] = "category"
        return jsonify(data)  # Convert DataFrame to JSON
    return jsonify([])

@app.route('/pearsonsRCorrelation',methods=['POST','GET'])

def pearsonsRCorrelation():
    if request.method == 'POST':
        result = prc()
        return render_template('home.html', recommendation = result, items = prodList())
    return render_template('home.html', recommendation = [], route = "/pearsonsRCorrelation", items = prodList())

