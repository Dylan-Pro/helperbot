module.exports = (client, message, query, tracks, content, collector) => {
    if (content === 'cancel' || 'Cancel') {
        collector.stop();
        return message.channel.send(`<:HBchecked:783351288171593728> | The selection has been **cancelled**!`);
    } else message.channel.send(`<:HBminus:783351288515657728> | You must send a valid number between **1** and **${tracks.length}**!`);
};