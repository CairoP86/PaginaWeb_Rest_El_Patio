/**
 * Menú Restaurante El Patio — precios en colones (₡)
 */
window.MENU_DATA = [
  {
    id: "entradas",
    title: "Entradas",
    note: "",
    items: [
      { name: "Sopa Azteca", price: 5450, desc: "Con pollo, aguacate, queso mozzarella y tortilla tostada.", tags: ["pollo"] },
      { name: "Ensalada Oriental", price: 6000, desc: "Lechuga mixta, gajos de naranja con aderezo de maracuyá y pollo tempura.", tags: ["pollo"] },
      { name: "Ensalada del Campo", price: 6000, desc: "Lechuga, tomate, pepino, aguacate, cebolla morada, aderezo de la casa y pollo grillado.", tags: ["pollo"] },
      { name: "Plato de Patacones", price: 5550, desc: "Guacamole, pico de gallo y frijoles molidos. Carne mechada extra ₡2.000.", tags: ["mixto"], options: [{ id: "extra-carne", label: "Carne mechada extra", price: 2000 }] },
      { name: "Tacos Ticos", price: 3750, desc: "3 tacos de carne, ensalada de repollo, pico de gallo y aderezo chipotle.", tags: ["res"] },
      { name: "Falafel y Hummus", price: 3750, desc: "3 croquetas de garbanzo estilo mediterráneo, hummus y pan pita.", tags: ["vegano"] },
      { name: "Tacos de Pescado", price: 5500, desc: "Tortillas de maíz, pescado empanizado en tiras, repollo y salsa chipotle.", tags: ["pescado"] },
      { name: "Mozzarella Sticks", price: 4000, desc: "6 unidades con salsa de tomate natural.", tags: [] },
      { name: "Guacamole", price: 4000, desc: "Acompañado de totopos.", tags: ["vegano"] }
    ]
  },
  {
    id: "sandwiches",
    title: "Sandwiches",
    note: "Todos en pan ciabatta. Acompañamiento: papas fritas, ensalada o frutas. ₡6.000 c/u",
    items: [
      { name: "Caprese", price: 6000, desc: "Mozzarella fresca, tomate, albahaca y aderezo pesto.", tags: ["veggie"] },
      { name: "Cubano", price: 6000, desc: "Pierna de cerdo, jamón, mozzarella, pepinillos y mostaza.", tags: ["cerdo"] },
      { name: "Mexicano", price: 6000, desc: "Carne mechada, chipotle, mozzarella y jalapeño.", tags: ["res"] },
      { name: "Submarino", price: 6000, desc: "Pescado empanizado, tártara, lechuga, tomate y cebolla.", tags: ["pescado"] },
      { name: "Italiano", price: 6000, desc: "Pollo empanizado, parmesano, mozzarella, salsa de tomate y albahaca.", tags: ["pollo"] },
      { name: "Vegetariano", price: 6000, desc: "Vegetales grillados, mozzarella y salsa de tomate natural.", tags: ["veggie"] }
    ]
  },
  {
    id: "hamburguesas",
    title: "Hamburguesas",
    note: "",
    items: [
      { name: "Hamburguesa de Carne", price: 6750, desc: "Mozzarella, lechuga, tomate y cebolla.", tags: ["res"], options: [
        { id: "termino-3-4", label: "3/4", price: 0 },
        { id: "termino-medio", label: "Término medio", price: 0 },
        { id: "termino-rojo", label: "Término rojo", price: 0 }
      ] },
      { name: "Hamburguesa de Pollo", price: 6000, desc: "Mozzarella, lechuga, tomate y cebolla.", tags: ["pollo"], options: [
        { id: "salsa-buffalo", label: "Salsa Buffalo", price: 0 },
        { id: "mostaza-miel", label: "Mostaza Miel", price: 0 },
        { id: "bbq-agridulce", label: "BBQ agridulce", price: 0 }
      ] },
      { name: "Falafel", price: 6000, desc: "Lechuga, tomate, cebolla, tzatziki en pan pita.", tags: ["vegano"] },
      { name: "Pulled Pork", price: 6000, desc: "Cerdo desmenuzado al horno, BBQ, piña grill y coleslaw en pan artesanal.", tags: ["cerdo"] }
    ]
  },
  {
    id: "pastas",
    title: "Pastas",
    note: "Espagueti o penne, con pan de ajo.",
    items: [
      { name: "Pasta con Pesto", price: 6500, desc: "Acompañada de pollo.", tags: ["pollo"] },
      { name: "Pasta a la Checca", price: 6500, desc: "Mozzarella fresca, salsa de tomate natural y albahaca.", tags: ["veggie"] },
      { name: "Pasta de Camarones", price: 7750, desc: "Camarones en salsa rosada, tomate cherry y albahaca.", tags: ["mariscos"] },
      { name: "Pasta de Salmón", price: 8500, desc: "Salmón grillado en salsa blanca, tomates confitados y albahaca.", tags: ["pescado"] },
      { name: "Pasta boloñesa", price: 6500, desc: "Salsa de tomate con carne molida premium y parmesano.", tags: ["res"] },
      { name: "Pasta de lomo salteado", price: 8500, desc: "Lomo en salsa de soya con cebolla, tomate y chile dulce.", tags: ["res"] }
    ]
  },
  {
    id: "ninos",
    title: "Menú de niños",
    note: "Incluye té helado de limón o durazno. ₡3.800 c/u",
    items: [
      { name: "Pasta de tomate y queso", price: 3800, desc: "", tags: [] },
      { name: "Pasta a la mantequilla", price: 3800, desc: "", tags: [] },
      { name: "Dedos de pescado o pollo con papas", price: 3800, desc: "", tags: ["mixto"] },
      { name: "Mini casado", price: 3800, desc: "Arroz, frijoles, proteína (pollo, bistec o pescado), tomate y papas fritas.", tags: ["mixto"] }
    ]
  },
  {
    id: "ejecutivo-casado",
    title: "Plato ejecutivo y casado",
    note: "Bebida: té helado limón, durazno o verde.",
    items: [
      { name: "Plato Ejecutivo", price: 5500, desc: "1 proteína (chuleta, bistec, pescado empanizado/ajo/parrilla, pollo empanizado/parrilla o falafel). 2 acompañamientos a escoger.", tags: ["mixto"], options: [{ id: "doble-proteina", label: "Doble proteína", price: 2000 }] },
      { name: "Casado", price: 4500, desc: "1 proteína (mismas opciones). Incluye arroz, frijoles, pico, plátano maduro y ensalada de repollo.", tags: ["mixto"], options: [{ id: "doble-proteina", label: "Doble proteína", price: 2000 }] }
    ]
  },
  {
    id: "especialidades",
    title: "Especialidades de la casa",
    note: "Platos principales incluyen 2 acompañamientos.",
    items: [
      { name: "Arrachera 300g", price: 11900, desc: "Corte jugoso tipo entraña.", tags: ["res"], options: [
        { id: "termino-3-4", label: "3/4", price: 0 },
        { id: "termino-medio", label: "Término medio", price: 0 },
        { id: "termino-rojo", label: "Término rojo", price: 0 }
      ] },
      { name: "Rib Eye 300g", price: 11900, desc: "Marmoleo y sabor.", tags: ["res"], options: [
        { id: "termino-3-4", label: "3/4", price: 0 },
        { id: "termino-medio", label: "Término medio", price: 0 },
        { id: "termino-rojo", label: "Término rojo", price: 0 }
      ] },
      { name: "Churrasco 300g", price: 11900, desc: "Picaña, abundante grasa externa.", tags: ["res"], options: [
        { id: "termino-3-4", label: "3/4", price: 0 },
        { id: "termino-medio", label: "Término medio", price: 0 },
        { id: "termino-rojo", label: "Término rojo", price: 0 }
      ] },
      { name: "Lomo saltado", price: 11900, desc: "Trozos de lomo con cebolla morada, tomate y chile dulce.", tags: ["res"] },
      { name: "Camarones al gusto", price: 8500, desc: "12 unidades: empanizados, al ajillo o brochetas.", tags: ["mariscos"] },
      { name: "Salmón en salsa de camarones", price: 11900, desc: "Salmón grillado, salsa de camarones y tomates confitados.", tags: ["pescado"] },
      { name: "Costilla a la BBQ", price: 11900, desc: "Costilla estilo San Luis, 48 h marinada, BBQ de la casa.", tags: ["cerdo"] },
      { name: "Salteado de camarones", price: 8500, desc: "Estilo oriental con vegetales sobre quinoa y ensalada.", tags: ["mariscos"] }
    ]
  },
  {
    id: "rapidas",
    title: "Comidas rápidas",
    note: "",
    items: [
      { name: "Bowl vegetariano", price: 6500, desc: "Quinoa, vegetales grillados, lechuga, cherry, aguacate, maíz tostado, pan pita y tzatziki.", tags: ["vegano"] },
      { name: "Chifrijo", price: 6000, desc: "Arroz, frijoles tiernos, pico, aguacate, chips y chicharrón (carne, concha o mixto).", tags: ["mixto"] },
      { name: "Papas Arregladas", price: 6000, desc: "Papas, carne mechada, frijol ranchero, natilla, pico y queso.", tags: ["res"] },
      { name: "Fish and Chips", price: 6500, desc: "Pescado empanizado, ensalada y papas con tártara.", tags: ["pescado"] },
      { name: "Boneless de Pollo", price: 6000, desc: "Pollo empanizado y salsa (Búfalo, mostaza miel, agridulce o BBQ) con papas.", tags: ["pollo"] },
      { name: "Arroz con camarones", price: 7500, desc: "Con papas fritas y ensalada.", tags: ["mariscos"] },
      { name: "Pollo a la parmesana", price: 7500, desc: "Jamón, salsa de tomate, mozzarella y orégano; ensalada y papas.", tags: ["pollo"] },
      { name: "Burrito Sabanero", price: 7500, desc: "Carne asada, camarones, guacamole, arroz y frijoles charros, salsa chipotle, papas y pico.", tags: ["mixto"] }
    ]
  },
  {
    id: "otros",
    title: "Otros platos",
    note: "",
    items: [
      { name: "Burrito vegetariano", price: 5500, desc: "Tortilla con hummus, vegetales grillados y ensalada.", tags: ["vegano"] },
      { name: "Quesadillas Camarón, Carne o Pollo", price: 7500, desc: "Queso mozzarella, salsa cheddar, proteína, pico y guacamole.", tags: ["mixto"] },
      { name: "Plato de chicharrones", price: 6500, desc: "Yuca frita, repollo y pico de gallo.", tags: ["cerdo"] },
      { name: "Gallo de Arrachera", price: 7000, desc: "Arrachera en 2 tortillas palmeadas con queso, encurtido, guacamole y pico.", tags: ["res"] },
      { name: "Wrap de pollo al gusto", price: 6500, desc: "Pollo tempura con salsa (búfalo, mostaza miel, BBQ o ranch), tortilla, lechuga, tomate, aguacate y papas.", tags: ["pollo"] }
    ]
  },
  {
    id: "bebidas",
    title: "Bebidas",
    note: "*Precios no incluyen 10% de servicio. Empaque para llevar ₡300.",
    items: [
      { name: "Cocteles", price: 4500, desc: "Piña colada, daiquirí, gin tonic, margarita, cuba libre, frozen mojito, tequila sunrise, bloody mary, rusos y más.", tags: [] },
      { name: "Cervezas nacionales", price: 1750, desc: "Pilsen e Imperial.", tags: [] },
      { name: "Cervezas premium", price: 2500, desc: "Bavaria, Corona, Stella, Heineken.", tags: [] },
      { name: "Cervezas artesanales", price: 3500, desc: "", tags: [] },
      { name: "Vinos", price: 4000, desc: "Tinto o blanco.", tags: [] },
      { name: "Sangría / Clericó", price: 4500, desc: "", tags: [] },
      { name: "Refrescos naturales", price: 2000, desc: "Mango, piña, maracuyá, cas, fresa, piña colada, guanábana, tamarindo, mora.", tags: [] },
      { name: "Smoothies en leche", price: 3000, desc: "Variedad de frutas.", tags: [] },
      { name: "Naturales / gaseosas", price: 1500, desc: "Ver carta en local.", tags: [] },
      { name: "Postre del día", price: 0, desc: "Consulte en el restaurante.", tags: [] }
    ]
  }
];
