const { Client, CommandInteraction } = require("discord.js");
const MysqlMerpati = require("../../Mysql");
require("../../Functions")

module.exports = {
    name: "removeucp",
    description: "Untuk menghapus akun ucp server Kota Bersama!",
    type: "CHAT_INPUT",
    options: [
        {
            name: "ucp-account",
            description: "Nama akun UCP yang akan dihapus!",
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
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return IntPerms(interaction);
        const ucpName = interaction.options.getString("ucp-account");

        MysqlMerpati.query(`SELECT * FROM playerucp WHERE uUserUCP = '${ucpName}'`, async(err, row) => {
            if (err) return IntError(interaction, "Terjadi kesalahan saat mengambil data akun UCP.");
            if(row[0])
            {
                IntAdmin(interaction, `Akun User Control Panel dengan Nama **${ucpName}** Telah berhasil di hapus oleh Admin **<@${interaction.user.id}>**`)
                await MysqlMerpati.query(`DELETE FROM playerucp WHERE uUserUCP = '${ucpName}'`, (err) => {
                    if (err) return IntError(interaction, "Terjadi kesalahan saat menghapus akun UCP.");
                });   
            }
            else {
                IntAdmin(interaction, "Akun dengan User Control Panel tersebut tidak ditemukan!")
            }
        })
    },
};
