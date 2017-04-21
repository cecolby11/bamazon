USE Bamazon;

# populate products with dummy data
INSERT INTO products (
    product_name,
    department_name,
    price,
    stock_quantity
) VALUES
("velcro", "home improvement", 4.67, 76),
("bonsai food", "gardening", 6.99, 120),
("kitty crown", "pet care", 12.99, 61),
("peach scones", "grocery", 14.88, 20),
("propeller hat", "fashion", 17.99, 15),
("cow statue", "clearance", 3.89, 45),
("car antlers", "automotive", 49.95, 160),
("bamazon bot", "tech and robots", 999.99, 6),
("kids jeep", "travel", 999.99, 2),
("ice cubes", "frozen", 14.99, 100),
("cactus pen", "stationary", 5.99, 40)
;

INSERT INTO departments (
    department_name, 
    overhead_costs
) VALUES
("home improvement", 100.00),
("gardening", 50.00),
("pet care", 30.00),
("grocery", 300.00),
("fashion", 120.00),
("clearance", 20.00),
("automotive", 80.00),
("tech and robots", 200.00),
("travel", 70.00),
("frozen", 90.00),
("stationary", 16.00)
;
