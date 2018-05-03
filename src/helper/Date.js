import moment from 'moment'
moment.locale('ru')

export function DateFormat (props) {
  return moment(props).format('D MMMM  YYYY, H:mm')
}
