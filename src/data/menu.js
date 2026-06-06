const productSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const productImg = (name) => `/assets/products/${productSlug(name)}.png`;
const showcaseImg = (name) => `/assets/showcase/${productSlug(name)}.png`;
const yemeniImg = (name) => `/assets/products/yemeni-${productSlug(name)}.png`;

export const socialLinks = {
  instagram: 'https://www.instagram.com/anna_cafeanna?igsh=czQ3c2Q5NXdseXJs',
  snapchat: 'https://www.snapchat.com/@annacafeanna?share_id=LJD52b8IQmG1-tQn1RfM5Q&locale=en_QA',
  maps: 'https://maps.google.com/?q=Ezdan%20Mall%20Al%20Wakra%20Anna%20Cafe',
  // Put the cafe WhatsApp number here in international format without +, e.g. '974XXXXXXXX'.
  // When empty, the order button opens WhatsApp's share composer with the message prefilled.
  whatsappNumber: '+97477794040'
};

export const menuPages = [

  '/assets/menu-pages/page-3.png',
  '/assets/menu-pages/page-4.png',
  '/assets/menu-pages/page-5.png',
  '/assets/menu-pages/page-6.png',
  
];

export const heroSlides = [
  {
    name: 'Spanish Latte',
    category: 'Signature coffee',
    price: '19',
    image: showcaseImg('Spanish Latte'),
    line: 'Velvety espresso, milk, and a soft caramel finish.'
  },
  {
    name: 'San Sebastian Cake',
    category: 'Signature dessert',
    price: '30',
    image: showcaseImg('San Sebastian Cake'),
    line: 'Burnt caramel cheesecake with a glossy cafe-style crown.'
  },
  {
    name: 'Strawberry Mojito',
    category: 'Cold refreshment',
    price: '17',
    image: showcaseImg('Strawberry Mojito'),
    line: 'Mint, berry sparkle, and a colorful tray-ready serve.'
  },
  {
    name: 'Classic Tiramisu',
    category: 'Layered sweet',
    price: '30',
    image: showcaseImg('Classic Tiramisu'),
    line: 'Coffee, cocoa, cream, and polished Anna Cafe plating.'
  }
];

export const signatureItems = [
  {
    name: 'Spanish Latte',
    price: '19',
    category: 'Cold + Hot Coffee',
    note: 'Silky espresso, milk, and a soft caramel finish.',
    image: showcaseImg('Spanish Latte'),
    badge: 'Bestseller'
  },
  {
    name: 'San Sebastian Cake',
    price: '30',
    category: 'Cake & Sweets',
    note: 'Creamy baked cheesecake with a glossy caramel crown.',
    image: showcaseImg('San Sebastian Cake'),
    badge: 'Signature'
  },
  {
    name: 'Classic Tiramisu',
    price: '30',
    category: 'Cheese Cake',
    note: 'Coffee-soaked layers, cocoa dust, and elegant cafe plating.',
    image: showcaseImg('Classic Tiramisu'),
    badge: 'Velvet'
  },
  {
    name: 'Strawberry Mojito',
    price: '17',
    category: 'Mojito',
    note: 'Fresh mint, fruit sparkle, and a premium social-first look.',
    image: showcaseImg('Strawberry Mojito'),
    badge: 'Fresh'
  }
];

