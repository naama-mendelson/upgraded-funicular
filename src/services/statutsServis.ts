import axios from 'axios'

 const statutsServis = {
  getStatus: (token: string) => {
    return axios.get("http://localhost:4000/statuses", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },

  createStatus: (token: string, name: string) => {
    return axios.post("http://localhost:4000/statuses", { name }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
};
export default statutsServis;