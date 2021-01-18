import MTApp from '@/assets/repository/mt';
import FirebaseApp from '@/assets/repository/firebase';
import MicroCMS from '@/assets/repository/microcms';

const Repository = {
  repository: null,
  init(repository) {
    switch (repository) {
      case 'mt':
        this.repository = new MTApp();
        break;
      case 'microcms':
        this.repository = new MicroCMS();
        break;
      default:
        this.repository = new FirebaseApp();
    }
  },
  isRepositoryNull() {
    return !this.repository;
  },
  login(params) {
    return this.repository.login(params);
  },
  authenticate(success, fail) {
    return this.repository.authenticate(success, fail);
  },
  logout() {
    return this.repository.logout();
  },
  getDocument() {
    return this.repository.getDocument();
  },
  registDocument(params) {
    return this.repository.registDocument(params);
  },
};

const re = null;

export { Repository, re };
