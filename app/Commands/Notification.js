'use strict'

const { Command } = require('@adonisjs/ace');

const User = use('App/Models/User');
const Database = use('Database');
const Mail = use('Mail');

class Notification extends Command {
  static get signature () {
    return `
      send:notification
      { user_id? : id of user to email }
    `
  }

  static get description () {
    return 'Send mail to user by user_id / to all users'
  }

  async handle (args, options) {
    let users;
    if(args['user_id']) {
      let user = await User.find(args["user_id"]);
      await Mail.send('emails.notification', user, (message) => {
        message
        .to(user.email)
        .from('profittom5@gmail.com')
        .subject('Best Blog notification')
      })
    } else {
      users = await User.all();
      users.toJSON().forEach(async (user) => {
        await Mail.send('emails.notification', user, (message) => {
          message
          .to(user.email)
          .from('profittom5@gmail.com')
          .subject('Best Blog notification')
        })
      });
    }
  
    Database.close();
    // process.exit(0);
  }
}

module.exports = Notification
