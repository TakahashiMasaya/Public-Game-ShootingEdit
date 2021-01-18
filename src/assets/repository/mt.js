import InterfaceResourceApp from '@/assets/repository/interface_resource';

export default class MTApp extends InterfaceResourceApp {
  constructor() {
    super();
    this.clientId = 'authentication_signin_sample';
    this.currentSession = `mt_session_${this.clientId}`;
    this.currentToken = `mt_token_${this.clientId}`;
    this.apiUrl = 'http://xxxxx/mt/mt-data-api.cgi/v4/';
  }

  login({ username = '', password = '' } = {}) {
    const body = new FormData();
    body.set('username', username);
    body.set('password', password);
    body.set('clientId', this.clientId);
    return new Promise((resolve, reject) => {
      window.fetch(`${this.apiUrl}authentication`, {
        method: 'post',
        body,
        headers: {
          Accept: 'application/json',
        },
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.error) {
            reject();
            return;
          }
          window.sessionStorage.setItem(this.currentSession, data.sessionId);
          window.sessionStorage.setItem(this.currentToken, JSON.stringify({
            accessToken: data.accessToken,
            expiresIn: data.expiresIn,
            gotTokenTime: Math.floor(new Date().getTime() / 1000),
          }));
          resolve();
          console.log(data);
        })
        .catch(() => { reject(); });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      window.fetch(`${this.apiUrl}authentication`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-MT-Authorization': `MTAuth sessionId=${window.sessionStorage.getItem(this.currentSession)}`,
        },
      })
        .then((data) => {
          console.log(data);
          window.sessionStorage.removeItem(this.currentSession);
          resolve();
        })
        .catch(() => { reject(); });
    });
  }

  getDocument() {
    return new Promise((resolve, reject) => {
      window.fetch(`${this.apiUrl}sites/1/entries`)
        .then((res) => res.json())
        .then((data) => {
          resolve(
            data.items.map((d) => {
              const body = JSON.parse(d.body);
              return { ...body, entryid: d.id };
            }),
          );
        })
        .catch(() => {
          reject(new Error(null));
        });
    });
  }

  refreshToken() {
    return new Promise((resolve, reject) => {
      if (this.isValidToken()) {
        resolve();
        return;
      }
      window.fetch(`${this.apiUrl}token`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-MT-Authorization': `MTAuth accessToken=${JSON.parse(window.sessionStorage.getItem(this.currentToken)).accessToken}`,
        },
      }).then(() => {
        window.fetch(`${this.apiUrl}token`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-MT-Authorization': `MTAuth sessionId=${window.sessionStorage.getItem(this.currentSession)}`,
          },
        })
          .then((data) => data.json())
          .then((data) => {
            window.sessionStorage.setItem(this.currentToken, JSON.stringify({
              accessToken: data.accessToken,
              expiresIn: data.expiresIn,
              gotTokenTime: Math.floor(new Date().getTime() / 1000),
            }));
            resolve();
          }).catch(() => {
            window.sessionStorage.removeItem(this.currentSession);
            window.sessionStorage.removeItem(this.currentToken);
            reject();
          });
      });
    });
  }

  isValidToken() {
    const { expiresIn, gotTokenTime } = JSON.parse(
      window.sessionStorage.getItem(this.currentToken),
    );
    return Math.floor(new Date().getTime() / 1000) >= expiresIn + gotTokenTime;
  }

  updateEntry({ data }) {
    return new Promise((resolve, reject) => {
      const body = new FormData();
      body.set('entry', JSON.stringify({ title: data.title, body: JSON.stringify(data) }));
      window.fetch(`${this.apiUrl}sites/1/entries/${data.entryid}?__method=PUT`, {
        method: 'post',
        body,
        headers: {
          Accept: 'application/json',
          'X-MT-Authorization': `MTAuth accessToken=${JSON.parse(window.sessionStorage.getItem(this.currentToken)).accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.error) {
            reject(resData.error);
            return;
          }
          resolve();
        })
        .catch((e) => {
          reject(new Error(e));
        });
    });
  }

  async registDocument({ data }) {
    await this.refreshToken();
    await this.updateEntry({ data });
  }

  getCurrentUser() {
    return window.sessionStorage.getItem(this.currentSession);
  }

  authenticate(login, notLogin) {
    if (this.getCurrentUser()) {
      login();
    } else {
      notLogin();
    }
  }
}
