import { Button, ChatInput, Context, Modal, SelectMenu } from "../../interaction"
import { Interaction } from "discord.js"
import { ex, cx } from "../../function"

export async function run(interaction: Interaction) {
    if (interaction.isRepliable()) {
        const { deferReply, editReply, fetchReply, followUp, reply } = interaction

        interaction.deferReply = async function (opt: any): Promise<any> {
            try {
                if (interaction.deferred || interaction.replied) {
                    return await fetchReply.call(interaction)
                } else {
                    return await deferReply.call(interaction, opt)
                }
            } catch (error) {
                ex(error as Error)
                return await cx.call(interaction, interaction, error as Error)
            }
        }.bind(interaction)

        interaction.editReply = async function (opt: any): Promise<any> {
            try {
                if (interaction.deferred || interaction.replied) {
                    return await editReply.call(interaction, opt)
                } else {
                    return await reply.call(interaction, opt)
                }
            } catch (error) {
                ex(error as Error)
                return await cx.call(interaction, interaction, error as Error)
            }
        }.bind(interaction)

        interaction.followUp = async function (opt: any): Promise<any> {
            try {
                if (interaction.deferred || interaction.replied) {
                    return await followUp.call(interaction, opt)
                } else {
                    return await reply.call(interaction, opt)
                }
            } catch (error) {
                ex(error as Error)
                return await cx.call(interaction, interaction, error as Error)
            }
        }.bind(interaction)

        interaction.reply = async function (opt: any): Promise<any> {
            try {
                if (interaction.deferred || interaction.replied) {
                    return await followUp.call(interaction, opt)
                } else {
                    return await reply.call(interaction, opt)
                }
            } catch (error) {
                ex(error as Error)
                return await cx.call(interaction, interaction, error as Error)
            }
        }.bind(interaction)
    }

    if (interaction.isAnySelectMenu() || interaction.isButton()) {
        const { update } = interaction

        interaction.update = async function (opt: any): Promise<any> {
            try {
                if (interaction.deferred || interaction.replied) {
                    return await interaction.message.edit(opt)
                } else {
                    return await update.call(interaction, opt)
                }
            } catch (error) {
                ex(error as Error)
                return await cx.call(interaction, interaction, error as Error)
            }
        }.bind(interaction)
    }

    switch (true) {
        case interaction.isChatInputCommand():
            const command = ChatInput.get(interaction.commandName)
            if (!command || typeof command.run !== "function") return interaction.reply("404 - Unknown Command")
            command.run(interaction)
            break

        case interaction.isContextMenuCommand():
            const context = Context.get(interaction.commandName)
            if (!context || typeof context.run !== "function") return interaction.reply("404 - Unknown Command")
            context.run(interaction)
            break

        case interaction.isButton():
            const button = Button.get(interaction.customId.split(/-/).shift() ?? "") ?? Button.get(interaction.customId)
            if (interaction.deferred || interaction.replied) return
            if (button && typeof button === "function") button(interaction)
            break

        case interaction.isModalSubmit():
            const modal = Modal.get(interaction.customId)
            if (interaction.deferred || interaction.replied) return
            if (modal && typeof modal === "function") modal(interaction)
            break

        case interaction.isAnySelectMenu():
            const selectmenu = SelectMenu.get(interaction.customId)
            if (interaction.deferred || interaction.replied) return
            if (selectmenu && typeof selectmenu === "function") selectmenu(interaction)
            break

        case interaction.isAutocomplete(): {
            const input = ChatInput.get(interaction.commandName)
            if (!input || typeof input.autocomplete !== "function") return
            input.autocomplete(interaction)
            break
        }
    }
}
