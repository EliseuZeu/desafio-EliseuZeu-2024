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
      // Se há mais de uma espécie no recinto, ocupa espaço extra
      if (this.animais.length > 1) espacoOcupado += 1;
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
      const carnivorosCompativeis = !animal.isCarnivoro() || (this.animais.every(a => a.especie === animal.especie));
  
      // Verifica se é um hipopótamo que precisa de um recinto especial
      if (animal.especie === 'HIPOPOTAMO' && this.bioma !== 'savana e rio') {
        return false;
      }
  
      return espacoSuficiente && biomaCompativel && carnivorosCompativeis;
    }
  }
  