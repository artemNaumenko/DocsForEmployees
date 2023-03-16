const jwt = require('jsonwebtoken')

export function generateToken(phoneNumber: string, role: string) {
    const payload = {
        phoneNumber,
        role
    }

    const secret: string = process.env.TOKEN_GENERATION_SECRET_KEY as string

    return jwt.sign(payload, secret, {expiresIn: "4h"})
}