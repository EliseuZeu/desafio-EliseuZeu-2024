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
  