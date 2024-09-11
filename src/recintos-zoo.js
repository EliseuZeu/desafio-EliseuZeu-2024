class RecintosZoo {
  constructor() {
      this.recintos = [
          { numero: 1, bioma: "savana", tamanhoTotal: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
          { numero: 2, bioma: "floresta", tamanhoTotal: 5, animais: [] },
          { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
          { numero: 4, bioma: "rio", tamanhoTotal: 8, animais: [] },
          { numero: 5, bioma: "savana", tamanhoTotal: 9, animais: [{ especie: "LEAO", quantidade: 1 }] },
      ];

      this.animais = {
          LEAO: { tamanho: 3, bioma: ["savana"], carnivoro: true },
          LEOPARDO: { tamanho: 2, bioma: ["savana"], carnivoro: true },
          CROCODILO: { tamanho: 3, bioma: ["rio"], carnivoro: true },
          MACACO: { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
          GAZELA: { tamanho: 2, bioma: ["savana"], carnivoro: false },
          HIPOPOTAMO: { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false },
      };
  }

  analisaRecintos(especie, quantidade) {
      if (!this.animais[especie]) {
          return { erro: "Animal inválido" };
      }

      if (quantidade <= 0) {
          return { erro: "Quantidade inválida" };
      }

      const { tamanho, bioma, carnivoro } = this.animais[especie];
      let recintosViaveis = [];

      this.recintos.forEach((recinto) => {
          const espacoOcupado = recinto.animais.reduce((acc, animal) => {
              const tamanhoAnimal = this.animais[animal.especie].tamanho * animal.quantidade;
              return acc + tamanhoAnimal;
          }, 0);

          const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

          const animalCompativel = bioma.includes(recinto.bioma);
          const carnivorosCompativeis = recinto.animais.every((animal) => {
              return animal.especie === especie || !this.animais[animal.especie].carnivoro;
          });

          const espacoSuficiente = espacoLivre >= tamanho * quantidade;
          const respeitaRegras = this.validaRegrasAdicionais(especie, quantidade, recinto, espacoLivre);

          if (animalCompativel && carnivorosCompativeis && espacoSuficiente && respeitaRegras) {
              recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - (tamanho * quantidade)} total: ${recinto.tamanhoTotal})`);
          }
      });

      if (recintosViaveis.length === 0) {
          return { erro: "Não há recinto viável" };
      }

      return { recintosViaveis };
  }

  validaRegrasAdicionais(especie, quantidade, recinto, espacoLivre) {
      const { tamanho } = this.animais[especie];

      // Hipopótamo só pode coexistir com outras espécies em savana e rio
      if (especie === "HIPOPOTAMO" && recinto.bioma !== "savana e rio" && recinto.animais.length > 0) {
          return false;
      }

      // Macaco não gosta de ficar sozinho
      if (especie === "MACACO" && quantidade === 1 && recinto.animais.length === 0) {
          return false;
      }

      // Se houver mais de uma espécie no recinto, considerar 1 espaço extra ocupado
      if (recinto.animais.length > 0 && espacoLivre < (tamanho * quantidade + 1)) {
          return false;
      }

      return true;
  }
}

export { RecintosZoo as RecintosZoo };
