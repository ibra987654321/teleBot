const { Telegraf, Markup} = require('telegraf');
require('dotenv').config()
const text = require('./const.js')
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name}`));
bot.help((ctx) => ctx.reply(text.commands));

bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Курсы Валют</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('BTC', 'btn_1'), Markup.button.callback('USD', 'btn_2')],
                [Markup.button.callback('YID', 'btn_3'), Markup.button.callback('RUB', 'btn_4')],
                [Markup.button.callback('Конвертация', 'btn_5')],
            ]
        ))
    }
    catch (e) {
        console.error(e)
    }
})

function actionBtn(id, text) {
    bot.action(id, async (ctx) => {
        try {
            await ctx.replyWithHTML(text)
        } catch (e) {
            console.error(e)
        }
    })
}

actionBtn('btn_1', 'Bitcoin')
actionBtn('btn_2', 'Dollar USA')
actionBtn('btn_3', 'sdfdslkf;sdlkf;s')
actionBtn('btn_4', 'Рубли Russia')
actionBtn('btn_5', 'Продолжение следует')

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));