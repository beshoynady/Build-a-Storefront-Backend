API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products

API Endpoints
Users
route.post('/', controllers.createNewUser) //when creating new user no need to validation
route.get('/', verifyToken, controllers.showAllUsers) //require validation
route.get('/:user_id', verifyToken, controllers.getUserById) //require validation
route.patch('/:user_id', verifyToken, controllers.updateUserById) //require validation
route.delete('/:user_id', verifyToken, controllers.deleteUserById) //require validation
route.post('/login', controllers.authenticateUser) //the main validation


Products
route.post('/', Validation, controllers.createNewProduct) //when creating new user no need to validation
route.get('/', controllers.getAllProducts) //require validation
route.get('/:product_id', controllers.getProduct) //require validation
route.patch('/:product_id', Validation, controllers.updateProduct) //require validation
route.delete('/:product_id', Validation, controllers.deleteProduct) //require validation


#Orders

route.post('/', Validation, controllers.createOrder) //when creating new user no need to validation
route.get('/', Validation, controllers.getAllOrders) //require validation
route.get('/:order_id', Validation, controllers.getOneOrder) //require validation
route.patch('/:order_id', Validation, controllers.updateOneOrder) //require validation
route.delete('/:order_id', Validation, controllers.deleteOneOrder) //require validation

##porduct-order
route.post('/', Validation, controllers.createProducts_orders) //when creating new user no need to validation
route.get('/', Validation, controllers.getAllProducts_orders) //require validation
route.get('/:product_order_id',Validation,controllers.getProducts_orders) //require validation
route.patch('/:product_order_id',Validation,controllers.updateProdcutsOrder) //require validation
route.delete('/:product_order_id',Validation,controllers.deletePRoductsOrder) //require validation


###Data Shapes

##users
    user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    user_name VARCHAR (50) NOT NULL UNIQUE ,
    first_name VARCHAR (50) NOT NULL, 
    last_name VARCHAR (50) NOT NULL, 
    password VARCHAR (255) NOT NULL);

##products
    product_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    product_name VARCHAR (50) NOT NULL UNIQUE,
    price VARCHAR (50) NOT NULL);

##orders
    order_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    order_status VARCHAR(50) NOT NULL,
    user_id uuid DEFAULT uuid_generate_v4 () NOT NULL,  FOREIGN KEY (user_id) REFERENCES users (user_id) );

##products_orders
    product_order_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    product_id uuid DEFAULT uuid_generate_v4 (), 
    order_id uuid DEFAULT uuid_generate_v4 (), 
    quantity int NOT NULL , 
    FOREIGN KEY (product_id) REFERENCES products (product_id),
    FOREIGN KEY (order_id) REFERENCES orders (order_id) );
