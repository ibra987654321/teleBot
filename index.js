const { Telegraf, Markup} = require('telegraf');
const os = require('os')
require('dotenv').config()
const text = require('./const.js')
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name}`));
bot.help((ctx) => ctx.reply(text.commands));

bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Курсы Валют</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Оперционная система', 'btn_1'), Markup.button.callback('Свободная ОЗУ', 'btn_2')],
                [Markup.button.callback('Всего памяти ОЗУ', 'btn_3'), Markup.button.callback('Домашняя директория', 'btn_4')],
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

let free_memory = os.freemem();
let free_mem_in_kb = free_memory/1024;
let free_mem_in_mb = free_mem_in_kb/1024;
let free_mem_in_gb = free_mem_in_mb/1024;

free_mem_in_kb = Math.floor(free_mem_in_kb);
free_mem_in_mb = Math.floor(free_mem_in_mb);
free_mem_in_gb = Math.floor(free_mem_in_gb);

free_mem_in_mb = free_mem_in_mb%1024;
free_mem_in_kb = free_mem_in_kb%1024;
free_memory = free_memory%1024;
const free = "Свободно оперативной памяти: " + free_mem_in_gb + "ГБ "
    + free_mem_in_mb + "MБ " + free_mem_in_kb
    + "KБ и " + free_memory + "Байт"

let memory = os.totalmem();
let mem_in_kb = memory/1024;
let mem_in_mb = mem_in_kb/1024;
let mem_in_gb = mem_in_mb/1024;

mem_in_kb = Math.floor(mem_in_kb);
mem_in_mb = Math.floor(mem_in_mb);
mem_in_gb = Math.floor(mem_in_gb);

mem_in_mb = mem_in_mb%1024;
mem_in_kb = mem_in_kb%1024;
memory = memory%1024;
const total = "Всего памяти: " + mem_in_gb + "ГБ "
    + mem_in_mb + "MБ " + mem_in_kb
    + "KБ и " + memory + "Байт"
actionBtn('btn_1', os.platform())
actionBtn('btn_2', free)
actionBtn('btn_3', total)
actionBtn('btn_4', os.homedir())
actionBtn('btn_5', 'Продолжение следует')

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
