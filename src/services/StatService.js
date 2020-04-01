import axios from 'axios';

const url = '/api/stats/';

class StatService {

  static getStats() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(stat => ({
            ...stat,
            createdAt: new Date(stat.createdAt)
          }))
        );
      } catch(err) {
        console.log(err);
        reject(err);
      }
    })
  }

  static findUserStats(text) {
    return axios.post(url + 'find', { uname: text } );
  }

  static updateUserStats(text) {
    return axios.post(url + 'update', text);
  }

  // static insertPost(text) {
  //   return axios.post(url, {
  //     text
  //   });
  // }

  // static deletePost(id) {
  //   return axios.delete(`${url}${id}`);
  // }

}

export default StatService;
