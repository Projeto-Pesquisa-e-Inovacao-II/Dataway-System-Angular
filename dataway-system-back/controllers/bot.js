const TelegramBot = require("node-telegram-bot-api");

const notificacaoModel = require("../models/bot");

// 1) Cria o bot só uma vez:
const bot = new TelegramBot("7753286594:AAHkbUrC_rgxK63_Qok9k0F2rCsXhdrUJxw", {
  polling: true,
});

// 2) Registra o handler de /start diretamente:
bot.onText(/\/start(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const tokenUsuario = match[1]; // pode vir undefined se não passar argumento

  if (!tokenUsuario) {
    // Você pode enviar uma mensagem de erro de volta ao usuário, explicando como usar /start corretamente.
    return bot.sendMessage(
      chatId,
      "Por favor envie seu token após o comando. Exemplo:\n\n/start seuTokenAqui"
    );
  }

  try {
    // Chama a função do model para salvar no banco
    const resultado = await notificacaoModel.getChatId(chatId, tokenUsuario);
    await bot.sendMessage(chatId, "Olá! Você foi registrado!");
  } catch (erro) {
    console.error("Erro ao atualizar o Chat ID:", erro);
    await bot.sendMessage(chatId, "Ocorreu um erro ao registrar seu chat_id.");
  }
});

