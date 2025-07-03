const player1 = {
  nome: 'Mario',
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0,
};

const player2 = {
  nome: 'Luigi',
  velocidade: 3,
  manobrabilidade: 4,
  poder: 4,
  pontos: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = 'Reta';
      break;
    case random < 0.66:
      result = 'Curva';
      break;
    default:
      result = 'Confronto';
      break;
  }

  return result;
}

async function logRollResult({ characterName, block, diceResult, attribute }) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute
    }`,
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}\n`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === 'Reta') {
      totalTestSkill1 = diceResult1 + character1.velocidade;
      totalTestSkill2 = diceResult2 + character2.velocidade;

      await logRollResult({
        characterName: character1.nome,
        block: 'velocidade',
        diceResult: diceResult1,
        attribute: character1.velocidade,
      });

      await logRollResult({
        characterName: character2.nome,
        block: 'velocidade',
        diceResult: diceResult2,
        attribute: character2.velocidade,
      });
    }

    if (block === 'Curva') {
      totalTestSkill1 = diceResult1 + character1.manobrabilidade;
      totalTestSkill2 = diceResult2 + character2.manobrabilidade;

      await logRollResult({
        characterName: character1.nome,
        block: 'manobrabilidade',
        diceResult: diceResult1,
        attribute: character1.manobrabilidade,
      });

      await logRollResult({
        characterName: character2.nome,
        block: 'manobrabilidade',
        diceResult: diceResult2,
        attribute: character2.manobrabilidade,
      });
    }

    if (block === 'Confronto') {
      let powerResult1 = diceResult1 + character1.poder;
      let powerResult2 = diceResult2 + character2.poder;

      console.log(`${character1.nome} confrontou com ${character2.nome}! 🥊`);

      await logRollResult({
        characterName: character1.nome,
        block: 'poder',
        diceResult: diceResult1,
        attribute: character1.poder,
      });

      await logRollResult({
        characterName: character2.nome,
        block: 'poder',
        diceResult: diceResult2,
        attribute: character2.poder,
      });

      if (powerResult1 > powerResult2 && character2.pontos > 0) {
        console.log(`\n${character1.nome} venceu o confronto! ${character2.nome} perdeu um ponto.`);
        character2.pontos--;
      }

      if (powerResult2 > powerResult1 && character1.pontos > 0) {
        console.log(`\n${character2.nome} venceu o confronto! ${character1.nome} perdeu um ponto.`);
        character1.pontos--;
      }

      console.log(powerResult1 === powerResult2 ? '\nConfronto empatado! Nenhum ponto perdido.' : '');
    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`\n${character1.nome} marcou um ponto!\n`);
      character1.pontos++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`\n${character2.nome} marcou um ponto!\n`);
      character2.pontos++;
    } else {
      console.log('\nEmpate! Ninguém marcou ponto.\n');
    }

    console.log('-'.repeat(50) + '\n');
  }
}

async function declareWinner(character1, character2) {
  console.log(`🏆 Fim da corrida! ${character1.nome} e ${character2.nome} terminaram com os seguintes pontos:`);
  console.log(`${character1.nome}: ${character1.pontos} pontos`);
  console.log(`${character2.nome}: ${character2.pontos} pontos\n`);

  if (character1.pontos > character2.pontos) {
    console.log(`🎉 ${character1.nome} é o grande vencedor!`);
  }
  else if (character2.pontos > character1.pontos) {
    console.log(`🎉 ${character2.nome} é o grande vencedor!`);
  }
  else {
    console.log('🤝 Ambos os jogadores empataram! Que corrida emocionante!');
  }
  console.log('-'.repeat(50) + '\n');
}

(async function main() {
  console.log(`\n🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando...\n`);

  await playRaceEngine(player1, player2);

  await declareWinner(player1, player2);
})();
