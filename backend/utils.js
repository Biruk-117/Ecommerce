import jwt from 'jsonwebtoken'

//middle were
export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }
    );
};


//middle were to authenticat user
//jwt is used to dicript the token
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
        const token = authorization.slice(7, authorization.length0); //Bearer XXXXXXXXX,  we only want XXXXXXX which is the token

        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' });
            }else{
                req.user = decode;
                next();
            }
        });
    }else{
        res.status(401).send({ message: 'No Token' });
    }
};