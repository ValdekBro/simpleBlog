'use strict'

const User = use('App/Models/User');

class UserController {


    async create({ request, auth, response}) {
        const user = await User.create(request.only(['username','email','password']));

        console.log(users.toJSON()); //all users log

        await auth.login(user);
        return response.redirect('/');
    }



    async login({ request, auth, session, response}) {
        const { email, password } = request.all();
        const users = await User.all();
        
        try {
            await auth.attempt(email, password);
            return response.redirect('/');
        } catch (error) {
            session.flash({loginError: 'These credentials do not work.'})
            return response.redirect('/login');
        }
    }
}

module.exports = UserController
