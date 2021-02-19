module.exports = (client, error, message) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`<:HBminus:783351288515657728> | There is no music being played on this server!`);
            break;
        case 'NotConnected':
            message.channel.send(`<:HBminus:783351288515657728> | You are not connected in any voice channel!`);
            break;
        case 'UnableToJoin':
            message.channel.send(`<:HBminus:783351288515657728> | I am not able to join your voice channel, please check my permissions!`);
            break;
        case 'LiveVideo':
            message.channel.send('<:HBminus:783351288515657728> | YouTube lives are not supported!')
            break;
        default:
            message.channel.send(`<:HBminus:783351288515657728> | Something went wrong... Error: **${error}**`);
    };
};
