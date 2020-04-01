import axios from 'axios';

const url = '/api/login/';

class LoginService {

  static getUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
          }))
        );
      } catch(err) {
        console.log(err);
        reject(err);
      }
    })
  }

  static findUserAccount(text) {
    return axios.post(url + 'find', { uname: text } );
  }

  static registerUser(text, user_info) {
    axios.post(url + 'register', text)
      .then(function (response) {
        if (response.data.result == "Success") {
          user_info.authenticated = true;
          user_info.username = response.data.user;
          user_info.firstname = response.data.first;
          user_info.lastname = response.data.last;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static loginUser(text, user_info) {
    axios.post(url + 'login', text)
    .then(function (response) {
      if (response.data.result == "Success") {
        user_info.authenticated = true;
        user_info.username = response.data.user;
        user_info.firstname = response.data.first;
        user_info.lastname = response.data.last;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  static logoutUser() {
    return axios.get(url + 'logout');
  }

}

export default LoginService;
