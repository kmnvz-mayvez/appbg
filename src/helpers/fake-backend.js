export { fakeBackend };

const usersKey = 'demo';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];

function fakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {

            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && opts.method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/register') && opts.method === 'POST':
                        return register();
                    case url.endsWith('/users') && opts.method === 'GET':
                        return getUsers();
                    case url.match(/\/users\/\d+$/) && opts.method === 'GET':
                        return getUserById();
                    default:
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { username, password } = body();
                const user = users.find(x => x.username === username && x.password === password);

                if (!user) return error('Username or password is incorrect');

                if (user.username === 'admin') {
                    window.location.href = '/management';
                }

                return ok({
                    ...basicDetails(user),
                    token: 'fake-jwt-token'
                });
            }

            function register() {
                const user = body();

                if (users.find(x => x.username === user.username)) {
                    return error('Username "' + user.username + '" is already taken')
                }

                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                users.push(user);
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok();
            }

            users.push({
                id: users.length + 1,
                username: 'admin',
                password: 'password123',
                plateNumber: 'B299KVZ',
                phoneNumber: '1234567890'
            });

            localStorage.setItem(usersKey, JSON.stringify(users));

            function getUsers() {
                if (!isAuthenticated()) return unauthorized();
                return ok(users.map(x => basicDetails(x)));
            }

            function getUserById() {
                if (!isAuthenticated()) return unauthorized();

                const user = users.find(x => x.id === idFromUrl());
                return ok(basicDetails(user));
            }

            function ok(body) {
                resolve({ ok: true, ...headers(), json: () => Promise.resolve(body) })
            }

            function unauthorized() {
                resolve({ status: 401, ...headers(), json: () => Promise.resolve({ message: 'Unauthorized' }) })
            }

            function error(message) {
                resolve({ status: 400, ...headers(), json: () => Promise.resolve({ message }) })
            }

            function basicDetails(user) {
                const { id, username, plateNumber, phoneNumber } = user;
                return { id, username, plateNumber, phoneNumber };
            }

            function isAuthenticated() {
                return opts.headers['Authorization'] === 'Bearer fake-jwt-token';
            }

            function body() {
                return opts.body && JSON.parse(opts.body);
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function headers() {
                return {
                    headers: {
                        get(key) {
                            return ['application/json'];
                        }
                    }
                }
            }
        });
    }
}
