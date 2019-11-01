// export default function({ app }) {
//     const oldLogout = app.$auth.logout.bind(app.$auth)
//     const oldLogin = app.$auth.login.bind(app.$auth)
//
//     app.$auth.logout = (...args) => {
//         const _ = oldLogout(...args)
//         _.then(() => app.$auth.redirect('logout'))
//         return _
//     }
//
//     app.$auth.login = (...args) => {
//         // sometimes doesn't work when the user tries to get to the admin page
//         // before being logged in.
//
//         const _ = oldLogin(...args)
//         _.then(() => {
//             app.$auth.redirect('home')
//         })
//         return _
//     }
// }
