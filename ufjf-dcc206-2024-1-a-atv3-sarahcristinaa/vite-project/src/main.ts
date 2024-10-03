import Carta, { Pokemon } from './carta.ts';
import './style.css';
customElements.define("detalhes-pokemon", Carta);

const getRandomPokemon = async (id: number): Promise<Pokemon> => {
    const END_POINT = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const data = await fetch(END_POINT);
    const json = await data.json();
    return {
        id: json.id,
        nome: json.name,
        tipo: json.types[0].type.name,
        imagem: json.sprites.front_default // Adicionando a imagem
    };
};

const getRandomPokemons = async (count: number): Promise<Pokemon[]> => {
    const pokemons: Pokemon[] = [];
    const randomIds = new Set<number>();

    // Gera IDs únicos aleatórios de 1 a 898 (total de Pokémon na API)
    while (randomIds.size < count) {
        const randomId = Math.floor(Math.random() * 100) + 1;
        randomIds.add(randomId);
    }

    for (const id of randomIds) {
        const pokemon = await getRandomPokemon(id);
        pokemons.push(pokemon);
    }

    return pokemons;
};

const displayPokemons = async () => {
    const pokemons = await getRandomPokemons(10);
    const appDiv = document.querySelector<HTMLDivElement>('#app')!;

    pokemons.forEach(p => {
        const ePok = document.createElement("detalhes-pokemon");
        ePok.setAttribute("nome", p.nome);
        ePok.setAttribute("tipo", p.tipo);
        ePok.setAttribute("id", p.id.toString());
        ePok.setAttribute("imagem", p.imagem);
        appDiv.append(ePok);
    });
};

displayPokemons();
