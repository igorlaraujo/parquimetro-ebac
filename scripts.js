class Parquimetro {
    constructor(valor) {
        this.valor = valor;
    }

    calcular() {
        if (this.valor < 1) {
            return {
                valido: false,
                mensagem: "Valor insuficiente. Insira pelo menos R$ 1,00.",
                tempo: 0,
                troco: 0
            };
        }

        if (this.valor >= 3) {
            return {
                valido: true,
                mensagem: "Pagamento aprovado.",
                tempo: 120,
                troco: this.valor - 3
            };
        }

        if (this.valor >= 1.75) {
            return {
                valido: true,
                mensagem: "Pagamento aprovado.",
                tempo: 60,
                troco: this.valor - 1.75
            };
        }

        return {
            valido: true,
            mensagem: "Pagamento aprovado.",
            tempo: 30,
            troco: this.valor - 1
        };
    }
}

const formulario = document.getElementById("formulario-parquimetro");
const inputValor = document.getElementById("valor");
const mensagem = document.getElementById("mensagem");
const tempo = document.getElementById("tempo");
const troco = document.getElementById("troco");

function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor);
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const valorInformado = Number(inputValor.value);

    const parquimetro = new Parquimetro(valorInformado);
    const resultado = parquimetro.calcular();

    mensagem.textContent = resultado.mensagem;

    if (!resultado.valido) {
        tempo.textContent = "";
        troco.textContent = "";
        return;
    }

    tempo.textContent = `Tempo de permanência: ${resultado.tempo} minutos`;
    troco.textContent = `Troco: ${formatarMoeda(resultado.troco)}`;
});