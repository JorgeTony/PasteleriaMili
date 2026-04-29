export interface Product {
  id: number;
  name: string;
  category: 'pasteles' | 'panes' | 'postres' | 'cupcakes';
  price: number;
  image: string;
  description: string;
  badge?: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Pastel de Chocolate Belga',
    category: 'pasteles',
    price: 85,
    image: 'https://readdy.ai/api/search-image?query=luxurious%20Belgian%20chocolate%20layer%20cake%20with%20dark%20chocolate%20ganache%20and%20fresh%20raspberries%20on%20white%20marble%20surface%20elegant%20bakery%20photography%20warm%20cream%20background&width=600&height=600&seq=prod1&orientation=squarish',
    description: 'Tres capas de bizcocho de cacao con ganache de chocolate belga 70% y frambuesas frescas.',
    badge: 'Más vendido',
    stock: 8,
  },
  {
    id: 2,
    name: 'Tarta de Frutos Rojos',
    category: 'pasteles',
    price: 72,
    image: 'https://readdy.ai/api/search-image?query=elegant%20red%20berries%20tart%20with%20strawberries%20blueberries%20raspberries%20on%20cream%20custard%20white%20ceramic%20plate%20soft%20natural%20light%20bakery%20style%20white%20background&width=600&height=600&seq=prod2&orientation=squarish',
    description: 'Base crujiente de mantequilla, crema pastelera de vainilla y selección de frutos rojos de temporada.',
    stock: 5,
  },
  {
    id: 3,
    name: 'Pan Artesanal de Masa Madre',
    category: 'panes',
    price: 22,
    image: 'https://readdy.ai/api/search-image?query=rustic%20sourdough%20artisan%20bread%20loaf%20with%20golden%20crispy%20crust%20and%20open%20crumb%20on%20wooden%20cutting%20board%20natural%20warm%20light%20bakery%20linen%20cloth%20cream%20background&width=600&height=600&seq=prod3&orientation=squarish',
    description: 'Pan de fermentación lenta (48h) con harina de trigo integral, corteza crujiente y miga abierta.',
    badge: 'Artesanal',
    stock: 15,
  },
  {
    id: 4,
    name: 'Croissant de Mantequilla',
    category: 'panes',
    price: 12,
    image: 'https://readdy.ai/api/search-image?query=golden%20flaky%20butter%20croissant%20with%20layers%20visible%20on%20white%20porcelain%20plate%20morning%20light%20bakery%20elegant%20minimalist%20cream%20white%20background&width=600&height=600&seq=prod4&orientation=squarish',
    description: 'Croissant hojaldrado con mantequilla francesa AOC, 27 capas perfectas de masa laminada.',
    stock: 20,
  },
  {
    id: 5,
    name: 'Macarons Surtidos',
    category: 'postres',
    price: 48,
    image: 'https://readdy.ai/api/search-image?query=colorful%20assorted%20french%20macarons%20pastel%20pink%20green%20yellow%20lavender%20arranged%20beautifully%20on%20white%20marble%20elegant%20confectionery%20photography%20soft%20background&width=600&height=600&seq=prod5&orientation=squarish',
    description: 'Caja de 12 macarons franceses: frambuesa, vainilla, pistache, lavanda y chocolate.',
    badge: 'Premium',
    stock: 12,
  },
  {
    id: 6,
    name: 'Cupcakes Red Velvet',
    category: 'cupcakes',
    price: 15,
    image: 'https://readdy.ai/api/search-image?query=beautiful%20red%20velvet%20cupcake%20with%20cream%20cheese%20frosting%20swirl%20sprinkles%20on%20white%20marble%20close%20up%20bakery%20photography%20cream%20background%20elegant&width=600&height=600&seq=prod6&orientation=squarish',
    description: 'Bizcocho húmedo de red velvet con frosting de queso crema y toque de vainilla.',
    stock: 18,
  },
  {
    id: 7,
    name: 'Cheesecake de Limón',
    category: 'postres',
    price: 62,
    image: 'https://readdy.ai/api/search-image?query=creamy%20lemon%20cheesecake%20with%20lemon%20curd%20topping%20and%20fresh%20lemon%20slices%20on%20white%20plate%20elegant%20bakery%20photography%20bright%20natural%20light%20cream%20background&width=600&height=600&seq=prod7&orientation=squarish',
    description: 'Cheesecake cremoso con base de galleta y curd de limón amarillo, fresco y equilibrado.',
    stock: 6,
  },
  {
    id: 8,
    name: 'Baguette Francesa',
    category: 'panes',
    price: 9,
    image: 'https://readdy.ai/api/search-image?query=traditional%20french%20baguette%20with%20golden%20crispy%20crust%20flour%20dusted%20on%20white%20linen%20cloth%20rustic%20bakery%20style%20warm%20light%20cream%20background&width=600&height=600&seq=prod8&orientation=squarish',
    description: 'Baguette tradicional francesa con corteza dorada y crujiente, interior suave y aireado.',
    stock: 25,
  },
  {
    id: 9,
    name: 'Pastel de Zanahoria',
    category: 'pasteles',
    price: 68,
    image: 'https://readdy.ai/api/search-image?query=carrot%20cake%20with%20cream%20cheese%20frosting%20walnuts%20and%20carrot%20decorations%20on%20white%20plate%20elegant%20bakery%20photography%20warm%20light%20cream%20white%20background&width=600&height=600&seq=prod9&orientation=squarish',
    description: 'Húmedo pastel de zanahoria con nueces, canela y frosting de queso crema, decorado con zanahorias de azúcar.',
    stock: 4,
  },
  {
    id: 10,
    name: 'Alfajores Peruanos',
    category: 'postres',
    price: 8,
    image: 'https://readdy.ai/api/search-image?query=traditional%20peruvian%20alfajores%20cookies%20with%20manjar%20blanco%20dulce%20de%20leche%20filling%20powdered%20sugar%20on%20white%20marble%20elegant%20bakery%20photography%20cream%20background&width=600&height=600&seq=prod10&orientation=squarish',
    description: 'Alfajores clásicos con galleta de maicena, relleno de manjar blanco casero y azúcar glass.',
    badge: 'Favorito',
    stock: 30,
  },
  {
    id: 11,
    name: 'Torta Tres Leches',
    category: 'pasteles',
    price: 78,
    image: 'https://readdy.ai/api/search-image?query=classic%20tres%20leches%20cake%20slice%20soaked%20in%20three%20milks%20topped%20with%20whipped%20cream%20and%20fresh%20strawberries%20on%20white%20plate%20elegant%20bakery%20photography%20cream%20background&width=600&height=600&seq=prod11&orientation=squarish',
    description: 'Bizcocho empapado en tres leches, cubierto de nata montada y fresas frescas. Suave y cremoso.',
    stock: 7,
  },
  {
    id: 12,
    name: 'Pan de Yema',
    category: 'panes',
    price: 6,
    image: 'https://readdy.ai/api/search-image?query=traditional%20pan%20de%20yema%20egg%20yolk%20sweet%20bread%20golden%20glazed%20soft%20texture%20on%20wooden%20board%20warm%20bakery%20light%20cream%20background%20rustic%20artisan&width=600&height=600&seq=prod12&orientation=squarish',
    description: 'Pan dulce tradicional elaborado con yemas de huevo, suave por dentro y brillante por fuera.',
    stock: 22,
  },
];

