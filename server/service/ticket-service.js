const {database} = require("../database/database");

class TicketService {

    async sellTicket(newTicket) {
        try {
            const { price, childDiscount, pensionerDiscount, ticketDate} = newTicket;

            const result = await database().run(
                `
    INSERT INTO tickets (price, childDiscount, pensionerDiscount, ticketDate)
    VALUES (?, ?, ?, ?)
`,
                [price, childDiscount, pensionerDiscount, ticketDate.toISOString()]
            );

            const ticketId = result.lastID;

            return ticketId;
        } catch (error) {
            throw new Error(`Error creating ticket: ${error}`);
        }
    }

    async buyTicket(newTicket) {
        try {
            const { price, childDiscount, pensionerDiscount, ticketDate, userId} = newTicket;

            const result = await database().run(
                `
    INSERT INTO tickets (price, childDiscount, pensionerDiscount, ticketDate, id_user)
    VALUES (?, ?, ?, ?, ?)
`,
                [price, childDiscount, pensionerDiscount, ticketDate.toISOString(), userId]
            );

            const ticketId = result.lastID;

            return ticketId;
        } catch (error) {
            throw new Error(`Error creating ticket: ${error}`);
        }
    }

    async getTicketsById(userId) {
        return await database().all(
            "SELECT * FROM tickets WHERE id_user = ? ORDER BY ticketDate DESC",
            userId
        );
    }

}

module.exports = new TicketService();