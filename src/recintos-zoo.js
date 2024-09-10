class RecintosZoo {
  constructor() {
    this.recintos = [
      new Recinto(1, "savana", 10, [new Animal("MACACO", 1, ["savana", "floresta"]), new Animal("MACACO", 1, ["savana", "floresta"])]),
      new Recinto(2, "floresta", 5, []),
      new Recinto(3, "savana e rio", 7, [new Animal("GAZELA", 2, ["savana"])]),
      new Recinto(4, "rio", 8, []),
      new Recinto(5, "savana", 9, [new Animal("LEAO", 3, ["savana"])])
    ];

    this.animaisDisponiveis = {
      "LEAO": new Animal("LEAO", 3, ["savana"]),
      "LEOPARDO": new Animal("LEOPARDO", 2, ["savana"]),
      "CROCODILO": new Animal("CROCODILO", 3, ["rio"]),
      "MACACO": new Animal("MACACO", 1, ["savana", "floresta"]),
      "GAZELA": new Animal("GAZELA", 2, ["savana"]),
      "HIPOPOTAMO": new Animal("HIPOPOTAMO", 4, ["savana", "rio"])
    };
  }

  // Método para analisar os recintos
  analisaRecintos(especieAnimal, quantidade) {
    // Valida se o animal existe
    const animalDisponivel = this.animaisDisponiveis[especieAnimal];
    if (!animalDisponivel) {
      return { erro: "Animal inválido" };
    }

    // Valida a quantidade
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const espacoNecessario = animalDisponivel.tamanho * quantidade;

    // Filtra os recintos que podem receber o animal
    const recintosViaveis = this.recintos
      .filter(recinto => recinto.podeReceberAnimal(animalDisponivel))
      .map(recinto => `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoDisponivel()} total: ${recinto.tamanhoTotal})`);

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }
}

class Animal {
  constructor(especie, tamanho, biomas) {
    this.especie = especie;
    this.tamanho = tamanho;
    this.biomas = biomas;
  }

  // Método para validar se um animal pertence a um bioma
  podeHabitar(bioma) {
    return this.biomas.includes(bioma);
  }

  // Verifica se o animal é carnívoro
  isCarnivoro() {
    return ["LEAO", "LEOPARDO", "CROCODILO"].includes(this.especie);
  }
}

class Recinto {
  constructor(numero, bioma, tamanhoTotal, animais = []) {
    this.numero = numero;
    this.bioma = bioma;
    this.tamanhoTotal = tamanhoTotal;
    this.animais = animais;
  }

  // Verifica o espaço disponível no recinto
  espacoDisponivel() {
    let espacoOcupado = this.animais.reduce((acc, animal) => acc + animal.tamanho, 0);
    return this.tamanhoTotal - espacoOcupado;
  }

  // Adiciona um animal ao recinto
  adicionarAnimal(animal) {
    if (this.espacoDisponivel() >= animal.tamanho) {
      this.animais.push(animal);
    } else {
      throw new Error("Espaço insuficiente");
    }
  }

  // Verifica se o recinto pode receber o animal
  podeReceberAnimal(animal) {
    const espacoSuficiente = this.espacoDisponivel() >= animal.tamanho;
    const biomaCompativel = animal.podeHabitar(this.bioma);
    const carnivorosCompativeis = !animal.isCarnivoro() || this.animais.every(a => a.especie === animal.especie);

    // Verifica se o hipopótamo pode estar nesse bioma específico
    if (animal.especie === 'HIPOPOTAMO' && this.bioma !== 'savana e rio') {
      return false;
    }

    return espacoSuficiente && biomaCompativel && carnivorosCompativeis;
  }
}
