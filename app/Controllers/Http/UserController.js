'use strict'

const User = use('App/Models/User');
const Mail = use('Mail');

const moment = require('moment')
const crypto = require('crypto')

class UserController {


    async create({ request, auth, response}) {
        const user = await User.create(request.only(['username','email','password']));

        await Mail.send('emails.welcome', user.toJSON(), (message) => {
            message
            .to(user.email)
            .from('profittom5@gmail.com')
            .subject('Welcome to yardstick')
        })

        await auth.login(user);
        return response.redirect('/');
    }



    async login({ request, auth, session, response}) {
        const { email, password } = request.all();
        console.log(await User.all());
        try {
            await auth.attempt(email, password);
            return response.redirect('/');
        } catch (error) {
            session.flash({message: 'These credentials do not work.'})
            return response.redirect('/login');
        }
        
    }



    async resetToken({request, response}) { 
        const { email } = request.only(['email']); 
        const user = await User.findByOrFail('email', email);
        const token = await crypto.randomBytes(16).toString('hex');

        user.token_created_at = new Date();
        user.token = token;

        await user.save();
        await Mail.send('emails.password-recover', { user, token }, (message) => {
            message
            .to(user.email)
            .from('profittom5@gmail.com')
            .subject('Best Blog password recovery');
        })
        response.redirect('/login');    
    }


    async resetPassword({request, params, session, response}) {
        const token = params.token;
        const user_id = params.id;

        const { password } = request.only(['password']);
        
        const user = await User.find(user_id);
        
        if (!(token === user.token)) {
            session.flash({message: 'Old password recover token provided or token already used'})
            return response.redirect('/forgotPassword');
        }
        
        const tokenExpired = moment()
        .subtract(2, 'days')
        .isAfter(user.token_created_at);
        
        if (tokenExpired) {
            session.flash({message: 'Password recover token expired'})
            return response.redirect('/forgotPassword');
        }
        
        user.token = null;
        user.token_created_at = null;

        user.password = password;

        await user.save();
        
        response.redirect('/login'); 
    }

}

module.exports = UserController
