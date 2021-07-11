const DiscordJS = require('discord.js');
const client = new DiscordJS.Client({ intents: [DiscordJS.Intents.FLAGS.GUILDS, DiscordJS.Intents.FLAGS.GUILD_MESSAGES] });

const { BotToken, BotPrefix, OwnerID } = require('./config.json');

client.on('ready', () => {

    console.log(`Giriş yaptı ${client.user.tag}! | Kifness#1903`);

});

client.on('messageCreate', async message => { // Yeni " message " eventi eskisi hala çalışıyor ancak konsolda uyarı veriyor.

    if (message.author.id != OwnerID) return;

    if (message.content === '!oluştur') {

        const menu = new DiscordJS.MessageSelectMenu() // SelectMenu oluşturuyoruz, embed gibi düşünün
            .setCustomId('kifness_adamdır') // custom Id burası zorunlu yoksa hata verebilir
            .setPlaceholder('• Seçenekler')
            .addOptions([

                {
                    label: 'Seçenek NO : 1',
                    emoji: '1️⃣',
                    description: 'Bu birinci seçenek. | Kifness#1903',
                    value: 'secenek_bir',
                },

                {
                    label: 'Seçenek NO : 2',
                    emoji: '2️⃣',
                    description: 'Bu ikinci seçenek. | Kifness#1903',
                    value: 'secenek_iki',
                },

                {
                    label: 'Seçenek NO : 3',
                    emoji: '1️⃣',
                    description: 'Bu üçünü seçenek. | Kifness#1903',
                    value: 'secenek_uc',
                },

            ]);

        await message.channel.send({ content: ':scales: **Seçenekler; | Kifness#1903 Adamdır!\n**', components: [[menu]] })

    }
});


// Şuan mesajı ve selectmenuyu oluşturduk. bunu embed mesaj ilede yapabilirsiniz ancak pek kullanmadım.
// Daha fazlası için buraya bakın : https://deploy-preview-674--discordjs-guide.netlify.app/interactions/select-menus.html


client.on('interactionCreate', async interaction => {

    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'kifness_adamdır') {
        await interaction.deferUpdate();
        await wait(2000);


        if (interaction.values == "secenek_bir") { // orda belirlediğimiz valuesleri burda giriyoruz, o seçeneğe tıkladıysa....

            try {

                interaction.followUp({ content: 'Bu birinci seçenek!', ephemeral: true });

            } catch (err) {

                console.log(err)

            }

        }

        else if (interaction.values == "secenek_iki") { // orda belirlediğimiz valuesleri burda giriyoruz, o seçeneğe tıkladıysa....

            try {
                    interaction.followUp({ content: 'Bu ikinci seçenek!', ephemeral: true });

            } catch (err) {
                console.log(err)
            }
        }

        else if (interaction.values == "secenek_uc") { // orda belirlediğimiz valuesleri burda giriyoruz, o seçeneğe tıkladıysa....


            try {

                interaction.followUp({ content: 'Bu üçüncü seçenek!', ephemeral: true });

            } catch (err) {
                console.log(err)
            }
        } else {

            return;

        }


    }



});


client.login(BotToken)