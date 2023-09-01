import passport from "passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPayload } from "~/@types/jwt";

const JWTStrategy = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY as string
}, (payload: IPayload, done) => {
    return done(null, { id: payload.id });
});

passport.use('jwt-auth', JWTStrategy);

export default passport;