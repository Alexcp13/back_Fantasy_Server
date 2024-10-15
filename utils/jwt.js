import pkg from 'jsonwebtoken';

const { sign, verify } = pkg;
export const generateKey = (id) => {

    return sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}


export const verifyKey = (token) => {

    return verify(token, process.env.JWT_SECRET);
}