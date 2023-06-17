import axios from "axios";

interface tgData {
    userId: string;
    fullName: string;
    email: string;
    tariff: string;
    previousTariff: string;
    period: number;
    totalPrice: number;
}

export const orderToTelegram = async ({ userId, fullName, email, tariff, previousTariff, period, totalPrice }: tgData): Promise<boolean> => {
    const token = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
    const chat_id = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    const URI_API = `https://api.telegram.org/bot${token}/sendMessage`

    const message =
        `<b>SkyData</b> - запит користувача.\n` +
        `<b>-----------------------------</b>\n` +
        `<b>Користувач:</b> ${fullName}\n` +
        `<b>id:</b> ${userId}\n` +
        `<b>E-mail: ${email}</b>\n` +
        `<b>-----------------------------</b>\n` +
        `Оформив запит на зміну тарифу:\n` +
        `з <b>${previousTariff}</b> на <b>${tariff}</b>\n` +
        `<b>Період:</b> ${period} міс.\n` +
        `<b>-----------------------------</b>\n` +
        `<b>Вартість:</b> ${250 * period} грн.\n` +
        `<b>Знижка:</b> ${250} грн.\n` +
        `<b>Вартість зі знижкою:</b> ${totalPrice - 250} грн.\n`
    try {
        await axios
            .post(URI_API, {
                chat_id,
                parse_mode: 'html',
                text: message,
            });
        return true;
    } catch (err) { return false; }
}