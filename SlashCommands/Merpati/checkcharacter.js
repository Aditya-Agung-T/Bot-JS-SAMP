const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const MysqlMerpati = require("../../Mysql");
const numberFormat = (value) =>
    new Intl.NumberFormat('ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(value);

module.exports = {
    name: "checkcharacter",
    description: "Memeriksa statistik/harta karakter player",
    type: "CHAT_INPUT",
    options: [
        {
            name: "char-name",
            description: "Nama Karakter yang akan diperiksa",
            type: "STRING",
            required: true,
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const karakter = interaction.options.getString("char-name");

        MysqlMerpati.query(`SELECT * FROM character WHERE Name = '${karakter}'`, async (err, row) => {
            if (err) return IntError(interaction, "Terjadi kesalahan saat mengambil data karakter.");
            if (row[0]) {
                const msgChar = new MessageEmbed()
                    .setAuthor({ name: "Kota Metro Roleplay Roleplay", iconURL: client.config.ICON_URL })
                    .setDescription(`- Data Karakter ${row[0].username} -\n• \`Nama\`: ${row[0].username}\n• \`UserUCP\`: ${row[0].userucp}\n\n- Harta Player \n• \`Uang\`: ${numberFormat(row[0].money)}\n• \`Saldo Bank\`: ${numberFormat(row[0].bmoney)}\n• \`Uang Elektronik\`: ${numberFormat(row[0].ebmoney)}\n• \`Uang Merah\`: ${numberFormat(row[0].redmoney)}`)
                    .setColor("GOLD")
                    .setFooter({ text: "Bot Kota Metro Roleplay Official" })
                    .setThumbnail(`https://gta.com.ua/img/articles/sa/sa-mp/skins-id/skin_${row[0].skin}.png`)
                    .setTimestamp()
                interaction.reply({ embeds: [msgChar] })
            } else {
                IntError(interaction, "Karakter tidak ditemukan.");
            }
        })
    },
};
