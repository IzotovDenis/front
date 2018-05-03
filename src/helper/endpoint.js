const endPoint = {
  group: '/groups',
  popularItems: '/items/popular'
}

function getEndPoint (target) {
  return `${process.env.REACT_APP_API_ENDPOINT}${endPoint[target]}`
}
export default getEndPoint
