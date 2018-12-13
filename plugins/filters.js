import Vue from 'vue'

const yearFilter = value => {
  return formatYear(value)
}

function formatYear(inputDate) {
  let date = new Date(inputDate)
  let year = date.getFullYear()
  return year
}

Vue.filter('filterYear', yearFilter)
