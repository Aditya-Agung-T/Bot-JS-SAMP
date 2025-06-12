const client = require("../Merpati");

client.on("modalSubmit", async(modal) => {
    const Modals = client.modals.get(modal.customId);
    if (Modals) Modals.run(modal, client);
});