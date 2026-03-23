import { z } from 'zod';

/**
 * Schema for validating the payload when creating a new order.
 * We only trust the product ID and quantity from the client.
 * The price is looked up on the server to prevent tampering.
 */
export const createOrderSchema = z.object({
    items: z.array(
        z.object({
            product: z.object({ id: z.string().min(1) }),
            quantity: z.number().int().positive(),
        }).passthrough() // Allow other properties from the client's cart state but ignore them
    ).min(1, { message: "An order must contain at least one item." }),
});

export type CreateOrderPayload = z.infer<typeof createOrderSchema>;