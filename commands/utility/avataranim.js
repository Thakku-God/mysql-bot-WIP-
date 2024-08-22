const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
data: new SlashCommandBuilder()
.setName('avataranim')
.setDescription("Animate an avatar for your bot")
.addAttachmentOption(option => option.setName('avatar').setDescription('The avatar to animate').setRequired(true)),

async execute(interaction, client) {
const avatar = interaction.options.getAttachment('avatar');

async function sendMessage(message, color = '#0099ff') {
const embed = new EmbedBuilder()
.setColor(color)
.setDescription(message);

await interaction.reply({ embeds: [embed], ephemeral: true });
}

if (!avatar) {
return await sendMessage('⚠️ Please provide an avatar attachment.', '#FF0000');
}

if (!avatar.contentType.startsWith('image/')) {
return await sendMessage('⚠️ The attachment must be an image.', '#FF0000');
}

if (avatar.contentType !== "image/gif") {
return await sendMessage('⚠️ Please use a GIF format for animated avatars.', '#FF0000');
}

try {
await client.user.setAvatar(avatar.url);
await sendMessage('🌍 I have uploaded your avatar successfully!', '#00FF00');
} catch (error) {
console.error('Error setting avatar:', error);
await sendMessage(`⚠️ Error: ${error.message}`, '#FF0000');
}
}
};