export const featuredProducts: Product[] = [products[0], products[2], products[4]];

export const galleryItems = [
  {
    id: 1,
    image: 'https://readdy.ai/api/search-image?query=stunning%20multi-tier%20wedding%20cake%20with%20white%20fondant%20and%20delicate%20sugar%20flowers%20roses%20on%20marble%20surface%20elegant%20luxury%20bakery%20photography%20cream%20background&width=800&height=900&seq=gal1&orientation=portrait',
    title: 'Pasteles de Boda',
    subtitle: 'Creaciones únicas para tu día especial',
  },
  {
    id: 2,
    image: 'https://readdy.ai/api/search-image?query=artisan%20breads%20assortment%20sourdough%20baguette%20ciabatta%20focaccia%20on%20wooden%20table%20rustic%20bakery%20warm%20natural%20light%20linen%20cloth%20cream%20white%20background&width=800&height=900&seq=gal2&orientation=portrait',
    title: 'Panes Artesanales',
    subtitle: 'Horneados diariamente con masa madre',
  },
  {
    id: 3,
    image: 'https://readdy.ai/api/search-image?query=beautiful%20assortment%20of%20french%20pastries%20eclairs%20tarts%20mille-feuille%20petit%20fours%20arranged%20elegantly%20on%20white%20marble%20pastel%20colors%20bakery%20luxury%20cream%20background&width=800&height=900&seq=gal3&orientation=portrait',
    title: 'Repostería Fina',
    subtitle: 'Técnicas francesas, sabores locales',
  },
];

