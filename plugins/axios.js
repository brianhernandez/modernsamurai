export default function({ $axios, redirect }) {
  $axios.onResponse(res => {
    // console.log('onResponse: ', res)
    // res.data.status = res.status;
    return res
  })
}