export const menuCategories = [
  {
    id: 'hot',
    title: 'Hot Coffee',
    arabic: 'قهوة ساخنة',
    description: 'Classic espresso bar favourites.',
    image: productImg('Spanish Latte'),
    items: [
      ['Espresso', '10', productImg('Espresso')],
      ['Double Espresso', '15', productImg('Double Espresso')],
      ['Americano', '12', productImg('Americano')],
      ['Cortado', '15', productImg('Cortado')],
      ['Flat White', '19', productImg('Flat White')],
      ['Cafe Latte', '19', productImg('Cafe Latte')],
      ['Cappuccino', '19', productImg('Cappuccino')],
      ['Spanish Latte', '19', productImg('Spanish Latte')],
      ['Vanilla Latte', '20', productImg('Vanilla Latte')],
      ['Mocha', '20', productImg('Mocha')],
      ['Caramel Latte', '20', productImg('Caramel Latte')],
      ['Salted Caramel Latte', '20', productImg('Salted Caramel Latte')],
      ['Arabic Coffee', '30', productImg('Arabic Coffee')]
    ]
  },
  {
    id: 'yemeni',
    title: 'Special Yemeni Coffee',
    arabic: 'قهوة يمنية مميزة',
    description: 'A richer premium coffee list.',
    image: yemeniImg('Spanish Latte'),
    items: [
      ['Espresso', '20', yemeniImg('Espresso')],
      ['Double Espresso', '25', yemeniImg('Double Espresso')],
      ['Americano', '25', yemeniImg('Americano')],
      ['Cortado', '27', yemeniImg('Cortado')],
      ['Flat White', '26', yemeniImg('Flat White')],
      ['Cafe Latte', '26', yemeniImg('Cafe Latte')],
      ['Cappuccino', '25', yemeniImg('Cappuccino')],
      ['Spanish Latte', '27', yemeniImg('Spanish Latte')],
      ['Vanilla Latte', '27', yemeniImg('Vanilla Latte')],
      ['Mocha', '24', yemeniImg('Mocha')]
    ]
  },
  {
    id: 'filter',
    title: 'Filter Brews',
    arabic: 'قهوة مقطرة',
    description: 'Slow-brewed clarity and aroma.',
    image: productImg('Cold Brew'),
    items: [
      ['V60', '20', productImg('V60')],
      ['V60 Yemeni Coffee', '30', productImg('V60 Yemeni Coffee')],
      ['Chemex', '20', productImg('Chemex')],
      ['Afropress', '20', productImg('Afropress')],
      ['Cold Brew', '19', productImg('Cold Brew')]
    ]
  },
  {
    id: 'cold',
    title: 'Cold Drinks',
    arabic: 'مشروبات باردة',
    description: 'Chilled, creamy, and refreshing.',
    image: productImg('Iced Latte'),
    items: [
      ['Iced Americano', '12', productImg('Iced Americano')],
      ['Iced Salted Caramel', '20', productImg('Iced Salted Caramel')],
      ['Iced Caramel', '20', productImg('Iced Caramel')],
      ['Iced Spanish', '19', productImg('Iced Spanish')],
      ['Iced Latte', '19', productImg('Iced Latte')],
      ['Iced Vanilla', '20', productImg('Iced Vanilla')]
    ]
  },
  {
    id: 'noncoffee',
    title: 'Non Coffee',
    arabic: 'مشروبات بدون قهوة',
    description: 'Tea, chocolate, and matcha comforts.',
    image: productImg('Matcha Latte'),
    items: [
      ['Green Tea', '14', productImg('Green Tea')],
      ['English Tea', '14', productImg('English Tea')],
      ['Matcha Latte', '20', productImg('Matcha Latte')],
      ['Hot Chocolate', '20', productImg('Hot Chocolate')],
      ['Iced Chocolate', '20', productImg('Iced Chocolate')]
    ]
  },
  {
    id: 'water',
    title: 'Water',
    arabic: 'مياه',
    description: 'Simple still and sparkling options.',
    image: productImg('Still Water'),
    items: [
      ['Still Water', '8', productImg('Still Water')],
      ['Sparkling Water', '10', productImg('Sparkling Water')]
    ]
  },
  {
    id: 'mojito',
    title: 'Mojito',
    arabic: 'موهيتو',
    description: 'Fruit-led coolers for warm afternoons.',
    image: productImg('Strawberry Mojito'),
    items: [
      ['Strawberry Mojito', '17', productImg('Strawberry Mojito')],
      ['Peach Mojito', '17', productImg('Peach Mojito')],
      ['Raspberry Mojito', '17', productImg('Raspberry Mojito')],
      ['Blackberry Mojito', '17', productImg('Blackberry Mojito')],
      ['Blueberry Mojito', '17', productImg('Blueberry Mojito')],
      ['Watermelon Mojito', '17', productImg('Watermelon Mojito')],
      ['Passion Fruit Mojito', '17', productImg('Passion Fruit Mojito')],
      ['Orange Juice', '13', productImg('Orange Juice')],
      ['Limon Mint Curcado Vemto', '17', productImg('Limon Mint Curcado Vemto')],
      ['Curcado with Pineapple', '17', productImg('Curcado with Pineapple')]
    ]
  },
  {
    id: 'cookies',
    title: 'Cookies',
    arabic: 'كوكيز',
    description: 'Soft cookies and brownies.',
    image: productImg('Classic Cookies'),
    items: [
      ['Classic Cookies', '18', productImg('Classic Cookies')],
      ['Double Chocolate', '20', productImg('Double Chocolate')],
      ['Pistachio Cookies', '22', productImg('Pistachio Cookies')],
      ['Classic Brownies', '18', productImg('Classic Brownies')]
    ]
  },
  {
    id: 'cakes',
    title: 'Cake & Sweets',
    arabic: 'كيك وحلويات',
    description: 'Desserts made for sharing.',
    image: productImg('San Sebastian Cake'),
    items: [
      ['Honey Cake', '30', productImg('Honey Cake')],
      ['San Sebastian Cake', '30', productImg('San Sebastian Cake')],
      ['Raspberry Cheese Cake', '30', productImg('Raspberry Cheese Cake')],
      ['Mango Cheese Cake', '30', productImg('Mango Cheese Cake')],
      ['Blueberry Cheese Cake', '30', productImg('Blueberry Cheese Cake')],
      ['Classic Tiramisu', '30', productImg('Classic Tiramisu')],
      ['Sweet Cake', '25', productImg('Sweet Cake')],
      ['Cup Cake', '10', productImg('Cup Cake')],
      ['Tiramisu', '25', productImg('Tiramisu')],
      ['Signature Basbousa', '08', productImg('Signature Basbousa')],
      ['Sabaya', '12', productImg('Sabaya')]
    ]
  },
  {
    id: 'cream-filling',
    title: 'Cream Filling',
    arabic: 'حشوة كريمة',
    description: 'Cream-filled pastry flavours.',
    image: productImg('Raspberry Cheese Cake'),
    items: [
      ['Raspberry Cream Filling', '25', productImg('Raspberry Cream Filling')],
      ['Pastry Cream Filling', '25', productImg('Pastry Cream Filling')],
      ['Pistachio Cream Filling', '25', productImg('Pistachio Cream Filling')],
      ['Blueberry Cream Filling', '25', productImg('Blueberry Cream Filling')],
      ['Chocolate Raspberry Cream Filling', '25', productImg('Chocolate Raspberry Cream Filling')]
    ]
  },
  {
    id: 'croissant',
    title: 'Croissant',
    arabic: 'كرواسون',
    description: 'Buttery pastry with sweet and savoury fillings.',
    image: productImg('Croissant Plain'),
    items: [
      ['Croissant Plain', '12', productImg('Croissant Plain')],
      ['Croissant Cheese', '14', productImg('Croissant Cheese')],
      ['Croissant Zaatar', '14', productImg('Croissant Zaatar')],
      ['Croissant Plain Au Chocolate', '14', productImg('Croissant Plain Au Chocolate')],
      ['Croissant Cheese Danish', '18', productImg('Croissant Cheese Danish')],
      ['Croissant Almond', '18', productImg('Croissant Almond')]
    ]
  },
  {
    id: 'special-sweets',
    title: 'Special Sweets',
    arabic: 'حلويات خاصة',
    description: 'Small treats and cafe specials.',
    image: productImg('Sweet Cake'),
    items: [
      ['Sweet Cake', '25', productImg('Sweet Cake')],
      ['Cup Cake', '10', productImg('Cup Cake')],
      ['Tiramisu', '25', productImg('Tiramisu')],
      ['Signature Basbousa', '08', productImg('Signature Basbousa')],
      ['Sabaya', '12', productImg('Sabaya')]
    ]
  },
  {
    id: 'sandwich',
    title: 'Sandwich',
    arabic: 'ساندويتش',
    description: 'Cafe bites for quick cravings.',
    image: productImg('Chicken'),
    items: [
      ['Chicken', '12', productImg('Chicken')],
      ['Chicken Croissant', '12', productImg('Chicken Croissant')],
      ['Cheese with Avocado', '16', productImg('Cheese with Avocado')]
    ]
  }
];

export const catalogItems = menuCategories.flatMap((category) =>
  category.items.map(([name, price, image], index) => ({
    id: `${category.id}-${index}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    price: Number(price),
    displayPrice: price,
    image,
    categoryId: category.id,
    category: category.title,
    arabicCategory: category.arabic
  }))
);

export const galleryImages = [
  showcaseImg('Spanish Latte'),
  showcaseImg('San Sebastian Cake'),
  showcaseImg('Strawberry Mojito'),
  showcaseImg('Classic Tiramisu'),
  showcaseImg('Croissant Plain'),
  showcaseImg('Blueberry Cheese Cake'),
  showcaseImg('Iced Caramel'),
  showcaseImg('Chicken')
];
