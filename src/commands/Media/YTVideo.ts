import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import YT from '../../lib/YT'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'ytv',
            description: 'Downloads given YT Video',
            category: 'media',
            aliases: ['ytvideo'],
            usage: `${client.config.prefix}ytv [URL]`,
            dm: true,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M.urls.length) return void M.reply('🔎 Provide the URL of the YT video you want to download')
        const video = new YT(M.urls[0], 'video')
        if (!video.validateURL()) return void M.reply(`Provide a Valid YT URL`)
        const { videoDetails } = await video.getInfo()
        M.reply('👾 sending...')
        if (Number(videoDetails.lengthSeconds) > 1800)
            return void M.reply('⚓ Cannot Download videos longer than 30 Minutes')
        M.reply(await video.getBuffer(), MessageType.video).catch((reason: any) =>
            M.reply(`❌ an error occupered, Reason: ${reason}`)
        )
    }
}