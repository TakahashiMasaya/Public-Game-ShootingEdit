import InterfaceResourceApp from '@/assets/repository/interface_resource';

export default class MicroCMS extends InterfaceResourceApp {
  constructor() {
    super();
    this.data = null;
    this.apiUrl = 'xxxxx';
  }

  login() {
    return Promise.resolve();
  }

  logout() {
    return Promise.resolve();
  }

  getDocument() {
    return new Promise((resolve, reject) => {
      window.fetch(`${this.apiUrl}shooting`, {
        headers: { 'X-API-KEY': 'xxxxx' },
        cache: 'no-cache',
      })
        .then((data) => data.json())
        .then((data) => {
          const dataArray = data.contents.map((_o) => ({
            ...JSON.parse(_o.body),
            entryid: _o.id,
          }));
          resolve(dataArray);
        }, () => {
          reject(new Error(null));
        });
    });
  }

  async registDocument({ data }) {
    return new Promise((resolve, reject) => {
      window.fetch(`${this.apiUrl}shooting/${data.entryid}`, {
        method: 'PATCH',
        body: JSON.stringify({
          body: JSON.stringify(data),
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-WRITE-API-KEY': 'xxxxx',
        },
      })
        .then(() => {
          resolve();
        }, (e) => {
          reject(new Error(e));
        });
    });
  }

  getCurrentUser() {
  }

  authenticate(login) {
    login();
  }
}
