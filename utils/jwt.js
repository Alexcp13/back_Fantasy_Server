import pkg from 'jsonwebtoken';

const { sign, verify } = pkg;
export const generateKey = (id) => {

    return sign({ id }, process.env.SECRET_KEY, { expiresIn: '1d' });
}


export const verifyKey = (token) => {

    return verify(token, process.env.SECRET_KEY);
}