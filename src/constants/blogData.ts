export interface BlogPost {
  id: number
  title: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "A COR DA TUA SOMBRA, romance de Eduardo Quive publicado no Brasil",
    image: "/post-1.png",
    author: "Eduardo Quive",
    date: "15 Janeiro 2024",
    readTime: "5 min leitura",
    category: "Lançamento",
    content: `
      O romance "A Cor da Tua Sombra", do escritor moçambicano Eduardo Quive, acaba de chegar às livrarias brasileiras. A obra, que explora as complexidades da identidade e da memória, marca um momento significativo na internacionalização da literatura contemporânea de Moçambique.

      Nesta narrativa envolvente, Quive transporta o leitor para as ruas de Maputo, onde o passado e o presente se entrelaçam em uma dança de sombras e luzes. O autor utiliza uma linguagem poética e visceral para tratar de temas como o pertencimento, o isolamento e a busca por um lugar no mundo.

      "Publicar no Brasil é abrir uma porta para um diálogo mais vasto com a língua portuguesa", afirma o autor. "As sombras que descrevo em Maputo encontram ecos e reflexos nas cidades brasileiras, provando que a experiência humana, em sua essência, ignora fronteiras."

      O livro já está disponível nas principais livrarias e plataformas digitais do Brasil.
    `
  },
  {
    id: 2,
    title: "Filhos do Oceano, de Ruth Bañón e as paisagens da memória",
    image: "/post-2.jpg",
    author: "Eduardo Quive",
    date: "10 Janeiro 2024",
    readTime: "4 min leitura",
    category: "Resenha",
    content: `
      "Filhos do Oceano", a mais recente obra de Ruth Bañón, é uma jornada profunda pelas águas da memória. Em sua resenha, Eduardo Quive analisa como a autora utiliza o mar como metáfora para a distância e o reencontro.

      Bañón constrói personagens que parecem moldados pelas marés, seres de sal e saudade que procuram em cada porto uma âncora para suas identidades fragmentadas. A escrita é fluida, quase transparente, permitindo que o leitor mergulhe sem reservas nas angústias e esperanças dos protagonistas.

      A obra destaca-se pela sensibilidade com que trata a herança cultural e a diáspora, temas que ressoam fortemente no contexto lusófono. É um livro que exige tempo, silêncio e uma audição atenta aos sussurros das ondas.
    `
  },
  {
    id: 3,
    title: "Quando o belo se rende à natureza",
    image: "/post-3.jpg",
    author: "Eduardo Quive",
    date: "05 Janeiro 2024",
    readTime: "3 min leitura",
    category: "Ensaio",
    content: `
      Neste ensaio reflexivo, Eduardo Quive explora a relação entre a estética humana e a força indomável do mundo natural. Inspirado pelas paisagens costeiras de Moçambique, o autor questiona até que ponto a arte pode imitar a vida sem se perder no processo.

      "Muitas vezes, tentamos enquadrar a beleza em molduras rígidas", escreve Quive. "Mas a natureza não aceita enquadramentos. Ela transborda. O verdadeiro belo surge no momento em que a nossa pretensão artística se rende à simplicidade de um pôr-do-sol ou à irregularidade de uma rocha esculpida pelo vento."

      O texto é um convite à contemplação e ao despojamento, sugerindo que a maior obra de arte é aquela que nos permite sentir parte integrante de um todo muito maior do que nós mesmos.
    `
  },
  {
    id: 4,
    title: "Vozes da Lusofonia: Um olhar sobre o futuro",
    image: "/post-1.png",
    author: "Eduardo Quive",
    date: "01 Janeiro 2024",
    readTime: "6 min leitura",
    category: "Entrevista",
    content: `
      Em uma conversa exclusiva com jovens escritores de diferentes latitudes da lusofonia, Eduardo Quive procura entender quais são os desafios e as promessas da língua portuguesa no século XXI.

      A entrevista aborda temas como a descolonização do pensamento, o papel das redes sociais na difusão literária e a necessidade de criar redes de apoio mútuo entre autores moçambicanos, angolanos, brasileiros, portugueses e cabo-verdianos.

      "A nossa língua é um organismo vivo, em constante mutação", nota um dos entrevistados. "O futuro da lusofonia não está em manter uma pureza ilusória, mas em celebrar as impurezas que a tornam tão rica e resiliente."
    `
  }
]
