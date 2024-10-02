import { sign, verify } from 'jsonwebtoken';


export const generateKey = (id) => {

    return sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}


export const verifyKey = (token) => {

    return verify(token, process.env.JWT_SECRET);
}