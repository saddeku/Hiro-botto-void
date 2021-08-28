import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import  axios  from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'waifu',
            description: 'Will provide a random waifu images',
            category: 'weeb',
            usage: `${client.config.prefix}waifu`,
            
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {


        const rnekol = ["waifu"];
        const rnekolc = rnekol[Math.floor(Math.random() * rnekol.length)];
        const neko = await axios.get('https://api.waifu.pics/sfw/' + rnekolc)

return void M.reply(await request.buffer(neko.data.url), MessageType.image, undefined, undefined, `*Here you go ✨*`)



    }








}
