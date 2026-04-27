const promocoes= [
    { id: 1, imagem: "https://hortifrutibr.vtexassets.com/arquivos/ids/173881/Refrigerante-Coca-Cola-sabor-original-2l-gelada.jpg.jpg?v=638944163980900000"},

    { id: 2, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKFNNex092-A7CcRYtpE1gXFh5aedqk9-kA&s"},

    { id: 3, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Qykuyvrh-aUgY1fLEJEqPP9TGJxnr-h58g&s"},

    { id: 4, imagem: "https://product-data.raiadrogasil.io/images/3465993.webp"}
]

const produtos = [
    {
        id: 1,
        nome: "Arroz Branco Camil 1kg",
        preco: 5,
        categoria: "Mercearia",
        descricao: "Arroz Branco Camil 1kg — Grãos selecionados que garantem cozimento rápido e textura soltinha. Ideal para o dia a dia.",
        imagem : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKFNNex092-A7CcRYtpE1gXFh5aedqk9-kA&s"
    },
    {
        id: 2,
        nome: "Feijão Carioca Kicaldo 1kg",
        preco: 8,
        categoria: "Mercearia",
        descricao: "Feijão Carioca Kicaldo 1kg — Grãos selecionados que proporcionam cozimento uniforme, caldo encorpado e muito sabor. Ideal para o dia a dia.",
        imagem: "https://d3gdr9n5lqb5z7.cloudfront.net/fotos/1165.jpg"
    },
    {
        id: 3,
        nome: "Macarrão Espaguete Fortaleza 400g",
        preco: 5,
        categoria: "Mercearia",
        descricao: "Macarrão Espaguete Fortaleza 400g — Massa de qualidade que garante cozimento uniforme e textura al dente. Ideal para diversas receitas do dia a dia.",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJSfrAn0WKvkaWNwhjqk9G2CN97TNlcqdCmQ&s"
    },
    {
        id: 4,
        nome: "Óleo de Soja Soya 900ml",
        preco: 7,
        categoria: "Mercearia",
        descricao: "Óleo de Soja Soya 900 ml — Óleo vegetal refinado, ideal para frituras e preparo de diversas receitas, garantindo leveza e sabor no dia a dia.",
        imagem: "https://mercantilnovaera.vtexassets.com/arquivos/ids/214695-800-450?v=638447417992900000&width=800&height=450&aspect=true"
    },
    {
        id: 5,
        nome: "Açúcar Refinado Uniao 1kg",
        preco: 6,
        categoria: "Mercearia",
        descricao: "Açúcar Refinado União 1kg — Açúcar de alta pureza, com cristais finos que dissolvem facilmente, ideal para adoçar bebidas e preparar diversas receitas do dia a dia.",
        imagem: "https://lojasantoantonio.vtexassets.com/arquivos/ids/209096/5885-Acucar-Refinado-1KG-UNIAO.jpg?v=638200992520000000"
    },
    {
    id: 6,
    nome: "Refrigerante Coca-Cola 2L",
    preco: 8,
    categoria: "Bebidas",
    descricao: "Refrigerante Coca-Cola 2L — Bebida gaseificada com sabor clássico e refrescante, ideal para acompanhar refeições e momentos especiais.",
    imagem: "https://hortifrutibr.vtexassets.com/arquivos/ids/173881/Refrigerante-Coca-Cola-sabor-original-2l-gelada.jpg.jpg?v=638944163980900000"
},
{
    id: 7,
    nome: "Água Mineral Crystal Sem Gás 500ml",
    preco: 3,
    categoria: "Bebidas",
    descricao: "Água Mineral Crystal Sem Gás 500ml — Água mineral natural, leve e refrescante, ideal para hidratação no dia a dia.",
    imagem: "https://www.imigrantesbebidas.com.br/bebida/images/products/full/2893-agua-mineral-crystal-sem-gas-500ml.jpg"
},
{
    id: 8,
    nome: "Suco de Caixa - Fina Farinha",
    preco: 4,
    categoria: "Bebidas",
    descricao: "Suco de Caixa Fina Farinha 200ml — Bebida pronta para consumo, com sabor refrescante e prática para o dia a dia.",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyWcwoNIq3hJE1hoe2rVs3XTuJF-Nu8DwDWA&s"
},
{
    id: 9,
    nome: "Monster Energy Zero Sugar 473ml",
    preco: 10,
    categoria: "Bebidas",
    descricao: "Monster Energy Zero Sugar 473ml — Bebida energética sem açúcar, com alto teor de cafeína, ideal para aumentar a energia e o foco no dia a dia.",
    imagem: "https://product-data.raiadrogasil.io/images/3465993.webp"
},
{
    id: 10,
    nome: "Cerveja Skol Pilsen Lata 350ml",
    preco: 5,
    categoria: "Bebidas",
    descricao: "Cerveja Skol Pilsen Lata 350ml — Cerveja leve e refrescante, com sabor suave, ideal para momentos de descontração.",
    imagem: "https://fortatacadista.vteximg.com.br/arquivos/ids/309356-800-800/7891149200504--1-.jpg?v=638537347767370000"
},
{
    id: 11,
    nome: "Sabão em Pó Omo 800g",
    preco: 12,
    categoria: "Limpeza",
    descricao: "Sabão em Pó Omo 800g — Detergente em pó de alta eficiência, ideal para remover sujeiras difíceis e manter as roupas limpas e perfumadas no dia a dia.",
    imagem: "https://higipel.com.br/wp-content/uploads/2022/04/sabaoempoomo800glavagemperfeita-mp.jpg"
},
{
    id: 12,
    nome: "Detergente Líquido Clear Ypê 500ml",
    preco: 3,
    categoria: "Limpeza",
    descricao: "Detergente Líquido Clear Ypê 500ml — Produto eficiente na limpeza de louças, removendo gordura com facilidade e deixando um aroma agradável no dia a dia.",
    imagem: "https://beagaembalagem.com.br/wp-content/uploads/2014/09/detergente-ype-500-ml.jpg"
},
{
    id: 13,
    nome: "Água Sanitária Qboa 2L",
    preco: 4,
    categoria: "Limpeza",
    descricao: "Água Sanitária Qboa 2L — Produto com alto poder de limpeza e desinfecção, ideal para remover manchas e eliminar germes no dia a dia.",
    imagem: "https://fortatacadista.vteximg.com.br/arquivos/ids/291170-800-800/7896083800025.jpg?v=637511662231870000"
},
{
    id: 14,
    nome: "Desinfetante Veja Perfumes Lavanda c/500ml",
    preco: 6,
    categoria: "Limpeza",
    descricao: "Desinfetante Veja Perfumes Lavanda 500ml — Produto com ação desinfetante e fragrância de lavanda, ideal para limpar, perfumar e eliminar germes no dia a dia.",
    imagem: "https://cdn.awsli.com.br/600x1000/446/446822/produto/19375032/b55beb3d542c24fecee441c2adae4c16-1enuxj82ng.jpg"
},
{
    id: 15,
    nome: "Esponja de limpeza dupla face Scotch Brite",
    preco: 2,
    categoria: "Limpeza",
    descricao: "Esponja de Limpeza Dupla Face Scotch-Brite — Ideal para lavar louças e superfícies, com lado macio e lado abrasivo que garante limpeza eficiente no dia a dia.",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Qykuyvrh-aUgY1fLEJEqPP9TGJxnr-h58g&s"
}
]

