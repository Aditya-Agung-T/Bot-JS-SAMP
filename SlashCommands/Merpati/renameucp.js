const { Client, CommandInteraction } = require("discord.js");
const MysqlMerpati = require("../../Mysql");
require("../../Functions")

module.exports = {
    name: "renameucp",
    description: "Untuk mengubah nama Akun User Control Panel",
    type: "CHAT_INPUT",
    options: [
        {
            name: "ucp-account",
            description: "Nama akun UCP yang akan diubah Namanya!",
            type: "USER",
            required: true,
        },
        {
            name: "newname-account",
            description: "Nama baru untuk akun UCP!",
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
        //if(!interaction.member.permissions.has('ADMINISTRATOR')) return IntPerms(interaction);
        const getAccount = interaction.options.getUser("ucp-account");
        const getName = interaction.options.getString("newname-account");

        MysqlMerpati.query(`SELECT * FROM playerucp WHERE discordID = '${getAccount.id}'`, async (err, roww) => {
            if (err) return IntError(interaction, "Terjadi kesalahan saat mengambil data akun UCP.");
            if (roww[0]) {
                MysqlMerpati.query(`SELECT * FROM playerucp WHERE uUserUCP = '${getName}'`, async(err, row) => {
                    if (err) return IntError(interaction, "Terjadi kesalahan saat memeriksa nama baru.");
                    if(row[0]) {
                        IntError(interaction, "Maaf nama tersebut telah dipakai oleh user lain!, Silahkan mencari yang baru karena yang lama belum tentu menyukaimu :)");
                    } else {
                        IntAdmin(interaction, `Nama User Control Panel (${roww[0].uUserUCP}) Berhasil diubah menjadi (${getName}) Oleh admin <@${interaction.user.id}>`);
                        MysqlMerpati.query(`UPDATE playerucp SET uUserUCP = '${getName}' WHERE discordID = '${getAccount.id}'`, (err) => {
                            if (err) return IntError(interaction, "Terjadi kesalahan saat mengubah nama akun UCP.");
                        });
                    }
                })
            } else {
                IntAdmin(interaction, "Maaf akun yang anda tag tidak memiliki akun User Control Panel!");
            }
        })
    },
};
