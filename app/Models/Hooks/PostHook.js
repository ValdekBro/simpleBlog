'use strict'

const PostHook = exports = module.exports = {}
const Mail = use('Mail');
const User = use('App/Models/User');

PostHook.newPostNotification = async (post) => {
    let users = await User.all();
    users.toJSON().forEach(async (user) => {
        await Mail.send('emails.new-post-notification', user, (message) => {
            message
            .to(user.email)
            .from('profittom5@gmail.com')
            .subject('Best Blog notification')
          })
    });
}