export const galleryExtras = [
  {
    seq: 'gal4',
    label: 'Cupcakes',
    image: 'https://readdy.ai/api/search-image?query=colorful%20assorted%20cupcakes%20with%20swirled%20frosting%20and%20sprinkles%20arranged%20on%20white%20marble%20elegant%20bakery%20photography%20cream%20background%20pastel%20colors%20beautiful&width=400&height=300&seq=gal4&orientation=landscape',
  },
  {
    seq: 'gal5',
    label: 'Croissants',
    image: 'https://readdy.ai/api/search-image?query=golden%20flaky%20butter%20croissants%20and%20pain%20au%20chocolat%20on%20rustic%20wooden%20board%20morning%20bakery%20warm%20light%20cream%20background%20close%20up%20delicious&width=400&height=300&seq=gal5&orientation=landscape',
  },
  {
    seq: 'gal6',
    label: 'Macarons',
    image: 'https://readdy.ai/api/search-image?query=pastel%20french%20macarons%20tower%20pyramid%20with%20soft%20pink%20green%20yellow%20colors%20white%20marble%20elegant%20patisserie%20luxury%20cream%20background%20beautiful%20arrangement&width=400&height=300&seq=gal6&orientation=landscape',
  },
  {
    seq: 'gal7',
    label: 'Tartas de Fruta',
    image: 'https://readdy.ai/api/search-image?query=sliced%20fruit%20tart%20with%20custard%20cream%20fresh%20strawberries%20kiwi%20and%20blueberries%20on%20white%20plate%20elegant%20bakery%20close%20up%20natural%20light%20cream%20background&width=400&height=300&seq=gal7&orientation=landscape',
  },
  {
    seq: 'gal8',
    label: 'Alfajores',
    image: 'https://readdy.ai/api/search-image?query=peruvian%20alfajores%20cookies%20with%20dulce%20de%20leche%20filling%20and%20powdered%20sugar%20stack%20on%20white%20marble%20elegant%20bakery%20photography%20cream%20background%20close%20up&width=400&height=300&seq=gal8&orientation=landscape',
  },
  {
    seq: 'gal9',
    label: 'Tres Leches',
    image: 'https://readdy.ai/api/search-image?query=tres%20leches%20cake%20slice%20with%20whipped%20cream%20and%20fresh%20strawberries%20on%20elegant%20white%20plate%20dessert%20close%20up%20soft%20natural%20light%20cream%20background&width=400&height=300&seq=gal9&orientation=landscape',
  },
  {
    seq: 'gal10',
    label: 'Torta de Cumpleaños',
    image: 'https://readdy.ai/api/search-image?query=elegant%20layered%20birthday%20cake%20with%20fresh%20roses%20flowers%20decoration%20on%20marble%20stand%20luxury%20bakery%20cream%20background%20beautiful%20natural%20light%20celebration&width=400&height=300&seq=gal10&orientation=landscape',
  },
  {
    seq: 'gal11',
    label: 'Torta de Chocolate',
    image: 'https://readdy.ai/api/search-image?query=rich%20dark%20chocolate%20layer%20cake%20slice%20with%20chocolate%20ganache%20dripping%20and%20gold%20leaf%20on%20white%20plate%20elegant%20bakery%20photography%20warm%20natural%20light%20cream%20background&width=400&height=300&seq=gal11&orientation=landscape',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Sofía Martínez',
    role: 'Clienta frecuente',
    avatar: 'https://readdy.ai/api/search-image?query=portrait%20of%20happy%20smiling%20young%20latin%20woman%20with%20natural%20makeup%20warm%20expression%20clean%20background%20professional%20headshot%20photo&width=80&height=80&seq=av1&orientation=squarish',
    rating: 5,
    text: 'Los pasteles de Milis son simplemente increíbles. Pedí el pastel de chocolate para mi cumpleaños y todos mis invitados quedaron enamorados. ¡La calidad y presentación son incomparables!',
  },
  {
    id: 2,
    name: 'Carlos Reyes',
    role: 'Chef profesional',
    avatar: 'https://readdy.ai/api/search-image?query=portrait%20of%20confident%20smiling%20latin%20man%20in%20casual%20shirt%20warm%20natural%20light%20clean%20white%20background%20professional%20headshot&width=80&height=80&seq=av2&orientation=squarish',
    rating: 5,
    text: 'Como chef, valoro muchísimo la calidad de los ingredientes. El pan de masa madre de Milis tiene una fermentación perfecta. Lo recomiendo a todos mis colegas sin dudarlo.',
  },
  {
    id: 3,
    name: 'Valentina López',
    role: 'Organizadora de eventos',
    avatar: 'https://readdy.ai/api/search-image?query=portrait%20of%20elegant%20smiling%20woman%20with%20dark%20hair%20professional%20look%20warm%20light%20clean%20background%20confident%20headshot%20photo&width=80&height=80&seq=av3&orientation=squarish',
    rating: 5,
    text: 'He encargado pasteles de boda para más de 20 eventos y Milis nunca decepciona. El nivel de detalle en cada decoración es extraordinario. Mis clientes siempre quedan asombrados.',
  },
];
