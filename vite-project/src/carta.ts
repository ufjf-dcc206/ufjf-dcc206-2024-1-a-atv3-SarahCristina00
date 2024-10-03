export type Pokemon = { 
    id: number;
    nome: string;
    tipo: string;
    imagem: string; 
};

export default class Carta extends HTMLElement {
    constructor() {
        super();
        console.log("Criando card pokemon");
    }

    connectedCallback() {
        const nome = this.getAttribute("nome");
        const tipo = this.getAttribute("tipo");
        const id = this.getAttribute("id");
        const imagem = this.getAttribute("imagem");

        this.innerHTML = `
            <div>
                <img src="${imagem}" alt="${nome}" />
                <div>ID: ${id}</div>
                <div>Nome: ${nome}</div>
                <div>Tipo: ${tipo}</div>
            </div>
        `;
    }
}
